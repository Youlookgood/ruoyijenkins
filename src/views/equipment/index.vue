<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入位置名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            node-key="id"
            default-expand-all
            highlight-current
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <!--用户数据-->
      <el-col :span="20" :xs="24">
        <el-form
          :model="queryParams"
          ref="queryForm"
          size="small"
          :inline="true"
          v-show="showSearch"
          label-width="108px"
        >
          <el-form-item label="设备位置" prop="phonenumber">
            <el-input
              v-model="queryParams.equipmentLocation"
              placeholder="请输入设备位置"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="设备名称" prop="userName">
            <el-input
              v-model="queryParams.equipmentName"
              placeholder="请输入设备名称"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="主板编号">
            <el-select
              v-model="queryParams.mainboardId"
              placeholder="请选择主板编号"
              style="width: 240px"
            >
              <el-option
                v-for="dict in mainboardOptions"
                :key="dict.id"
                :label="dict.serialId"
                :value="dict.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="在线状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="设备在线状态"
              clearable
              style="width: 240px"
            >
              <el-option
                v-for="dict in dict.type.sys_normal_disable"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上次添纸时间">
            <el-date-picker
              v-model="dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
              >重置</el-button
            >
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              v-hasPermi="['system:user:add']"
              >新增</el-button
            >
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button
              type="success"
              plain
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['system:user:edit']"
              >修改</el-button
            >
          </el-col> -->
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['system:user:remove']"
              >删除</el-button
            >
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button
              type="info"
              plain
              icon="el-icon-upload2"
              size="mini"
              @click="handleImport"
              v-hasPermi="['system:user:import']"
              >导入</el-button
            >
          </el-col> -->
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:user:export']"
              >导出</el-button
            >
          </el-col>
        </el-row>

        <el-table
          v-loading="loading"
          :data="userList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            label="场所"
            align="center"
            prop="equipmentPlace"
            width="200"
          />
          <el-table-column
            label="点位"
            align="center"
            prop="pointDesc"
            width="200"
          />
          <el-table-column
            label="设备位置"
            align="center"
            prop="equipmentPlace"
            width="250"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row.equipmentPlace +
                scope.row.pointDesc +
                scope.row.equipmentPoint
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="设备名称"
            align="center"
            prop="equipmentName"
            width="250"
          />
          <el-table-column
            label="主板编号"
            align="center"
            prop="mainboardName"
          />
          <el-table-column
            label="所属组织"
            align="center"
            prop="equipmentLocation"
            width="250"
          />
          <el-table-column label="设备状态" align="center" prop="status">
            <template slot-scope="scope">
              {{ jugeStatus(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            label="异常报错"
            align="center"
            prop="exceptionDesc"
          />
          <el-table-column label="剩余纸量" align="center" prop="paperWeight" />
          <el-table-column
            label="上次添纸时间"
            align="center"
            prop="appEquipment"
            width="150"
          />
          <el-table-column
            label="备注"
            align="center"
            prop="remark"
            width="160"
          />

          <el-table-column label="状态" align="center" key="status">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="0"
                inactive-value="1"
                @change="handleStatusChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            v-if="columns[6].visible"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
            fixed="right"
          >
            <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:user:remove']"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属组织" prop="deptId">
              <treeselect
                v-model="form.locationId"
                :options="deptOptions"
                :normalizer="normalizer"
                placeholder="选择组织位置"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="设备位置" prop="equipmentPoint">
              <el-input
                v-model="form.equipmentPoint"
                placeholder="请输入设备点位"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="设备名称" prop="equipmentName">
              <el-input
                v-model="form.equipmentName"
                placeholder="请输入设备名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="主板编号">
              <el-select
                v-model="form.mainboardId"
                placeholder="请选择主板编号"
                style="width: 100%"
              >
                <el-option
                  v-for="dict in mainboardOptions"
                  :key="dict.id"
                  :label="dict.serialId"
                  :value="dict.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in equipmentStatusOptions"
                  :key="dict.value"
                  :label="dict.value"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" />
            是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板</el-link
          >
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus,
  deptTreeSelect,
} from "@/api/system/equipment";
import {
  listDept,
  getDept,
  delDept,
  addDept,
  updateDept,
  listDeptExcludeChild,
} from "@/api/system/location";
import { listType } from "@/api/app/inventory";
import { getToken } from "@/utils/auth";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: { Treeselect },
  data() {
    return {
      addUpdateForm: {
        locationId: "",
        locationName: "",
        equipmentName: "",
        mainboardId: "",
        status: 0,
        remark: "",
      },
      mainboardOptions: [],
      equipmentStatusOptions: [
        { label: "启用", value: 0 },
        { label: "停用", value: 1 },
      ],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "locationName",
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      //  <if test="equipmentName!=null and equipmentName!=''">
      //         and equipment_name like concat('%', #{equipmentName}, '%'),
      //     </if>
      //     <if test="equipmentLocation!=null and equipmentLocation!=''">
      //         and equipment_location like concat('%', #{equipmentLocation},'%')
      //     </if>
      //     <if test="status!=null and status!=''">
      //         and status = #{status},
      //     </if>
      //     <if test="mainboardId!=null and mainboardId!=''">
      //         and mainboard_id = #{mainboardId},
      //     </if>
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        equipmentName: undefined,
        equipmentLocation: undefined,
        mainboardId: undefined,
        status: undefined,
        deptId: undefined,
      },
      // 列信息
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `设备名称`, visible: true },
        { key: 2, label: `用户昵称`, visible: true },
        { key: 3, label: `位置`, visible: true },
        { key: 4, label: `设备位置`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `创建时间`, visible: true },
      ],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "设备名称长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
          {
            pattern: /^[^<>"'|\\]+$/,
            message: "不能包含非法字符：< > \" ' \\\ |",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的设备位置",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getMainBoard();
    this.getList();
    this.getDeptTree();
    this.getConfigKey("sys.user.initPassword").then((response) => {
      this.initPassword = response.msg;
    });
  },
  methods: {
    jugeStatus(status) {
      let text = "";
      status = Number(status);
      switch (status) {
        case 0:
          text = "启用";
          break;
        case 1:
          text = "停用";
          break;
        case 2:
          text = "离线";
          break;
        default:
          text = "未知";
      }
      return text;
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.locationId,
        label: node.locationName,
        children: node.children,
      };
    },
    // 获取主板列表
    getMainBoard() {
      this.loading = true;
      listType(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.mainboardOptions = response.rows;
        }
      );
    },

    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.userList = response.rows;
          this.userList.map((item) => {
            let pointPlace = this.extractPlaceAndPoint(item.equipmentLocation);
            if (pointPlace) {
              item.pointDesc = pointPlace.point;
            }
          });
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询部门下拉树结构 */
    getDeptTree() {
      // deptTreeSelect().then((response) => {
      //   this.deptOptions = response.data;
      //   console.log(this.deptOptions, "这里是什么？");
      // });
      listDept().then((response) => {
        this.deptOptions = this.handleTree(response.data, "locationId");
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.locationId = data.locationId;
      this.handleQuery();
    },
    // 用户状态修改
    handleStatusChange(row) {
      this.reset();
      let text = row.status === "0" ? "启用" : "停用";
      this.form = JSON.parse(JSON.stringify(row));
      this.form.status = Number(this.form.status);
      updateUser(this.form).then((response) => {
        this.$modal.msgSuccess("修改成功");
        this.open = false;
        this.getList();
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        equipmentId: null,
        locationId: null,
        locationName: "",
        equipmentName: "",
        mainboardId: "",
        mainboardName: "",
        status: 0,
        remark: "",
        equipmentPoint: "",
        equipmentPlace: "",
        equipmentLocation: "",
        // userId: undefined,
        // deptId: undefined,
        // userName: undefined,
        // nickName: undefined,
        // password: undefined,
        // phonenumber: undefined,
        // email: undefined,
        // sex: undefined,
        // remark: undefined,
        // postIds: [],
        // roleIds: [],
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.locationId = undefined;
      this.$refs.tree.setCurrentKey(null);
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.equipmentId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        case "handleAuthRole":
          this.handleAuthRole(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      getUser().then((response) => {
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.open = true;
        this.title = "添加设备";
        this.form.password = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.open = true;

      this.form = JSON.parse(JSON.stringify(row));
      this.form.status = Number(this.form.status);
      let mainBoardItem = {
        id: row.mainboardId,
        serialId: row.mainboardName,
      };
      this.mainboardOptions.push(mainBoardItem);
      const uniqueOptions = this.mainboardOptions.filter(
        (option, index, self) =>
          index ===
          self.findIndex(
            (o) => o.serialId === option.serialId && o.id === option.id
          )
      );
      this.mainboardOptions.length = 0;
      this.mainboardOptions.push(...uniqueOptions);

      //this.mainboardOptions = [...new Set(this.mainboardOptions)];
      // this.mainboardOptions = [...Set(this.mainboardOptions)];
      // const userId = row.userId || this.ids;
      // getUser(userId).then((response) => {
      //   this.form = response.data;
      //   this.postOptions = response.posts;
      //   this.roleOptions = response.roles;
      //   this.$set(this.form, "postIds", response.postIds);
      //   this.$set(this.form, "roleIds", response.roleIds);
      //   this.open = true;
      //   this.title = "修改设备";
      //   this.form.password = "";
      // });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
        inputValidator: (value) => {
          if (/<|>|"|'|\||\\/.test(value)) {
            return "不能包含非法字符：< > \" ' \\\ |";
          }
        },
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then((response) => {
            this.$modal.msgSuccess("修改成功，新密码是：" + value);
          });
        })
        .catch(() => {});
    },
    /** 分配角色操作 */
    handleAuthRole: function (row) {
      const userId = row.userId;
      this.$router.push("/system/user-auth/role/" + userId);
    },
    findLocationNamePath: function (data, targetId) {
      let endName = "";

      function recurse(nodes, currentPath) {
        for (const node of nodes) {
          const newPath = currentPath + node.locationName + "/";

          // 如果找到目标ID，则返回组合好的路径
          if (node.locationId === targetId) {
            return newPath;
          }

          // 如果有子节点，递归查找
          if (node.children && node.children.length > 0) {
            const result = recurse(node.children, newPath);
            if (result) {
              return result;
            }
          }
        }
        return null;
      }

      // 开始递归查找路径
      endName = recurse(data, "");

      return endName;
    },
    extractPlaceAndPoint: function (str) {
      const parts = str.split("/");
      // 检查分割后的数组长度是否足够（至少应该包含三个部分）
      if (parts.length < 3) {
        // 如果不足，返回一个错误对象或null，取决于你的具体需求
        this.$modal.msgError("请选择正确的组织位置");
        return null;
      }

      // 提取'place'和'point'
      const place = parts[1]; // 索引1是第一个'/'和第二个'/'之间的内容
      const point = parts[2]; // 索引2是第二个'/'之后的内容

      // 返回一个包含这些信息的对象
      return {
        place: place,
        point: point,
      };
    },
    /** 提交按钮 */
    submitForm: function () {
      //   locationId: null,
      //   locationName: "",
      //   equipmentName: "",
      //   mainboardId: "",
      //   mainboardName: "",
      //   status: 0,
      //   remark: "",
      //   equipmentPoint: "",
      //   equipmentPlace: "",
      this.mainboardOptions.map((item) => {
        if (item.id == this.form.mainboardId) {
          this.form.mainboardName = item.serialId;
        }
      });
      this.form.equipmentLocation = this.findLocationNamePath(
        this.deptOptions,
        this.form.locationId
      );
      let pointPlace = this.extractPlaceAndPoint(this.form.equipmentLocation);
      if (pointPlace) {
        this.form.equipmentPlace = pointPlace.place;
        //this.form.equipmentPoint = pointPlace.point;
      } else {
        this.$modal.msgError("请选择正确的组织位置");
        return;
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.equipmentId) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.equipmentId || this.ids;
      this.$modal
        .confirm("是否确认删除选择的数据项？")
        .then(function () {
          return delUser(userIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/equipment/export",
        {
          ...this.queryParams,
        },
        `设备_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "设备导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>

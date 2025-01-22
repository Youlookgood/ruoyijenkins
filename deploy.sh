#!/bin/bash

set -e  # 脚本在出错时立即退出
trap 'echo "发生错误，退出程序"; exit 1;' ERR  # 捕获任何错误并输出信息

# 打印带颜色的输出函数
function print_info {
    echo -e "\033[32m$1\033[0m"
}

function print_error {
    echo -e "\033[31m$1\033[0m"
}

# 打包
print_info "开始打包..."
if npm run build:prod; then
    print_info "打包成功"
else
    print_error "打包失败"
    exit 1
fi

# 压缩 dist 文件夹
print_info "开始压缩 dist 文件夹为 hrm.zip..."
if zip -r dist.zip dist; then
    print_info "压缩成功"
else
    print_error "压缩失败"
    exit 1
fi

# 推送 zip 文件到服务器
SERVER="root@8.218.207.222"
REMOTE_PATH="/root/online-front/lineradmin"
ZIP_FILE="dist.zip"

print_info "开始推送 $ZIP_FILE 到服务器 $SERVER:$REMOTE_PATH..."
if scp $ZIP_FILE $SERVER:$REMOTE_PATH; then
    print_info "推送成功"
else
    print_error "推送失败"
    exit 1
fi

# 远程解压并删除 zip 文件
print_info "连接服务器解压并删除远程 zip 文件..."
if ssh $SERVER "cd $REMOTE_PATH && unzip -o $ZIP_FILE && rm -f $ZIP_FILE"; then
    print_info "远程解压和删除成功"
else
    print_error "远程操作失败"
    exit 1
fi

# 删除本地 zip 文件
print_info "删除本地 $ZIP_FILE 文件..."
if rm -f $ZIP_FILE; then
    print_info "本地文件删除成功"
else
    print_error "本地文件删除失败"
    exit 1
fi

print_info "部署完成！恭喜啦～"

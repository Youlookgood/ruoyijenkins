<template>
  <div class="app-wrap">
    <!-- <div>
      <van-nav-bar title="思腾出纸机" />
    </div> -->
    <div class="app-body">
      <div class="f-flex">
        <div class="f-bg"></div>
        <div class="f-text">商品详情</div>
      </div>
      <van-cell-group inset class="mb-2">
        <van-cell>
          <div class="m-select">
            <div>
              <div class="u-btn-length">1.2米</div>
            </div>
            <div class="u-price">¥{{ price }}</div>
          </div>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset class="mb-2">
        <van-cell>
          <div class="m-addnumber">
            <div class="number-text">商品数量</div>
            <div>
              <van-stepper
                v-model="buyNumber"
                theme="round"
                button-size="24"
                disable-input
              />
            </div>
          </div>
        </van-cell>
      </van-cell-group>

      <div class="pay-wrap">
        <div class="f-flex">
          <div class="f-bg"></div>
          <div class="f-text">支付方式</div>
        </div>
        <van-cell-group inset>
          <van-cell>
            <div class="m-addnumber">
              <div class="number-text">
                <img src="./微信.png" alt="" class="wx-img" />
                <span>微信支付</span>
              </div>
              <div class="flexalign">
                <van-radio-group v-model="payType">
                  <van-radio name="1"></van-radio>
                </van-radio-group>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="account-bottom">
        <div class="number-total">
          合计：<span class="total-text">{{ totalPriace }}</span> 元
        </div>
        <div class="confirm-wrap">
          <van-button type="info" class="confirm-btn" @click="confirmOrder"
            >确认</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      payType: "1",
      buyNumber: 1,
      price: 0.25,
      activeKey: 0,
    };
  },
  computed: {
    totalPriace() {
      return this.price * this.buyNumber;
    },
  },
  methods: {
    confirmOrder() {
      Toast("等待微信支付接入");
    },
  },
};
</script>

<style lang="scss">
.account-bottom {
  width: 100%;
  height: 90px;
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 0 20px;
  .total-text {
    color: #d9001b;
  }
  .number-total {
    color: #666;
    margin: 4px 0;
  }
  .confirm-wrap {
    text-align: center;
  }
  .confirm-btn {
    width: 220px;
  }
}
.flexalign {
  display: flex;
  align-items: center;
}
.number-text {
  display: flex;
  align-items: center;
  .wx-img {
    width: 40px;
    margin-right: 6px;
  }
}

.pay-wrap {
  margin-top: 80px;
}
.m-addnumber {
  display: flex;
  padding: 8px 0;
  .number-text {
    flex: 1;
  }
}
.u-price {
  width: 120px;
  text-align: center;
  color: #d9001b;
  margin-top: 2px;
}
.u-btn-length {
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 10px;
  text-align: center;
}
.f-flex {
  display: flex;
  padding: 14px;
  .f-text {
    color: #666;
    font-weight: bold;
  }
  .f-bg {
    width: 8px;
    background: #409eff;
    margin-right: 10px;
  }
}
.mb-2 {
  margin-bottom: 10px;
}
.app-wrap {
  background: rgba(245, 245, 245, 1);
  height: 100vh;
}
</style>

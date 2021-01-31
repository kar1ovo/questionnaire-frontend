<template>
  <div>
    <van-nav-bar style="margin-top: 10px" title="爱星🌟公益" />
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        rows="1"
        autosize
        type="textarea"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        readonly
        clickable
        name="address"
        :value="address"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirmAddress"
          @cancel="showArea = false"
        />
      </van-popup>
      <van-field
        v-model="school"
        rows="1"
        autosize
        type="textarea"
        label="学校"
        placeholder="请输入学校"
      />
      <van-field
        v-model="cclass"
        rows="1"
        autosize
        type="textarea"
        label="班级"
        placeholder="请输入班级"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="desire"
        label="愿望"
        placeholder="点击选择愿望"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirmDesire"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        label="留言"
        placeholder="请输入留言"
      />
      <van-notice-bar
        style="margin: 10px"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      >
        contact us : iherewithmyheart@gmail.com
      </van-notice-bar>
      <div style="margin: 10px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import area from "./area.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      name: "", //姓名
      school: "", //学校
      cclass: "", //班级
      desire: "",
      address: "",
      columns: ["吃饭", "睡觉", "看剧", "打游戏", "学习"], //
      showPicker: false,
      showArea: false,
      areaList: area, // 数据格式见 Area 组件文档
      message: "", //留言
    };
  },
  methods: {
    onConfirmDesire(value) {
      this.desire = value;
      this.showPicker = false;
    },
    onConfirmAddress(values) {
      this.address = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    onSubmit() {
      //发送post请求到指定api接口存入mongodb数据库
      //并且弹出成功/失败的提示消息
      // 成功通知
      this.$http
        .post(
          "https://bird.ioliu.cn/v1?url=http://81.68.236.133:3001/questionnaires",
          {
            name: this.name,
            address: this.address,
            school: this.school,
            class: this.cclass,
            desire: this.desire,
            message: this.message,
            time: new Date().toLocaleString(),
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$notify({
            type: "success",
            message: "✨ 提交成功\n🌐 收到表单",
          });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>

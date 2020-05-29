<style scoped>
.diary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f6faff;
  overflow-y: hidden;
}
.title {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5em 0;
  width: 100%;
  font-size: 25px;
  font-weight: 500;
  text-align: left;
  text-indent: 5%;
  background-color: #f6faff;
}
.title .add {
  position: absolute;
  right: 1.5em;
  bottom: 0.5em;
  color: #2cd18a;
  font-size: 18px;
  text-indent: 0;
}
.con {
  margin-top: 60px;
  min-height: 95vh;
}
.no-data span {
  display: block;
  height: 4em;
  color: #888;
  text-align: center;
  line-height: 4em;
}
.no-data img {
  display: block;
  margin: 0 auto;
  height: 60vh;
  width: 40vh;
}
.noMore {
  text-align: center;
  font-size: 14px;
  color: #999;
  line-height: 2em;
}
</style>

<template>
  <scroll-view class="diary" scroll-y="ture" @scrolltolower="scrollFun">
    <h1 class="title">
      <span>种花日记</span>
      <div class="add" @click="toAdd">写日记</div>
    </h1>
    <div class="con">
      <div v-if="!diaryData || diaryData.length==0" class="no-data">
        <span>快来写下你的第一篇日记吧！</span>
        <img src="../../../static/images/diary_bg.png" />
      </div>
      <div v-else class="data">
        <diaryList v-for="(item, index) in diaryData" :key="index" :data="item"></diaryList>
      </div>
    </div>
    <div class="noMore" v-show="noMore">已经到底部了</div>
  </scroll-view>
</template>

<script>
import store from "./store";
import diaryList from "./diaryList/diaryList.vue";
import httpRequest from "../../utils/httpRequest.js";

export default {
  data() {
    return {
      diaryData: [],
      page: 1,
      pageSize: 10,
      noMore: false
    };
  },
  components: {
    diaryList
  },
  computed: {},
  methods: {
    scrollFun() {
      console.log("滚到底部");
      if (this.noMore) {
        return;
      }
      this.page++;
      this.getDiaryList();
    },
    toAdd() {
      store.commit("changeData", null);
      mpvue.navigateTo({ url: "../diary/addDiary/main?type=add" });
    },
    // 请求一张云存储的照片，获取临时地址
    upLoadImg(fileID) {
      // fileID --> 一张照片的 fileID
      return new Promise((resolve, reject) => {
        wx.cloud.downloadFile({
          fileID: fileID, // 文件 ID
          success: res => {
            resolve(res.tempFilePath);
            // 返回 临时地址
          },
          fail: console.error
        });
      });
    },
    // 请求一篇日记的全部照片
    upLoadDiaryImg(diary) {
      // diary --> 一篇日记
      return new Promise((resolve, reject) => {
        if (!diary.imageList) {
          resolve();
        }
        let len2 = diary.imageList.length;
        let promiseArr = [];
        for (let j = 0; j < len2; j++) {
          promiseArr.push(this.upLoadImg(diary.imageList[j]));
        }
        Promise.all(promiseArr).then(res => {
          // res --> 一篇日记里，临时照片地址列表
          diary.imgList = res;
          resolve();
        });
      });
    },
    // 请求一天所有日记的全部照片
    upLoadDayImg(diaryList) {
      // diaryList --> 一天的日记
      return new Promise((resolve, reject) => {
        let len = diaryList.length;
        let promiseArr = [];
        for (let i = 0; i < len; i++) {
          promiseArr.push(this.upLoadDiaryImg(diaryList[i]));
        }
        Promise.all(promiseArr).then(res => {
          // 该天的全部日记，已经拥有了临时照片地址列表imgList
          resolve();
        });
      });
    },
    // 请求全部云存储的照片
    upLoadAllImg(diaryData) {
      // diaryData --> 全部日记
      return new Promise((resolve, reject) => {
        let len = diaryData.length;
        let promiseArr = [];
        for (let i = 0; i < len; i++) {
          promiseArr.push(this.upLoadDayImg(diaryData[i].diaryList));
        }
        Promise.all(promiseArr).then(res => {
          // 全部日记，已经拥有了临时照片地址列表imgList
          resolve();
        });
      });
    },
    getDiaryList() {
      wx.showLoading({
        title: "加载中" 
      });
      let send = {
        url: "/diary",
        data: {
          page: this.page,
          pageSize: this.pageSize,
          // userId: 1 // 测试用户
        }
      };
      httpRequest.get(send).then(res => {
        if (res.code == 1) {
          if (!res.data || res.data.length == 0) {
            this.noMore = true;
            wx.hideLoading();
          } else {
            this.upLoadAllImg(res.data).then(() => {
              this.diaryData = this.diaryData.concat(res.data);
              console.log('日记列表', this.diaryData);
              wx.hideLoading();
            });
          }
        }
      });
    }
  },
  onShow() {
    if (store.state.hadChange == true) {
      store.state.hadChange = false;
      this.page = 1;
      this.noMore = false;
      this.diaryData = [];
      this.getDiaryList();
    }
  }
};
</script>

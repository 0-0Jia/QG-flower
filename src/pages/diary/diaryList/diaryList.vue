<style  scoped>
.list0 {
  display: flex;
  align-items: flex-start;
}
.list0 .date {
  width: 20vw;
  text-align: center;
}
.date .day {
  color: #000;
  font-size: 25px;
  font-weight: bold;
}
.date .monthAndYear {
  color: #999;
  font-size: 16px;
}
.list0 .list1Con {
  margin: 0 5vw 2em 0;
  width: 75vw;
}
.list1Con .list1 {
  margin-bottom: 1em;
  padding: 0.7em;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #eee;
}
.list1 .diaryStr {
  font-size: 16px;
  /* max-height: 3em; */
  line-height: 1.5em;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.list1 .imgList {
  margin: 0.3em 0;
}
.list1 .time {
  color: #999;
  font-size: 14px;
  text-align: left;
}
.imgList .img {
  display: inline-block;
  margin: 0 1vw;
  width: 20vw;
  height: 20vw;
  overflow: hidden;
  border-radius: 4px;
  background-position: center;
  background-size: auto 100%;
  background-repeat: no-repeat;
}
</style>
<template>
  <div class="list0">
    <div class="date">
      <div class="day">{{day}}</div>
      <div class="monthAndYear">{{monthAndYear}}</div>
    </div>
    <div class="list1Con">
      <div class="list1" @click="toEdit(item)" v-for="(item, index) in data.diaryList" :key="index">
        <div class="diaryStr">{{item.content}}</div>
        <div class="imgList">
          <div
            v-for="(url, index2) in item.imgList"
            :key="index2"
            class="img"
            :style="{'background-image':'url('+url+')'}"
          ></div>
        </div>
        <div class="time">{{item.formatTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  props: {
    data: Object
  },
  data() {
    return {
      day: "",
      monthAndYear: ""
    };
  },
  methods: {
    // 处理时间
    handleTime(str) {
      if (!str) return;
      let date = new Date(str);
      let minute = date.getMinutes();
      let hour = date.getHours();
      let time = `${hour < 10 ? "0" + hour : hour}:${
        minute < 10 ? "0" + minute : minute
      }`;
      return time;
    },
    // 给每个日记显示一个时间
    formatTime() {
      let len = this.data.diaryList.length;
      for (let i = 0; i < len; i++) {
        this.data.diaryList[i].formatTime = this.handleTime(
          this.data.diaryList[i].time
        );
      }
    },
    // // 请求一张云存储的照片，获取临时地址
    // upLoadImg(fileID) {
    //   return new Promise((resolve, reject) => {
    //     wx.cloud.downloadFile({
    //       fileID: fileID, // 文件 ID
    //       success: res => {
    //         resolve(res.tempFilePath);
    //       },
    //       fail: console.error
    //     });
    //   });
    // },
    // // 请求全部云存储的照片
    // upLoadImgList() {
    //   let len = this.data.diaryList.length;
    //   // 遍历日记
    //   for (let i = 0; i < len; i++) {
    //     let diary = this.data.diaryList[i];
    //     // 判断日记有没有照片列表
    //     if (!diary.imageList) {
    //       continue;
    //     }
    //     let len2 = diary.imageList.length;
    //     let promiseArr = [];
    //     for (let j = 0; j < len2; j++) {
    //       // 生成请求照片列表的promise对象
    //       promiseArr.push(this.upLoadImg(diary.imageList[j]));
    //     }
    //     // 发送promise请求
    //     Promise.all(promiseArr).then((res)=>{
    //       diary.imgList = res;
    //     });
    //   }
    // },
    // 去编辑界面
    toEdit(data) {
      store.commit("changeData", JSON.parse(JSON.stringify(data)));
      mpvue.navigateTo({ url: "../diary/editDiary/main?type=edit" });
    }
  },
  created () {
    // 初始化日期
    if (this.data.date) {
      let date = new Date(this.data.date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      this.day = day;
      this.monthAndYear = `${year}/${month}`;
    }
    // 遍历，给每个日记添加 时刻+照片列表
    this.formatTime();
    // this.upLoadImgList();
  },
};
</script>

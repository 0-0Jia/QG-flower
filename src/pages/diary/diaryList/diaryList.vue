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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0.3em 0;
}
.list1 .time {
  color: #999;
  font-size: 14px;
  text-align: left;
}
.imgList .img {
  display: inline-block;
  margin: 0.2em 1vw;
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
          <!-- <div
            v-for="(url, index2) in item.imgList"
            :key="index2"
            class="img"
            :style="{'background-image':'url('+url+')'}"
          ></div> -->
          <image  v-for="(url, index2) in item.imgList"
            :key="index2"
            mode='heightFix'
            class="img"
            :src='url'
          ></image>
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
      let dateStr = (str.replace(/\-/g, "/")).split('.')[0];
      let date = new Date(dateStr);
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
    // 去编辑界面
    toEdit(data) {
      store.commit("changeData", JSON.parse(JSON.stringify(data)));
      mpvue.navigateTo({ url: "../diary/editDiary/main?type=edit" });
    }
  },
  created () {
    // 初始化日期
    if (this.data.date) {
      let dateStr = (this.data.date.replace(/\-/g, "/")).split('.')[0];
      let date = new Date(dateStr);
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

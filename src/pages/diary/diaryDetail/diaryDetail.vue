<style scoped>
.diaryDetail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f6faff;
  overflow-y: auto;
}
.top {
  display: flex;
  justify-content: center;
  padding: 0 1em;
}
.top .left {
  width: 80%;
}
.left .date {
  font-size: 22px;
  line-height: 1.5em;
  font-weight: bold;
}
.left .time {
  font-size: 16px;
  color: #666;
}
.top .right {
  display: flex;
  align-items: center;
}
.right .sure {
  width: 1.3em;
  height: 1.3em;
}
.right .edit,
.right .delete {
  width: 2em;
  height: 2em;
}
.con {
  padding: 5vw;
}
.con .content {
  padding: 2vw;
  width: 86vw;
  font-size: 15px;
  line-height: 1.5em;
  min-height: 10em;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #ddd;
}
.con .imgList {
  display: flex;
  align-content: center;
  margin: 2em auto;
}
.imgList .img {
  display: inline-block;
  margin: 0 2vw;
  width: 25vw;
  height: 25vw;
  border-radius: 4px;
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.imgList .add {
  display: inline-block;
  margin: 0 2vw;
  width: 25vw;
  height: 25vw;
  border-radius: 4px;
  background-color: rgba(237, 240, 244, 1);
  color: #fff;
  font-size: 30px;
  line-height: 25vw;
  text-align: center;
  font-weight: bold;
}
</style>

<template>
  <div class="diaryDetail">
    <div class="top">
      <div class="left">
        <div class="date">{{date}}</div>
        <div class="time">{{time}}</div>
      </div>
      <div class="right">
        <img v-show="type" class="sure" src="../../../../static/images/submit.png" />
        <img v-show="!type" class="delete" src="../../../../static/images/diary_edit.png" />
        <img v-show="!type" class="edit" src="../../../../static/images/diary_delete.png" />
      </div>
    </div>
    <div class="con">
      <textarea ref="content" class="content" v-model="content" placeholder="记录下今天的种花小点滴吧~"></textarea>
      <div class="imgList">
        <div
          class="img"
          v-for="(url, index) in imgList"
          :key="index"
          :style="{'background-image':'url('+url+')'}"
        ></div>
        <div :style="addShow?'':'display:none;'" class="add">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {};
  },
  computed: {
    type() {
      console.log(store.state.type);
      return store.state.type;
    },
    // data() {
    //   console.log(store.state.data);
    //   return store.state.data;
    // },
    time() {
      if (!store.state.data) return "";
      let date = new Date(store.state.data.time);
      let minute = date.getMinutes();
      let hour = date.getHours();
      return `${hour}:${minute < 10 ? "0" + minute : minute}`;
    },
    date() {
      let date = null;
      if (!store.state.data) {
        date = new Date();
      } else {
        date = new Date(store.state.data.time);
      }
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${year}/${month}/${day}`;
    },
    content() {
      if (!store.state.data) return "";
      return store.state.data.content;
    },
    imgList() {
      if (!store.state.data) return null;
      console.log(store.state.data.images);
      return store.state.data.images;
    },
    addShow() {
      return !this.imgList || this.imgList.length < 3;
    }
  },
  methods: {
    // increment() {
    //   store.commit("increment");
    // },
  },
  created() {
  }
};
</script>

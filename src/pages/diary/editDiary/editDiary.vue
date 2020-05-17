<style scoped>
.editDiary {
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
  justify-content: space-between;
  align-items: flex-end;
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
.right div {
  width: 3.5em;
  height: 1.5em;
  line-height: 1.5em;
  text-align: right;
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
  position: relative;
  display: inline-block;
  margin: 0 2vw;
  width: 25vw;
  height: 25vw;
  border-radius: 4px;
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.imgList .img .remove {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  height: 1em;
  width: 1em;
  color: #fff;
  line-height: 0.9em;
  text-align: center;
  font-weight: bold;
  background-color: #f40;
  border-radius: 50%;
  box-shadow: 0 0 5px 1px #666;
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
  <div class="editDiary">
    <div class="top">
      <div class="left">
        <div class="date">{{date}}</div>
        <div class="time">{{clock}}</div>
      </div>
      <div class="right">
        <div class="edit" style="color: #2cd18a" @click="edit">保存</div>
        <div class="delete" style="color: #f40" @click="del">删除</div>
      </div>
    </div>
    <div class="con">
      <textarea v-model="content" ref="content" class="content" placeholder="记录下今天的种花小点滴吧~"></textarea>
      <div class="imgList">
        <div
          class="img"
          v-for="(url, index) in images"
          :key="index"
          :style="{'background-image':'url('+url+')'}"
        >
          <span class="remove" @click="removeImg(index)">-</span>
        </div>
        <div :style="addShow?'':'display:none;'" class="add" @click="addImg">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      content: null,
      images: [],
      clock: null,
      date: null,
      diaryId: null
    };
  },
  computed: {
    addShow() {
      return !this.images || this.images.length < 3;
    }
  },
  methods: {
    addImg() {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: res => {
          this.images.push(res.tempFilePaths[0]);
        }
      });
    },
    removeImg(index) {
      this.images.splice(index, 1);
    },
    upLoadImg() {
      let url = "https://sm.ms/api/v2/upload";
    },
    initTime() {
      let date = new Date(store.state.data.time);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minute = date.getMinutes();
      this.date = `${year}/${month}/${day}`;
      this.clock = `${hour > 9 ? hour : "0" + hour}:${
        minute > 9 ? minute : "0" + minute
      }:00`;
    },
    initData() {
      this.diaryId = store.state.data.diaryId;
      this.content = store.state.data.content;
      this.images = store.state.data.images;
    },
    getImgStr() {
      if (!this.images) {
        return "";
      }
      return this.images.join("$_$");
    },
    edit() {
      let send = {
        userId: 1,
        diaryId: this.diaryId,
        time: `${this.date} ${this.clock}`,
        content: this.content,
        images: this.getImgStr()
      };
      console.log("提交编辑", send);
    },
    del() {
      let send = {
        diaryId: this.diaryId
      };
      console.log("提交删除", send);
    }
  },
  onShow() {
    this.initData();
    this.initTime();
    console.log(store.state.data);
  }
};
</script>

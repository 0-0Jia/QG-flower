<style scoped>
.addDiary {
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
  align-items: center;
  flex-wrap: wrap;
  margin: 2em auto;
}
.imgList .img {
  position: relative;
  display: inline-block;
  margin: 0.2em 2vw;
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
  <div class="addDiary">
    <div class="top">
      <div class="left">
        <div class="date">{{date}}</div>
        <div class="time">{{clock}}</div>
      </div>
      <div class="right">
        <div class="sure" style="color: #2cd18a" @click="addRequest">提交</div>
      </div>
    </div>
    <div class="con">
      <textarea v-model="content" ref="content" class="content" placeholder="记录下今天的种花小点滴吧~"></textarea>
      <div class="imgList">
        <!-- <div
          class="img"
          v-for="(url, index) in images"
          :key="index"
          :style="{'background-image':'url('+url+')'}"
        >
          <span class="remove" @click="removeImg(index)">-</span>
        </div>-->
        <image class="img" v-for="(url, index) in images" :key="index" mode='heightFix' :src='url'> 
          <span class="remove" @click="removeImg(index)">-</span>
        </image>
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
      content: "",
      clock: null,
      date: null,
      images: null,
      imagesFileID: null
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
    upLoadImg(filePath) {
      return new Promise((resolve, reject) => {
        let suffix = /\.[^\.]+$/.exec(filePath)[0];
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
          filePath: filePath, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            this.imagesFileID.push(res.fileID);
            resolve();
          },
          fail: () => {
            reject();
          }
        });
      });
    },
    addAllImg() {
      let promiseArr = [];
      let len = this.images.length;
      for (let i = 0; i < len; i++) {
        promiseArr.push(this.upLoadImg(this.images[i]));
      }
      return promiseArr;
    },
    getImgStr() {
      if (this.imagesFileID.length == 0) {
        return "";
      }
      return this.imagesFileID.join("$_$");
    },
    judgeSend() {
      if (!this.content) {
        wx.showModal({
          title: "提示",
          content: "内容不能为空",
          showCancel: false
        });
        return false;
      }
      return true;
    },
    addRequest() {
      if (!this.judgeSend()) {
        return;
      }
      wx.showModal({
        title: "提示",
        content: "您确定保存这篇日记吗",
        success: res => {
          if (res.confirm) {
            wx.showLoading({
              title: "加载中"
            });
            Promise.all(this.addAllImg()).then(() => {
              let send = {
                userId: 1,
                time: `${this.date} ${this.clock}`,
                content: this.content,
                images: this.getImgStr()
              };
              console.log("提交新增", send);
              this.$wxhttp
                .post({
                  url: "diary/",
                  data: JSON.stringify(send)
                })
                .then(res => {
                  wx.hideLoading();
                  console.log(res);
                  if (res.code == 1) {
                    wx.showModal({
                      title: "提示",
                      content: "提交成功",
                      showCancel: false,
                      success: res => {
                        store.state.hadChange = true;
                        wx.switchTab({
                          url: "/pages/diary/main"
                        });
                      }
                    });
                  } else {
                    wx.showModal({
                      title: "提示",
                      content: res.message,
                      showCancel: false
                    });
                  }
                });
            });
          } else if (res.cancel) {
          }
        }
      });
    },
    prefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    initData() {
      this.content = null;
      this.images = [];
      this.imagesFileID = [];
    },
    initTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = this.prefixInteger(date.getMonth() + 1, 2);
      let day = this.prefixInteger(date.getDate(), 2);
      let hour = this.prefixInteger(date.getHours(), 2);
      let minute = this.prefixInteger(date.getMinutes(), 2);
      this.date = `${year}-${month}-${day}`;
      this.clock = `${hour}:${minute}:00`;
    }
  },
  onLoad(options) {
    this.initTime();
    this.initData();
    console.log("添加页面的数据", store.state.data);
  }
};
</script>

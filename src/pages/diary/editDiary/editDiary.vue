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
        <!-- <div
          class="img"
          v-for="(url, index) in images"
          :key="index"
          :style="{'background-image':'url('+url+')'}"
        >
          <span class="remove" @click="removeImg(index)">-</span>
        </div> -->
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
      content: null, // 文本
      clock: null, //时刻
      date: null, // 日期
      diaryId: null, // 日记id
      images: null, // 照片临时存储地址列表
      originalImges: null, // 记录一开始的云存储照片临时地址列表
      imagesFileID: null, // 照片云存储fileId列表
      originalImgFileID: null // 记录一开始的照片云存储fileId列表
    };
  },
  computed: {
    addShow() {
      return !this.images || this.images.length < 3;
    }
  },
  methods: {
    // 本地选择一张照片，放到images
    addImg() {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: res => {
          this.images.push(res.tempFilePaths[0]);
        }
      });
    },
    // 从images移除一张图片
    removeImg(index) {
      this.images.splice(index, 1);
    },
    // 判断filePath是不是新增的（cloudImges有没有该filePath）
    judgeIsCloud(filePath) {
      let len = this.cloudImges.length;
      if (len == 0) {
        return -1;
      }
      for (let i = 0; i < len; i++) {
        if (this.cloudImges[i] == filePath) {
          // cloudImges里面的filePath和originalImgFileID里面fileID是一一对应的
          return i;
        }
      }
      return -1;
    },
    // 将filePath对应的文件fileID放到imagesFileID里面
    upLoadImg(filePath) {
      return new Promise((resolve, reject) => {
        let index = this.judgeIsCloud(filePath);
        console.log(index);
        if (index != -1) {
          // 这个照片是原有的
          this.imagesFileID.push(this.originalImgFileID[index]);
          console.log("imagesFileID", this.imagesFileID);
          resolve();
        } else {
          // 这个照片是新增的，需要上传到云存储并获取fileID
          let suffix = /\.[^\.]+$/.exec(filePath)[0];
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix,
            filePath: filePath,
            success: res => {
              this.imagesFileID.push(res.fileID);
              console.log("imagesFileID", this.imagesFileID);
              resolve();
            },
            fail: () => {
              reject();
            }
          });
        }
      });
    },
    // 将全部图片上传到云存储
    addAllImg() {
      let promiseArr = [];
      let len = this.images.length;
      for (let i = 0; i < len; i++) {
        promiseArr.push(this.upLoadImg(this.images[i]));
      }
      return promiseArr;
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
    // 拼接图片的云存储fileID
    getImgStr() {
      if (!this.imagesFileID || this.imagesFileID.length == 0) {
        return "";
      }
      return this.imagesFileID.join("$_$");
    },
    // 发送编辑请求
    edit() {
      if (!this.judgeSend()) {
        return;
      }
      wx.showModal({
        title: "提示",
        content: "您确定修改这篇日记吗",
        success: res => {
          if (res.confirm) {
            wx.showLoading({
              title: "修改中"
            });
            Promise.all(this.addAllImg()).then(() => {
              let send = {
                userId: 1,
                diaryId: this.diaryId,
                time: `${this.date} ${this.clock}`,
                content: this.content,
                images: this.getImgStr()
              };
              console.log("提交编辑", send);
              this.$wxhttp
                .put({
                  url: "diary/",
                  data: JSON.stringify(send)
                })
                .then(res => {
                  wx.hideLoading();
                  console.log(res);
                  if (res.code == 1) {
                    wx.showModal({
                      title: "提示",
                      content: "修改成功",
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
          }
        }
      });
    },
    // 发送删除请求
    del() {
      wx.showModal({
        title: "提示",
        content: "您确定修改这篇日记吗",
        success: res => {
          if (res.confirm) {
            wx.showLoading({
              title: "删除中"
            });
            this.$wxhttp
              .Delete({
                url: `diary/${this.diaryId}`
              })
              .then(res => {
                wx.hideLoading();
                console.log(res);
                if (res.code == 1) {
                  wx.showModal({
                    title: "提示",
                    content: "删除成功",
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
          }
        }
      });
    },
    // 初始化数据函数，略
    prefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    initTime() {
      let dateStr = store.state.data.time.replace(/\-/g, "/").split(".")[0];
      let date = new Date(dateStr);
      let year = date.getFullYear();
      let month = this.prefixInteger(date.getMonth() + 1, 2);
      let day = this.prefixInteger(date.getDate(), 2);
      let hour = this.prefixInteger(date.getHours(), 2);
      let minute = this.prefixInteger(date.getMinutes(), 2);
      this.date = `${year}-${month}-${day}`;
      this.clock = `${hour}:${minute}:00`;
    },
    initData() {
      // 初始化日记id
      this.diaryId = store.state.data.diaryId;
      // 初始化日记文本
      this.content = store.state.data.content;
      // 初始化日记照片的：临时地址列表 + 云存储fileID列表
      if (store.state.data.imageList) {
        // 临时地址数组的 记录+实例
        this.images = store.state.data.imgList;
        this.cloudImges = JSON.parse(JSON.stringify(this.images));
        // 云存储fileID列表的 记录+实例
        this.originalImgFileID = store.state.data.imageList;
        this.imagesFileID = [];
      } else {
        this.images = [];
        this.cloudImges = [];
        this.imagesFileID = [];
        this.originalImgFileID = [];
      }
    }
  },
  onLoad(options) {
    this.initData();
    this.initTime();
    console.log("编辑页面的数据", store.state.data);
  }
};
</script>

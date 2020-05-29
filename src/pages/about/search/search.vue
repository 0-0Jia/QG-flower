<style scoped>
.search {
  position: relative;
  font-family: 微软雅黑;
}

/*图标*/
.searchIcon {
  position: absolute;
  top: 10px;
  right: 13px;
  width: 16px;
  height: 16px;
}
.delete-icon {
  position: absolute;
  top: 1px;
  right: 1%;
  width: 30px;
  height: 30px;
}
.icon {
  position: absolute;
  top: 2px;
  left: 105px;
  width: 30px;
  height: 30px;
}

/*上方搜索*/
.container-one {
  position: relative;
  width: 90%;
  margin: 20px auto;
  margin-bottom: 24px;
}

.search-container {
  position: relative;
  width: 78%;
  height: 36px;
  margin-left: 4%;
  background-color: #edf0f4;
  border-radius: 20px;
}

.search-input {
  width: 80%;
  height: 26px;
  padding: 5px 15px;
}

.fuzzy-item-container {
  position: absolute;
  top: 36px;
  left: 4%;
  width: 83%;
  max-height: 208px;
  overflow: auto;
  border: 1px solid rgba(170, 169, 169, 0.493);
  z-index: 100;
}
.fuzzy-item {
  position: relative;
  width: 95%;
  height: 26px;
  padding: 3px 0;
  padding-left: 5%;
  font-size: 16px;
  background-color: white;
  border-bottom: 1px solid rgba(194, 193, 193, 0.39);
}

.cancel {
  position: absolute;
  top: 5px;
  right: 1%;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}

/*下方常用选项*/
.container-two {
  width: 90%;
  margin: 10px auto;
}
.select-title {
  position: relative;
  margin: 10px 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
}

.search-all-item {
  margin: 0 auto;
}
.search-item {
  display: inline-block;
  margin: 4px 6px;
  padding: 5px 16px;
  border-radius: 15px;
  background-color: #f5f5f5;
  font-size: 15px;
  font-weight: 600;
  color: #00000080;
}

.null-remind {
  width: 100%;
  margin-left: 10px;
  text-align: left;
  font-size: 14px;
  color: rgba(83, 83, 83, 0.493);
}
</style>

<template>
  <div class="search">
    <div class="container-one">
      <div class="search-container">
        <input
          class="search-input"
          v-model="flowerName"
          placeholder="输入花名进行搜索"
          @input="fuzzySearch"
        >
        <img src="../../../../static/images/search.png" alt="搜索" class="searchIcon">
        <div class="fuzzy-item-container" v-if="fuzzyShow">
          <div
            class="fuzzy-item"
            v-for="(fuzzyItem, index) in fuzzyList"
            :key="index"
            @click="flowerName = fuzzyItem.name;toDetail(fuzzyItem.flowerId)"
          >{{fuzzyItem.name}}</div>
        </div>
      </div>
      <div class="cancel" @click="toAbout">取消</div>
    </div>
    <div class="container-two">
      <div class="select-flower">
        <div class="select-title">
          <h1>热门花卉</h1>
          <img src="../../../../static/images/hot.png" class="icon">
        </div>
        <div class="search-all-item">
          <div class="null-remind" v-if="!haveHot">暂无热门搜索</div>
          <div
            class="search-item"
            v-for="(flower, index) in hotList"
            :key="index"
            @click="flowerName = flower.name;toDetail(flower.flowerId)"
          >{{flower.name}}</div>
        </div>
      </div>
      <div class="select-flower">
        <div class="select-title">
          <h1>搜索历史</h1>
          <img src="../../../../static/images/history.png" class="icon">
          <img
            src="../../../../static/images/delete.png"
            class="delete-icon"
            @click="deleteHistory"
          >
        </div>
        <div class="search-all-item">
          <div class="null-remind" v-if="!haveHistory">暂无搜索历史</div>
          <div
            class="search-item"
            v-for="(flower, index) in historyList"
            :key="index"
            @click="searchByName"
          >{{flower.item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "../../../utils/dataHandle.js";

export default {
  data() {
    return {
      flowerName: "",
      fuzzyList: [],
      hotList: [],
      historyList: [],
      haveHot: false,
      haveHistory: false,
      fuzzyShow: false
    };
  },

  methods: {
    toAbout() {
      this.fuzzyShow = false;
      mpvue.navigateBack({
        delta: 1
      });

      // wx.switchTab({
      //     url: "../../../pages/about/main"
      // })
    },
    fuzzySearch() {
      this.fuzzyShow = false;
      this.fuzzyList = [];
      //模糊搜索
      this.$wxhttp
        .get({
          url: "/flower/name",
          data: {
            name: this.flowerName
          }
        })
        .then(res => {
          console.log("成功数据:", res);
          this.fuzzyList = res.data;
          this.fuzzyShow = true;
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    },
    toDetail(flowerId) {
      this.fuzzyShow = false;
      this.flowerStorage();
      mpvue.navigateTo({
        url: "../aboutDetail/main?flowerId=" + flowerId
      });
      this.fuzzyShow = false;
    },
    searchByName() {
      this.fuzzyShow = false;
      this.toDetail();
    },
    deleteHistory() {
      let that = this;
      if (this.historyList.length != 0) {
        wx.showModal({
          title: "提示",
          content: "确定删除历史记录吗？(ಥ_ಥ)",
          success(res) {
            if (res.confirm) {
              console.log("用户点击确定");
              that.historyList = [];
              wx.removeStorageSync("historySearch");
              that.haveHistory = false;
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
    },
    flowerStorage() {
      let flag = true;
      for (let i = 0; i < this.historyList.length; i++) {
        if (this.historyList[i].item == this.flowerName) {
          flag = false;
        }
      }

      if (flag && !isEmpty(this.flowerName)) {
        this.historyList.push({ item: this.flowerName });
      }else {
        return false;
      }
      flag = true;

      // 搜索历史本地缓存
      wx.setStorage({
        key: "historySearch",
        data: this.historyList
      });
    }
  },

  mounted() {
    // 获取搜索历史本地缓存
    wx.getStorage({
      key: "historySearch",
      success: res => {
        console.log(res);
        if (res.data != null) {
          this.haveHistory = true;
          this.historyList = res.data;
        }
      }
    });

    // 获取热门花卉
    this.$wxhttp
      .get({
        url: "/flower/hot"
      })
      .then(res => {
        console.log("成功数据:", res);
        if (res.data != null) {
          this.haveHot = true;
          this.hotList = res.data;
        }
      })
      .catch(err => {
        console.log(`自动请求api失败 err:`, err);
      });
  }
};
</script>

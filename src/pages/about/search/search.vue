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
</style>

<template>
    <div class="search">
        <div class="container-one">
            <div class="search-container">
                <input class="search-input">
                <img src="../../../../static/images/search.png" alt="搜索" class="searchIcon">
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
                    <div
                        class="search-item"
                        v-for="(flower, index) in hotList"
                        :key="index"
                    >{{flower.item}}</div>
                </div>
            </div>
            <div class="select-flower">
                <div class="select-title">
                    <h1>搜索历史</h1>
                    <img src="../../../../static/images/history.png" class="icon">
                    <img src="../../../../static/images/delete.png" class="delete-icon">
                </div>
                <div class="search-all-item">
                    <div
                        class="search-item"
                        v-for="(flower, index) in historyList"
                        :key="index"
                    >{{flower.item}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      hotList: [
        { item: "玫瑰" },
        { item: "茉莉花" },
        { item: "玫瑰" },
        { item: "玫瑰" },
        { item: "茉莉花" },
        { item: "玫瑰" },
        { item: "茉莉花" },
        { item: "玫瑰" },
        { item: "玫瑰" }
      ],
      historyList: [
        { item: "玫瑰" },
        { item: "茉莉花" },
        { item: "玫瑰" },
        { item: "玫瑰" },
        { item: "茉莉花" },
        { item: "玫瑰" },
        { item: "茉莉花" },
        { item: "玫瑰" },
        { item: "玫瑰" }
      ]
    };
  },

  methods: {
    toAbout() {
      mpvue.navigateBack({
          delta: 1
      });
    // wx.switchTab({
    //     url: "../../../pages/about/main"
    // })
    }
  }
};
</script>

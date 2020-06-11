<style scoped>
.about {
  position: absolute;
  top: 0;
  left: 0;
  width: 182%;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 微软雅黑;
  transition: left 0.7s;
  z-index: -2;
}

.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 57%;
  margin-left: -1%;
  border-top-right-radius: 10px;
  background-color: #f6faff;
  overflow: hidden;
  z-index: 1;
}

.white-bg {
  position: absolute;
  top: 3vh;
  left: 5%;
  width: 57%;
  height: 97vh;
  background-color: white;
  border-top-right-radius: 10px;
  z-index: 0;
}

/*上方固定层*/
.fixed-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  z-index: 20;
}
.fixed-bg {
  width: 100%;
  position: fixed;
  background-color: #f6faff;
}
.title {
  position: relative;
  width: 82%;
  font-size: 25px;
  font-weight: 500;
  margin: 0.5em auto;
  text-align: left;
}

.container-one {
  position: relative;
  width: 90%;
  padding: 0 0 12px 0;
  margin: 0 auto;
  margin-left: 18px;
}

.flower-icon {
  width: 30px;
  height: 30px;
  padding: 5px 0;
  float: left;
}
.search {
  position: absolute;
  top: 10px;
  right: 13px;
  width: 16px;
  height: 16px;
}
.select {
  position: absolute;
  top: -5px;
  right: -4px;
  width: 45px;
  height: 45px;
}

.select-current {
  float: left;
  padding: 9px 3px;
}

.search-container {
  position: relative;
  width: 55%;
  height: 38px;
  margin-left: 32%;
  background-color: #edf0f4;
  border-radius: 20px;
}

/*鲜花列表*/
.container-two {
  position: relative;
  width: 86%;
  margin: 0 auto;
  margin-top: 126px;
  padding-bottom: 26px;
}

.flower-card {
  position: relative;
  margin: 20px auto;
  margin-left: 23%;
  padding: 10px 0;
  padding-left: 27%;
  padding-right: 3%;
  width: 49%;
  height: 160px;
  border-radius: 4px;
  background: white;
  box-shadow: 1px 1px 4px rgba(131, 131, 131, 0.11);
}

.flower-pic {
  position: absolute;
  top: 15px;
  left: -30%;
  width: 58%;
  height: 150px;
  border-radius: 4px;
  z-index: 10;
}
.flower-name {
  margin: 20px auto;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
}
.flower-desc {
  margin: 5px auto;
  font-size: 15px;
  font-weight: 600;
  color: #00000080;
}

.pull-more {
  position: absolute;
  bottom: 5px;
  left: 20%;
  width: 60%;
  text-align: center;
  margin: 0 auto;
  font-size: 14px;
  color: rgba(97, 96, 96, 0.479);
}

/*筛选区域*/
.select-area {
  position: absolute;
  top: 2vh;
  right: 6%;
  width: 53vw;
  height: 96vh;
  word-wrap: break-word;
}
.select-container {
  position: relative;
  width: 53vw;
  height: 80vh;
}

.select-option {
  margin: 10px 0;
}
.select-title {
  margin: 10px 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

.select-item {
  display: inline-block;
  margin: 3px 9px;
  font-size: 14px;
  font-weight: 600;
}

.select-button-container {
  width: 53vw;
  height: 16vh;
  font-size: 0;
  color: white;
}
.select-button {
  position: absolute;
  width: 4vh;
  height: 4vh;
  padding: 2vh 2.5vh;
  padding-right: 1.5vh;
  font-size: 4vh;
  line-height: 4vh;
  border-radius: 10px;
}
.sure-select {
  bottom: 0;
  right: 0;
  background-color: #2cd18a;
}
.cancel-select {
  bottom: 0;
  right: 10vh;
  background-color: #e1e4e8;
}

</style>

<template>
  <div class="about" :style="{left: moveRight}">
    <div class="white-bg" @click.stop="moveBack"></div>
    <div class="select-area">
      <div class="select-container">
        <div class="select-option">
          <div class="select-title">花卉类别</div>
          <div
            class="select-item"
            v-for="(category, index) in selectList1"
            :key="index"
            @click="chooseItem('A',index,category.item)"
            :style="{color: (itemCurrentA == index && selectType == 'A')? '#2CD18A':'black'}"
          >{{category.item}}</div>
        </div>
        <div class="select-option">
          <div class="select-title">花卉功能</div>
          <div
            class="select-item"
            v-for="(category, index) in selectList2"
            :key="index"
            @click="chooseItem('B',index,category.item)"
            :style="{color: (itemCurrentB == index && selectType == 'B')? '#2CD18A':'black'}"
          >{{category.item}}</div>
        </div>
        <div class="select-option">
          <div class="select-title">盛花期/习性</div>
          <div
            class="select-item"
            v-for="(category, index) in selectList3"
            :key="index"
            @click="chooseItem('C',index,category.item)"
            :style="{color: (itemCurrentC == index && selectType == 'C')? '#2CD18A':'black'}"
          >{{category.item}}</div>
        </div>
        <div class="select-option">
          <div class="select-title">养护难度</div>
          <div
            class="select-item"
            v-for="(category, index) in selectList4"
            :key="index"
            @click="chooseItem('D',index,category.item)"
            :style="{color: (itemCurrentD == index && selectType == 'D')? '#2CD18A':'black'}"
          >{{category.item}}</div>
        </div>
      </div>
      <div class="select-button-container">
        <div class="sure-select select-button" @click.stop="dataRequest(1)">✓</div>
        <div class="cancel-select select-button" @click.stop="moveBack">×</div>
      </div>
    </div>
    <div class="main" @click.stop="moveBack" :style="{height: viewHeight}">
      <div class="fixed-container">
        <div class="fixed-bg">
          <h1 class="title">关于种花</h1>
          <div class="container-one">
            <img src="../../../static/images/flower_icon.png" alt="花花图标" class="flower-icon">
            <div class="select-current">{{selectCurrent}}</div>
            <div class="search-container" @click="toSearch">
              <img src="../../../static/images/search.png" alt="搜索" class="search">
            </div>
            <img
              src="../../../static/images/select.png"
              alt="筛选"
              class="select"
              @click.stop="selectFun"
            >
          </div>
        </div>
      </div>
      <div class="container-two">
        <div
          class="flower-card"
          v-for="(flower , index) in flowerList"
          :key="index"
          @click="toDetail(flower.flowerId)"
        >
          <img :src="flower.src" class="flower-pic">
          <div class="flower-name">{{flower.name}}</div>
          <p class="flower-desc">{{flower.description}}</p>
        </div>
        <div class="pull-more">上拉加载更多...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageCurrent: 1,
      selectCurrent: "趣味类",
      flowerList: [],
      moveRight: 0,
      viewHeight: "",
      itemCurrentA: 100,
      itemCurrentB: 100,
      itemCurrentC: 100,
      itemCurrentD: 100,
      selectType: "A",
      itemName: "趣味类",
      selectList1: [
        { item: "趣味类" },
        { item: "芳香类" },
        { item: "观果类" },
        { item: "观花类" },
        { item: "观花类" },
        { item: "观茎类" },
        { item: "节庆类" },
        { item: "垂吊类" },
        { item: "果蔬类" },
        { item: "水培类" },
        { item: "盆栽类" },
        { item: "地被草坪" }
      ],
      selectList2: [
        { item: "观赏" },
        { item: "提神" },
        { item: "类别一" },
        { item: "杀菌" },
        { item: "驱蚊" },
        { item: "药用" },
        { item: "吸甲醛" },
        { item: "防辐射" },
        { item: "净化空气" }
      ],
      selectList3: [
        { item: "春季" },
        { item: "夏季" },
        { item: "秋季" },
        { item: "冬季" },
        { item: "四季" },
        { item: "喜阳" },
        { item: "喜阴" },
        { item: "不开花" }
      ],
      selectList4: [
        { item: "容易养殖" },
        { item: "留心养殖" },
        { item: "精心养护" },
        { item: "专业养护" }
      ]
    };
  },

  methods: {
    toDetail(flowerId) {
      if (!this.moveRight) {
        mpvue.navigateTo({
          url: "../about/aboutDetail/main?flowerId=" + flowerId
        });
      }
    },
    toSearch() {
      if (!this.moveRight) {
        mpvue.navigateTo({
          url: "../about/search/main"
        });
      }
    },
    selectFun() {
      if (!this.moveRight) {
        this.moveRight = "-75%";
        this.viewHeight = "100vh";
      }
    },
    moveBack() {
      if (this.moveRight == "-75%") {
        this.moveRight = 0;
        this.viewHeight = "";
      }
    },
    chooseItem(type, e, itemName) {
      this.selectType = type;
      this[`itemCurrent${type}`] = e;
      this.itemName = itemName;
    },
    dataRequest(page) {
      // 获取花花列表
      this.$wxhttp
        .post({
          url: "/flower",
          data: {
            page: page,
            pageSize: 6,
            type: this.itemName
          }
        })
        .then(res => {
          console.log("成功数据:", res);
          let flowerList = res.data;
          for (let i = 0; i < flowerList.length; i++) {
            let desc = flowerList[i].description;
            if (desc.length >= 37) {
              flowerList[i].description = desc.substring(0, 37) + "...";
            }
            if (this.selectCurrent != this.itemName) {
              this.selectCurrent = this.itemName;
              this.pageCurrent = 1;
              this.flowerList = [];
            } else {
              // 隐藏加载框
              wx.hideLoading();
            }
            this.flowerList.push(flowerList[i]);
            this.moveBack();
          }
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    }
  },
  onReachBottom: function() {
    // 显示加载图标
    wx.showLoading({
      title: "玩命加载中"
    });

    // 页数+1
    this.pageCurrent++;

    this.dataRequest(this.pageCurrent);
  },
  mounted() {
    this.dataRequest(1);
  }
};
</script>


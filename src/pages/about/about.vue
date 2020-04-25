<style scoped>
.about {
  position: absolute;
  top: 0;
  left: 0;
  width: 182%;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 微软雅黑;
  transition: left 1s;
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
  margin: 0 auto;
}

.sunny {
  width: 40px;
  height: 40px;
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

.temperature {
  float: left;
  padding: 9px 5px;
}

.search-container {
  position: relative;
  width: 60%;
  height: 36px;
  margin-left: 28%;
  background-color: #edf0f4;
  border-radius: 20px;
}

/*鲜花列表*/
.container-two {
  position: relative;
  width: 86%;
  margin: 0 auto;
  margin-top: 126px;
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
  width: 100%;
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
  color: black;
}
.select-item:hover {
  color: #2cd18a;
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
            @click="chooseItem"
          >{{category.item}}</div>
        </div>
        <div class="select-option">
          <div class="select-title">花卉功能</div>
          <div
            class="select-item"
            v-for="(category, index) in selectList2"
            :key="index"
             @click="chooseItem"
          >{{category.item}}</div>
        </div>
        <div class="select-option">
          <div class="select-title">盛花期/习性</div>
          <div
            class="select-item"
            v-for="(category, index) in selectList3"
            :key="index"
             @click="chooseItem"
          >{{category.item}}</div>
        </div>
        <div class="select-option">
          <div class="select-title">养护难度</div>
          <div
            class="select-item"
            v-for="(category, index) in selectList4"
            :key="index"
             @click="chooseItem"
          >{{category.item}}</div>
        </div>
      </div>
      <div class="select-button-container">
        <div class="sure-select select-button" @click.stop="sureSelect">✓</div>
        <div class="cancel-select select-button" @click.stop="moveBack">×</div>
      </div>
    </div>
    <div class="main" @click.stop="moveBack" :style="{height: viewHeight}">
      <div class="fixed-container">
        <div class="fixed-bg">
          <h1 class="title">关于种花</h1>
          <div class="container-one">
            <img src="../../../static/images/sunny.png" alt="晴天" class="sunny">
            <div class="temperature">25℃</div>
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
          @click="toDetail"
        >
          <img :src="flower.src" class="flower-pic">
          <div class="flower-name">{{flower.name}}</div>
          <p class="flower-desc">{{flower.desc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      flowerList: [
        {
          src: "https://s1.ax1x.com/2020/04/22/JN7PmT.png",
          name: "茉莉花",
          desc: `茉莉喜温暖湿润和阳光
                充足环境，叶色翠绿，
                花朵颜色洁白，香气浓
                郁，是最常见的芳香...`
        },
        {
          src: "https://s1.ax1x.com/2020/04/22/JN7PmT.png",
          name: "茉莉花",
          desc: `茉莉喜温暖湿润和阳光
                充足环境，叶色翠绿，
                花朵颜色洁白，香气浓
                郁，是最常见的芳香...`
        },
        {
          src: "https://s1.ax1x.com/2020/04/22/JN7PmT.png",
          name: "茉莉花",
          desc: `茉莉喜温暖湿润和阳光
                充足环境，叶色翠绿，
                花朵颜色洁白，香气浓
                郁，是最常见的芳香...`
        },
        {
          src: "https://s1.ax1x.com/2020/04/22/JN7PmT.png",
          name: "茉莉花",
          desc: `茉莉喜温暖湿润和阳光
                充足环境，叶色翠绿，
                花朵颜色洁白，香气浓
                郁，是最常见的芳香...`
        }
      ],
      moveRight: 0,
      viewHeight: "",
      selectList1: [
        { item: "类别一" },
        { item: "类别" },
        { item: "类别一" },
        { item: "类别特殊" },
        { item: "类别一" },
        { item: "类别一" },
        { item: "类别三" },
        { item: "类别一" },
        { item: "类别一" },
        { item: "类别" },
        { item: "类别一" },
        { item: "类别特殊" }
      ],
      selectList2: [
        { item: "类别一" },
        { item: "类别" },
        { item: "类别一" },
        { item: "类别特殊" },
        { item: "类别一" },
        { item: "类别一" },
        { item: "类别" },
        { item: "类别一" },
        { item: "类别特殊" }
      ],
      selectList3: [
        { item: "类别" },
        { item: "类别" },
        { item: "类别" },
        { item: "类别" },
        { item: "类别" },
        { item: "类别" },
        { item: "类别特殊" }
      ],
      selectList4: [
        { item: "类别特殊" },
        { item: "类别特殊" },
        { item: "类别特殊" },
        { item: "类别特殊" }
      ]
    };
  },

  methods: {
    toDetail() {
      if (!this.moveRight) {
        mpvue.navigateTo({ url: "../about/aboutDetail/main" });
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
      console.log(this.$refs.main);
    },
    moveBack() {
      if (this.moveRight == "-75%") {
        this.moveRight = 0;
        this.viewHeight = "";
      }
    },
    chooseItem(){
      this.fontColor = "2cd18a";
    }
  },

  mounted() {}
};
</script>


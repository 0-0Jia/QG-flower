<style scoped>
.day {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f6faff;
}
.title {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5em 0;
  width: 100%;
  font-size: 25px;
  font-weight: 500;
  text-align: left;
  text-indent: 5%;
  background-color: #f6faff;
  z-index: 1;
}
.cardCon {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f6faff;
  transform: translateX(-125vw);
  transition: transform 0.5s;
  /* overflow-X: scroll; */
}
.cardCon .card1,
.cardCon .card2,
.cardCon .card3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f6faff;
  /* transition: transform 0.5s; */
  overflow-y: auto;
}
.cardCon .left,
.cardCon .right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 20vw;
  height: 100vh;
  background: rgba(237, 240, 244, 1);
  color: rgba(0, 0, 0, 0.48);
}
.cardCon .left span,
.cardCon .right span {
  display: block;
  width: 20vw;
  font-size: 18px;
  line-height: 1.5em;
}

.cardCon .left {
  text-align: left;
  padding-left: 5vw;
  transform: translateX(0);
}
.cardCon .card1 {
  transform: translateX(25vw);
}
.cardCon .card2 {
  transform: translateX(125vw);
}
.cardCon .card3 {
  transform: translateX(225vw);
}
.cardCon .right {
  text-align: right;
  padding-right: 5vw;
  transform: translateX(325vw);
}
</style>

<template>
  <div class="day">
    <h1 class="title">一日一花</h1>
    <div
      class="cardCon"
      :style="{transform: translate}"
      @touchstart="touchStartFun"
      @touchend="touchEndFun"
    >
      <div class="left">
        <span>来</span>
        <span>日</span>
        <span>可</span>
        <span>期</span>
      </div>
      <div class="card1">
        <card0 v-if='cardData1' :cardData="cardData1" :index="1"></card0>
      </div>
      <div class="card2">
        <card0 v-if='cardData2' :cardData="cardData2" :index="2"></card0>
      </div>
      <div class="card3">
        <card0 v-if='cardData3' :cardData="cardData3" :index="3"></card0>
      </div>
      <div class="right">
        <span>前</span>
        <span>日</span>
        <span>不</span>
        <span>可</span>
        <span>追</span>
      </div>
    </div>
  </div>
</template>

<script>
import card0 from "./card/card0.vue";
import card1 from "./card/card1.vue";
import card2 from "./card/card2.vue";
import httpRequest from "../../utils/httpRequest.js";
export default {
  data() {
    return {
      cardData1: null,
      cardData2: null,
      cardData3: null,
      showIndex: 1,
      touchStartX: null,
      touchEndX: null,
      eventLimit: false
    };
  },
  computed: {
    translate() {
      if (this.showIndex == 0) {
        return `translateX(0)`;
      } else if (this.showIndex == 1) {
        return `translateX(-25vw)`;
      } else if (this.showIndex == 2) {
        return `translateX(-125vw)`;
      } else if (this.showIndex == 3) {
        return `translateX(-225vw)`;
      } else if (this.showIndex == 4) {
        return `translateX(-250vw)`;
      }
      return `translateX(0)`;
    }
  },
  components: {
    card0,
    card1,
    card2
  },
  methods: {
    getData() {
      wx.showLoading({
        title: "加载中" // 数据请求前loading
      });
      let send = {
        url: "/flower/daily"
      };
      httpRequest.get(send).then(res => {
        console.log(res);
        wx.hideLoading();
        if (res.code == 1) {
          this.cardData1 = res.data[0];
          this.cardData2 = res.data[1];
          this.cardData3 = res.data[2];
        } else {
        }
      });
    },
    touchStartFun(event) {
      event.preventDefault();
      this.touchStartX = event.mp.touches[0].pageX;
    },
    touchEndFun(event) {
      event.preventDefault();
      this.touchEndX = event.mp.changedTouches[0].pageX;
      this.touchChangePage();
    },
    touchChangePage() {
      // 触摸滚动事件
      let distance = this.touchEndX - this.touchStartX;
      if (distance < 50 && distance > -50) {
        // 点击
        return;
      }
      if (this.eventLimit) {
        return;
      }
      this.eventLimit = true;
      if (distance > 0) {
        // 右滚
        if (this.showIndex == 0) {
          return;
        }
        this.showIndex--;
        if (this.showIndex == 0) {
          setTimeout(() => {
            this.showIndex++;
            setTimeout(() => {
              this.eventLimit = false;
            }, 500);
          }, 1000);
        } else {
          setTimeout(() => {
            this.eventLimit = false;
          }, 500);
        }
      } else {
        // 左滚
        if (this.showIndex == 4) {
          return;
        }
        this.showIndex++;
        if (this.showIndex == 4) {
          setTimeout(() => {
            this.showIndex--;
            setTimeout(() => {
              this.eventLimit = false;
            }, 500);
          }, 1000);
        } else {
          setTimeout(() => {
            this.eventLimit = false;
          }, 500);
        }
      }
      console.log(this.showIndex);
    }
  },
  mounted() {
    this.getData();
  },
  created() {}
};
</script>




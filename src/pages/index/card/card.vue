<style scoped>
.cardList {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90vw;
  height: 75vh;
  transform: translate(-50%, -50%);
}
.cardList .card {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em 2.5vw;
  width: 80vw;
  height: 70vh;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #999;
  transition: transform 0.5s;
}
.cardList .card0 {
  transform: translate(0, 0);
  z-index: 3;
}
.cardList .card1 {
  transform: translate(2.5vw, 2.5vh);
  z-index: 2;
}
.cardList .card2 {
  transform: translate(5vw, 5vh);
  z-index: 1;
}
.card .month {
    height: 6vh;
    line-height: 6vh;
    font-size: 4vh;
}
.card .date {
    height: 7vh;
    line-height: 7vh;
    font-size: 5.5vh;
    font-weight: bold;
}
.card .img {
    height: 26vh;
    background: #f40;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    border-radius: 5px;
}
.card .name {
    height: 7vh;
    line-height: 7vh;
    font-size: 4vh;
}
.card .introduce {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
}
.card .language {
    display: flex;
    align-items: flex-start;
    margin-top: 0.5em;
    font-size: 14px;
}
.card div .item {
    display: block;
    width: 20%;
    font-weight: bold;
    text-align: center;
}
.card div .data {
    display: block;
    width: 80%;
    overflow-y: auto;
}
.card .introduce .data {
    max-height: 15vh;
}
.card .language .data {
    max-height: 8vh;
}
</style>

<template>
  <div class="cardList" @touchstart="touchStartFun" @touchend="touchEndFun">
    <div
      class="card"
      v-for="(data, index) in cardList"
      :key="index"
      :class="{
        'card0':index==showIndex,
        'card1':(index+2)%3==showIndex,
        'card2':(index+1)%3==showIndex,
        }"
    >
      <div class="month">{{month}}</div>
      <div class="date">
        <span class="num">{{date}}</span>
        <span style="font-size: 16px;font-weight: normal;"> th</span>
      </div>
      <div class="img"></div>
      <div class="name">{{data.name}}</div>
      <div class="introduce">
          <span class="item">简介</span>
          <span class="data">茉莉花洁白芳香，枝叶繁茂，叶色碧如翡翠，花朵白似玉铃，花期长，小巧玲珑，玉洁光润，凝脂雕琼，清淡不妆</span>
      </div>
      <div class="language">
          <span class="item">花语</span>
          <span class="data">送花人表达的是另一种情愫——你是我最深的爱恋希望永远铭记我们这段美丽</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardList: Array
  },
  data() {
    return {
      month: "",
      date: "",
      showIndex: 0,
      Animation: false,
      touchStartX: null,
      touchEndX: null
    };
  },
  methods: {
    getMonth(monthNum) {
      if (monthNum == 1) {
        return "January";
      } else if (monthNum == 2) {
        return "February";
      } else if (monthNum == 3) {
        return "March";
      } else if (monthNum == 4) {
        return "April";
      } else if (monthNum == 5) {
        return "May";
      } else if (monthNum == 6) {
        return "June";
      } else if (monthNum == 7) {
        return "July";
      } else if (monthNum == 8) {
        return "August";
      } else if (monthNum == 9) {
        return "September";
      } else if (monthNum == 10) {
        return "October";
      } else if (monthNum == 11) {
        return "November";
      } else if (monthNum == 12) {
        return "December";
      }
      return "";
    },
    changePage() {
      let nowIndex = this.showIndex;
      this.showIndex = (nowIndex + 1) % 3;
    },
    touchStartFun(event) {
        event.preventDefault();
        //console.log('触摸开始'+event.mp.touches[0].pageX)
        this.touchStartX = event.mp.touches[0].pageX;
    },
    touchEndFun(event) {
        event.preventDefault();
        //console.log('触摸介绍'+ event.mp.changedTouches[0].pageX)
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
      let nowIndex = this.showIndex;
      if (distance > 0) {
        // 右滚
        this.showIndex = (nowIndex + 5) % 3;
      } else {
        // 左滚
        this.showIndex = (nowIndex + 1) % 3;
        // this.showIndex = (nowIndex + 5) % 3;
      }
      console.log(this.showIndex);
    }
  },
  computed: {},
  created() {
    let now = new Date();
    this.date = now.getDate();
    this.month = this.getMonth(now.getMonth() + 1);
  }
};
</script>



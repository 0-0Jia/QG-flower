<style scoped>
@import "../../../style/flower.wxss";
/* @font-face {
  font-family: "flower";
  src: url(../../../../static/font/flower.ttf);
} */
.top {
  margin-top: 60px;
}
.top .month {
  height: 1em;
  line-height: 1em;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color:rgba(0,0,0,0.64);
}
.top .date {
  position: relative;
  height: 90px;
  width: 100vw;
}
.top .date .bg, .top .date .data{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-weight: bold;
}
.top .date .bg {
  z-index: 0;
  font-size: 45px;
  height: 2em;
  line-height: 2.1em;
  
  color:rgba(32,50,80,0.08);
}
.top .date .data{
  z-index: 1;
  font-size: 75px;
  height: 1.2em;
  line-height: 1.2em;
  color:rgba(0,0,0,0.72);
}

.center {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  width: 70vw;
}
.center .img {
  height: 10em;
  width: 10em;
  border-radius: 0.5em;
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  /* background-color: #f40; */
}
.center .name {
  width: 1em;
  /* height: 5em; */
  line-height: 1.1em;
  font-size: 40px;
  font-family: "flower";
}

.bottom .meaning,
.bottom .introduce {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5em 10vw;
  text-overflow: ellipsis;
}
.bottom .item {
  width: 15vw;
  line-height: 1.2em;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.72);
  font-weight: bold;
  text-align: left;
}
.bottom .data {
  width: 65vw;
  line-height: 1.2em;
  font-size: 16px;
  color:rgba(0,0,0,0.48);
  font-weight: bold;
  text-align: justify;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.bottom .intrHide {
  display: -webkit-box;
} 
</style>

<template>
  <div class="card0">
    <div class="top">
      <!-- <div class="month">{{index}}</div> -->
      <div class="month">{{month}}</div>
      <div class="date">
        <span class="bg" v-if='index==1'>TODAY</span>
        <span class="data">{{date}}</span>
      </div>
    </div>
    <div class="center">
      <div class="img" :style="{'background-image': imgUrl}"></div>
      <div class="name">{{cardData.name}}</div>
    </div>
    <div class="bottom">
      <div class="meaning">
        <div class="item">花语</div>
        <div class="data">{{cardData.meaning}}</div>
      </div>
      <div class="introduce">
        <div class="item">简介</div>
        <div class="data" :class="{intrHide:intrHide}" @click="intrHide=!intrHide">{{cardData.description}}</div>
      </div>
    </div>

    <!-- <div class="meaning">
      <span class="item">花语</span>
      <span class="data">{{cardData.meaning}}</span>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    cardData: Object,
    index: Number,
  },
  data() {
    return {
      month: "",
      date: "",
      intrHide: true
    };
  },
  methods: {
    getMonth(monthNum) {
      if (monthNum == 1) {
        return "一月";
      } else if (monthNum == 2) {
        return "二月";
      } else if (monthNum == 3) {
        return "三月";
      } else if (monthNum == 4) {
        return "四月";
      } else if (monthNum == 5) {
        return "五月";
      } else if (monthNum == 6) {
        return "六月";
      } else if (monthNum == 7) {
        return "七月";
      } else if (monthNum == 8) {
        return "八月";
      } else if (monthNum == 9) {
        return "九月";
      } else if (monthNum == 10) {
        return "十月";
      } else if (monthNum == 11) {
        return "十一月";
      } else if (monthNum == 12) {
        return "十二月";
      }
      return "";
    }
  },
  computed: {
    imgUrl() {
      // return "url(https://wx2.sbimg.cn/2020/05/20/5b8fcb7998638_140_120.jpg)";
      if (this.cardData && this.cardData.src) {
        return `url(${this.cardData.src})`;
      } else {
        return "url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=38660309,594947755&fm=11&gp=0.jpg)";
      }
    },
  },
  created() {
    let time = new Date();
    if(this.index == 2) {
      time.setTime(time.getTime()-86400000);
    } else if(this.index == 3) {
      time.setTime(time.getTime()-2*86400000);
    }
    this.date = time.getDate();
    this.month = this.getMonth(time.getMonth() + 1);
  }
};
</script>



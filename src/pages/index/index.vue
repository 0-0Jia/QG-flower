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
        <card0 :cardData="cardData" :index="1"></card0>
      </div>
      <div class="card2">
        <card0 :cardData="cardData" :index="2"></card0>
      </div>
      <div class="card3">
        <card0 :cardData="cardData" :index="3"></card0>
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
      cardData: {
        // flowerId: 1,
        // name: '茉莉花',
        // src: 'http://img5.imgtn.bdimg.com/it/u=3905026749,806656350&fm=26&gp=0.jpg',
        // description: '茉莉喜温暖湿润和阳光充足环境，叶色翠绿，花朵颜色洁白，香气浓郁，是最常见的芳香性盆栽花木。在素馨属中，最著名的一种是双瓣茉莉，也就是人们平常俗称的茉莉花。茉莉有着良好的保健和美容功效，可以用来饮食，可用于茉莉花茶的制作。茉莉花是菲律宾、突尼斯、印尼的国花，象征着爱情和友谊。',
        // meaning: '你是我的生命',
        // family: '木犀科素馨属',
        // reproduction: '扦插、压条',
        // fruitStage: '花期6~10月',
        // environment: {
        //   sun :'全日照或半日照，喜光，稍耐阴。',
        //   temperature: '适温22℃~33℃，喜高温，不耐寒。',
        //   soil: '喜富含腐殖质的微酸性砂质壤土。',
        //   water: '喜湿润，不耐干旱。',
        // },
        // technique: '盆栽茉莉花：盛夏季每天要早、晚浇水，如空气干燥，需补充喷水；冬季休眠期，要控制浇水量，如盆土过湿，会引起烂根或落叶。生长期间需要每周施稀薄饼肥一次。春季换盆后，要经常摘心整形，盛花期后，要重剪，以利萌发新枝，使植株整齐健壮，开花旺盛。从6月至9月开花期勤施含磷较多的液肥，最好每2—3天施一次，肥料可用腐熟好的豆饼和鱼腥水肥液，或者用硫酸铵、过磷酸钙，一般化肥成分兑多了会烧死茉莉植株。也可以用0.l%磷酸二氢钾水溶液，在傍晚向叶面喷洒，也可促其多开花。茉莉花极喜肥，只要养护得当，盆栽茉莉一年可以开三次花。如果是肥料不足、养分不够，开一次花后，就不再开花了。管理到位的话，可以不停的从5月底开到11月初。关键是修剪、阳光、和肥水的掌握。',
        // type: '观花类',
        // recommend: '婚礼鲜花'
      },
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
          this.cardData = res.data;
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




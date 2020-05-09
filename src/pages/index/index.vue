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
  width: 90%;
  font-size: 25px;
  font-weight: 500;
  margin: 0.5em auto;
  text-align: left;
}
.cardCon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90vw;
  height: 75vh;
  transform: translate(-50%, -50%);
}
.cardCon .card {
  position: absolute;
  top: 0;
  left: 0;
  padding: 2.5vh 2.5vw;
  width: 80vw;
  height: 70vh;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #999;
  transition: transform 0.5s;
}
.cardCon .show0 {
  transform: translate(0, 0);
  z-index: 3;
}
.cardCon .show1 {
  transform: translate(2.5vw, 2.5vh);
  z-index: 2;
}
.cardCon .show2 {
  transform: translate(5vw, 5vh);
  z-index: 1;
}
</style>

<template>
  <div class="day">
    <h1 class="title">一日一花</h1>
    <div class="cardCon" @touchstart="touchStartFun" @touchend="touchEndFun">
      <div class="card" :class="{'show0':0==showIndex,'show1':2==showIndex,'show2':1==showIndex,}">
        <card0 :cardData="cardData"></card0>
      </div>
      <div class="card" :class="{'show0':1==showIndex,'show1':0==showIndex,'show2':2==showIndex,}">
        <card1 :cardData="cardData"></card1>
      </div>
      <div class="card" :class="{'show0':2==showIndex,'show1':1==showIndex,'show2':0==showIndex,}">
        <card2 :cardData="cardData"></card2>
      </div>
    </div>
    
  </div>
</template>

<script>
import card0 from "./card/card0.vue";
import card1 from "./card/card1.vue";
import card2 from "./card/card2.vue";
import httpRequest from '../../utils/httpRequest.js'
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
      showIndex: 0,
      touchStartX: null,
      touchEndX: null
    };
  },

  components: {
    card0,
    card1,
    card2
  },

  methods: {
    getData() {
      let send = {
        url:'/flower/daily'
      }
      httpRequest.get(send).then((res)=>{
        console.log(res);
        if(res.code == 1) {
          this.cardData = res.data;
        } else {

        }
      });
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
  mounted() {this.getData()},
  created() {}
};
</script>




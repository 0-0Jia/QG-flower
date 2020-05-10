<style scoped>
.about-detail {
  width: 100%;
  height: 100%;
  font-family: 微软雅黑;
}
.flower-pic {
  width: 100%;
  height: 250px;
  /* background-image: url("https://s1.ax1x.com/2020/04/22/JN7PmT.png"); */
  background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;
}
.draw {
  background-color: #f6faff;
  width: 100%;
  /* height: 100vh; */
  padding-bottom: 20px;
  margin-top: -60px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}

.flower-name {
  width: 90%;
  color: black;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 15px 35px;
  padding-top: 30px;
}

.flower-detail {
  margin: 0 auto;
}

.flower-group {
  width: 92%;
  margin: 0 auto;
}

.detail-small-title {
  margin: 15px auto;
  text-align: left;
  line-height: 20px;
}

.flower-logo {
  float: left;
  width: 20px;
  height: 20px;
}
.detail-title {
  width: 80%;
  margin: 10px 0;
  margin-left: 35px;
  font-size: 16px;
  font-weight: 600;
  color: #ff8a8a;
}
.text {
  margin: 5px 9%;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 1px;
}

.card {
  font-size: 0;
  margin: 5px auto;
  width: 97%;
  padding: 5px 10px;
  background-color: white;
  border-radius: 4px;
  text-align: center;
  box-shadow: 1px 1px 3px rgba(138, 138, 138, 0.247);
}
.card-item {
  display: inline-block;
  width: 49%;
  padding-left: 1%;
  height: 100px;
  vertical-align: top;
}
.card-item-title {
  width: 50%;
  margin: 5px auto;
  margin-top: 15px;
  text-align: center;
  font-size: 15px;
}
.card-item-title img {
  float: left;
  width: 20px;
  height: 20px;
}
.card-desc {
  width: 95%;
  margin: 15px auto;
  text-align: center;
  font-size: 14px;
}
</style>

<template>
  <div class="about-detail">
    <div
      class="flower-pic"
      :style="{backgroundImage: 'url('+ 'https://s1.ax1x.com/2020/04/22/JN7PmT.png'+')'}"
    ></div>
    <div class="draw">
      <h1 class="flower-name">{{flower.name}}</h1>
      <div class="flower-detail">
        <div class="flower-group">
          <div class="detail-small-title">
            <img src="../../../../static/images/flower_group.png" class="flower-logo">
            <h1 class="detail-title">介绍</h1>
          </div>
          <p class="text">{{flower.description}}</p>
        </div>
      </div>
      <div class="flower-group">
        <div class="detail-small-title">
          <img src="../../../../static/images/flower_group.png" class="flower-logo">
          <h1 class="detail-title">花语</h1>
        </div>
        <p class="text">{{flower.meaning}}</p>
      </div>
      <div class="flower-group">
        <div class="detail-small-title">
          <img src="../../../../static/images/flower_group.png" class="flower-logo">
          <h1 class="detail-title">科属</h1>
        </div>
        <p class="text">{{flower.family}}</p>
      </div>
      <div class="flower-group">
        <div class="detail-small-title">
          <img src="../../../../static/images/flower_group.png" class="flower-logo">
          <h1 class="detail-title">繁殖方式</h1>
        </div>
        <p class="text">{{flower.reproduction}}</p>
      </div>
      <div class="flower-group">
        <div class="detail-small-title">
          <img src="../../../../static/images/flower_group.png" class="flower-logo">
          <h1 class="detail-title">花果期</h1>
        </div>
        <p class="text">{{flower.fruitStage}}</p>
      </div>
      <div class="flower-group">
        <div class="detail-small-title">
          <img src="../../../../static/images/flower_group.png" class="flower-logo">
          <h1 class="detail-title">环境要求</h1>
        </div>
        <div class="text">
          <div class="card">
            <div class="card-item">
              <div class="card-item-title">
                <img src="../../../../static/images/sun.png">
                <div style="margin-left: 22px">日照</div>
              </div>
              <p class="card-desc">{{flower.sun}}</p>
            </div>
            <div class="card-item">
              <div class="card-item-title">
                <img src="../../../../static/images/temperature.png">
                <div style="margin-left: 22px;">温度</div>
              </div>
              <p class="card-desc">{{flower.temperature}}</p>
            </div>
            <div class="card-item">
              <div class="card-item-title">
                <img src="../../../../static/images/soil.png">
                <div style="margin-left: 22px">土壤</div>
              </div>
              <p class="card-desc">{{flower.soil}}</p>
            </div>
            <div class="card-item">
              <div class="card-item-title">
                <img src="../../../../static/images/water.png">
                <div style="margin-left: 22px">水分</div>
              </div>
              <p class="card-desc">{{flower.water}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flower-group">
        <div class="detail-small-title">
          <img src="../../../../static/images/flower_group.png" class="flower-logo">
          <h1 class="detail-title">栽培技术</h1>
        </div>
        <p class="text">{{flower.technique}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flower: {
        name: "茉莉花",
        meaning: `你是我的生命。`,
        description: `茉莉喜温暖湿润和阳光充足环境，叶色翠绿，
                    花朵颜色洁白，香气浓郁，是最常见的芳香性
                    盆栽花木。在素馨属中，最著名的一种是双瓣
                    茉莉，也就是人们平常俗称的茉莉花。茉莉有
                    着良好的保健和美容功效，可以用来饮食，可
                    用于茉莉花茶的制作。茉莉花是菲律宾、突尼
                    斯、印尼的国花，象征着爱情和友谊。`,
        family: "木犀科素馨属",
        reproduction: "扦插、压条",
        fruitStage: "花期6~10月",
        enviromentRequire: {
          sun: `全日照或半日照，喜光，稍耐阴。`,
          temperature: `适温22℃~33℃，喜高温，不耐寒。`,
          soil: `喜富含腐殖质的微酸性砂质壤土。`,
          water: `喜湿润，不耐干旱。`
        },
        technique: `盆栽茉莉花：盛夏季每天要早、晚浇水，
                        如空气干燥，需补充喷水；冬季休眠期，要控
                        制浇水量，如盆土过湿，会引起烂根或落叶。
                        生长期间需要每周施稀薄饼肥一次。春季换盆
                        后，要经常摘心整形，盛花期后，要重剪，以
                        利萌发新枝，使植株整齐健壮，开花旺盛。
                            从6月至9月开花期勤施含磷较多的液肥，
                        最好每2—3天施一次，肥料可用腐熟好的豆饼
                        和鱼腥水肥液，或者用硫酸铵、过磷酸钙，一
                        般化肥成分兑多了会烧死茉莉植株。也可以用
                        0.l%磷酸二氢钾水溶液，在傍晚向叶面喷洒，
                        也可促其多开花。
                            茉莉花极喜肥，只要养护得当，盆栽茉莉
                        一年可以开三次花。如果是肥料不足、养分不
                        够，开一次花后，就不再开花了。管理到位的
                        话，可以不停的从5月底开到11月初。关键是
                        修剪、阳光、和肥水的掌握。`
      }
      // 抽屉
    };
  },

  methods: {},
  mounted() {
    console.log(this.$root.$mp.query);
    if (this.$root.$mp.query.flowerId) {
      this.$wxhttp
        .get({
          url: "/flower/" + this.$root.$mp.query.flowerId
        })
        .then(res => {
          console.log("成功数据:", res);
          this.flower = res.data;
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    }
  }
};
</script>

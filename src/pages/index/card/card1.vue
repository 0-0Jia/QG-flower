<style scoped>
.card1 .list {
  display: flex;
  align-items: flex-start;
  margin: 0.5em 0;
  font-size: 16px;
}
.card1 .list .item {
  display: block;
  width: 5em;
  font-weight: bold;
}
.card1 .list .data {
  display: block;
}
.card1 .environment {
    font-size: 16px;
}
.card1 .environment .item {
  width: 100%;
  font-weight: bold;
}
.card1 .environment .data {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; 
}
.card1 .environment .list2 {
    margin: 0.5em 0;
    width: 45%;
}
.card1 .environment .list2 .item2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.card1 .environment .list2 .item2 img {
    height: 1.5em;
    width: 1.5em;
}
.card1 .environment .list2 .data2 {
    display: block;
    width: 100%;
    color: #666;
    font-size: 14px;
    text-align: center;
    /* max-height: 2em;
    overflow-y: auto; */
}
</style>

<template>
  <div class="card1">
    <div class="list">
      <span class="item">科属</span>
      <span class="data">{{cardData.family}}</span>
    </div>
    <div class="list">
      <span class="item">繁殖方式</span>
      <span class="data">{{cardData.reproduction}}</span>
    </div>
    <div class="list">
      <span class="item">花果期</span>
      <span class="data">{{cardData.fruitStage}}</span>
    </div>
    <div class="environment">
      <div class="item">环境要求</div>
      <div class="data">
        <div class="list2">
          <span class="item2">
              <img src="../../../../static/images/sun.png">
              <span>日照</span>
            </span>
          <span class="data2">{{cardData.environment.sun}}</span>
        </div>
        <div class="list2">
          <span class="item2">
              <img src="../../../../static/images/temperature.png">
              <span>温度</span>
          </span>
          <span class="data2">{{cardData.environment.temperature}}</span>
        </div>
        <div class="list2">
          <span class="item2">
              <img src="../../../../static/images/soil.png">
              <span>土壤</span>
          </span>
          <span class="data2">{{cardData.environment.soil}}</span>
        </div>
        <div class="list2">
          <span class="item2">
              <img src="../../../../static/images/water.png">
              <span>水分</span>
          </span>
          <span class="data2">{{cardData.environment.water}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: Object
  },
  data() {
    return {
      month: "",
      date: ""
    };
  },
  methods: {},
  computed: {},
  created() {}
};
</script>



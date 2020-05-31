<style scoped>
.card0 {
  max-height: 70vh;
  overflow-y: auto;
}
.card0 .month {
  height: 1.5em;
  line-height: 1.5em;
  font-size: 25px;
}
.card0 .date {
  height: 1.5em;
  line-height: 1.5em;
  font-size: 20px;
  font-weight: bold;
}
.card0 .img {
  height: 10em;
  width: 100%;
  border-radius: 0.5em;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.card0 .name {
  height: 2.5em;
  line-height: 3em;
  font-size: 20px;
  letter-spacing: 0.1em;
  font-weight: bold;
}
.card0 .meaning {  
  line-height: 1.2em;
  font-size: 16px;
  text-indent: 2em;
  text-align: justify;
}
</style>

<template>
  <div class="card0">
    <div class="month">{{month}}</div>
    <div class="date">
      <span class="num">{{date}}</span>
      <span style="font-size: 16px;font-weight: normal;">th</span>
    </div>
    <div class="img" :style="{'background-image': imgUrl}"></div>
    <div class="name">{{cardData.name}}</div>
    <div class="meaning">{{cardData.meaning}}</div>
    <!-- <div class="introduce">
      <span class="item">简介</span>
      <span class="data">{{cardData.description}}</span>
    </div> -->
    <!-- <div class="meaning">
      <span class="item">花语</span>
      <span class="data">{{cardData.meaning}}</span>
    </div> -->
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
  },
  computed: {
    imgUrl() {
       // return "url(https://wx2.sbimg.cn/2020/05/20/5b8fcb7998638_140_120.jpg)";
      if (this.cardData && this.cardData.src) {
        return `url(${this.cardData.src})`;
      } else {
        return "url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=38660309,594947755&fm=11&gp=0.jpg)";
      }
    }
  },
  created() {
    let now = new Date();
    this.date = now.getDate();
    this.month = this.getMonth(now.getMonth() + 1);
  }
};
</script>



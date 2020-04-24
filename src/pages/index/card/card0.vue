<style scoped>
.card0 .month {
  height: 6vh;
  line-height: 6vh;
  font-size: 4vh;
}
.card0 .date {
  height: 7vh;
  line-height: 7vh;
  font-size: 5.5vh;
  font-weight: bold;
}
.card0 .img {
  height: 26vh;
  border-radius: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.card0 .name {
  height: 7vh;
  line-height: 7vh;
  font-size: 4vh;
}
.card0 .introduce {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
}
.card0 .meaning {
  display: flex;
  align-items: flex-start;
  margin-top: 0.5em;
  font-size: 14px;
}
.card0 div .item {
  display: block;
  width: 20%;
  font-weight: bold;
  text-align: center;
}
.card0 div .data {
  display: block;
  width: 80%;
  overflow-y: auto;
}
.card0 .introduce .data {
  max-height: 15vh;
}
.card0 .meaning .data {
  max-height: 8vh;
}
</style>

<template>
  <div class=" card0">
    <div class="month">{{month}}</div>
    <div class="date">
      <span class="num">{{date}}</span>
      <span style="font-size: 16px;font-weight: normal;">th</span>
    </div>
    <div v-if='cardData' class="img" :style="{'background-image': 'url('+cardData.src+')'}">
    </div>
    <div class="name">{{cardData.name}}</div>
    <div class="introduce">
      <span class="item">简介</span>
      <span class="data">{{cardData.description}}</span>
    </div>
    <div class="meaning">
      <span class="item">花语</span>
      <span class="data">{{cardData.meaning}}</span>
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
  computed: {},
  created() {
    let now = new Date();
    this.date = now.getDate();
    this.month = this.getMonth(now.getMonth() + 1);
  }
};
</script>



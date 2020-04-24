<style scoped>
.day {
  width: 100%;
}
.title {
  width: 90%;
  font-size: 25px;
  font-weight: 500;
  margin: 5% auto;
  text-align: left;
}
</style>

<template>
  <div class="day">
    <h1 class="title">一日一花</h1>
    <card :cardList='cardList'></card>
  </div>
</template>

<script>
import card from "./card/card.vue";

export default {
  data() {
    return {
      cardList: [
        {
          name: '1'
        },
        {
          name: '2'
        },
        {
          name: '3'
        }
      ]
    };
  },

  components: {
    card
  },

  methods: {}
};

</script>




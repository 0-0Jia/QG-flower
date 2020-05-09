<style scoped>
.card2 .technique {
  
}
.card2 .technique .item {
  display: block;
  font-weight: bold;
  text-align: left;
  font-size: 16px;
  line-height: 5vh;
}
.card2 .technique .data {
  display: block;
  padding: 0 1em;
  max-height: 65vh;
  overflow-y: auto;
  color: #666;
  font-size: 15px;
  line-height: 1.5em;
  text-indent: 2em;
}
</style>


<template>
  <div class="card2">
    <div class="technique">
      <span class="item">栽培技术:</span>
      <span class="data">{{cardData.technique}}</span>
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
  },
  computed: {},
  created() {
  }
};
</script>



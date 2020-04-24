<style scoped>
.card2 .technique {
  
}
.card2 .technique .item {
  display: block;
  font-weight: bold;
  text-align: left;
  font-size: 16px;
  line-height: 2em;
}
.card2 .technique .data {
  display: block;
  max-height: 60vh;
  overflow-y: auto;
  color: #666;
  font-size: 14px;
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



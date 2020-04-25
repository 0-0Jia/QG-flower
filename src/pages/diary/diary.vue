<style scoped>
.diary {
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
  <div class="diary">
    <h1 class="title">种花日记</h1>
    <div @click="increment">{{count}}</div>
  </div>
</template>

<script>
import store from "./store";
export default {
  data() {
    return {};
  },
  computed: {
    count() {
      return store.state.count;
    }
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    }
  },
  created(){
    // setInterval(()=>{
    //   this.increment();
    // }, 1000)
  }
};
</script>

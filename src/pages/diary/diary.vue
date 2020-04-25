<style scoped>
.diary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f6faff;
  overflow-y: auto;
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
}
.title .add {
  position: absolute;
  right: 1.5em;
  bottom: 0.5em;
  color: #2CD18A;
  font-size: 18px;
  text-indent: 0;
}
.con {
  margin-top: 60px;
  height: 1000px;
}
</style>

<template>
  <div class="diary">
    <h1 class="title">
      <span>种花日记</span>
      <div class="add" @click="toDetail">写日记</div>
    </h1>
    <div class="con">
      <div class="no-data">
        <span>快来写下你的第一篇日记吧！</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./store";
export default {
  data() {
    return {
      diaryData: null
    };
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
    },
    toDetail() {
      mpvue.navigateTo({ url: "../diary/diaryDetail/main" });
    }
  },
  created(){
    // setInterval(()=>{
    //   this.increment();
    // }, 1000)
  }
};
</script>

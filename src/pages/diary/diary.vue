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
  color: #2cd18a;
  font-size: 18px;
  text-indent: 0;
}
.con {
  margin-top: 60px;
}
.no-data span {
  display: block;
  height: 4em;
  color: #888;
  text-align: center;
  line-height: 4em;
}
.no-data img {
  display: block;
  margin: 0 auto;
  height: 60vh;
  width: 40vh;
}
.data {

}
</style>

<template>
  <div class="diary">
    <h1 class="title">
      <span>种花日记</span>
      <div class="add" @click="toAdd">写日记</div>
    </h1>
    <div class="con">
      <div v-show="!diaryData" class="no-data">
        <span>快来写下你的第一篇日记吧！</span>
        <img src="../../../static/images/diary_bg.png" />
      </div>
      <div v-show="diaryData" class="data">
        <diaryList v-for="(item, index) in diaryData" :key='index' :diaryList="item"></diaryList>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./store";
import diaryList from './diaryList/diaryList.vue';

export default {
  data() {
    return {
      diaryData: null
    };
  },
  components: {
    diaryList
  },
  computed: {
    // count() {
    //   return store.state.count;
    // }
  },
  methods: {
    // increment() {
    //   store.commit("increment");
    // },
    // decrement() {
    //   store.commit("decrement");
    // },
    toAdd() {
      store.commit("add");
      store.commit("changeDate", null);
      mpvue.navigateTo({ url: "../diary/diaryDetail/main" });
    },
    
    test() {
      let url =
        "http://img5.imgtn.bdimg.com/it/u=3905026749,806656350&fm=26&gp=0.jpg";
      this.diaryData = [
        {
          date: "2020/2/2 22:11:22",
          dataArr: [
            {
              diaryId: 0,
              time: "2020/2/2 22:11:22",
              content: "这是一篇日记1",
              images: [url, url]
            },
          ]
        },
        {
          date: "2020/2/5 22:11:22",
          dataArr: [
            {
              diaryId: 0,
              time: "2020/2/2 22:11:22",
              content: "这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1",
              images: [url, url, url]
            },
            {
              diaryId: 1,
              time: "2020/2/2 22:11:22",
              content: "这是一篇日记2",
              images: [url, url, url]
            },
          ]
        },
        {
          date: "2020/2/5 22:11:22",
          dataArr: [
            {
              diaryId: 0,
              time: "2020/2/2 22:11:22",
              content: "这是一篇日记1",
              images: [url, url, url]
            },
            {
              diaryId: 1,
              time: "2020/2/2 22:11:22",
              content: "这是一篇日记2",
              images: [url, url, url]
            },
          ]
        }
      ];
    }
  },
  created() {
    // setInterval(()=>{
    //   this.increment();
    // }, 1000)
    this.test();
  }
};
</script>

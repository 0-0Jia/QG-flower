<style scoped>
.diary {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f6faff;
  overflow-y: hidden;
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
.noMore {
  text-align: center;
  font-size: 14px;
  color: #999;
  line-height: 2em;
}
</style>

<template>
  <scroll-view  class="diary" scroll-y='ture' @scrolltolower="scrollFun">
    <h1 class="title">
      <span>种花日记</span>
      <div class="add" @click="toAdd">写日记</div>
    </h1>
    <div class="con">
      <div v-if="!diaryData || diaryData.length==0" class="no-data">
        <span>快来写下你的第一篇日记吧！</span>
        <img src="../../../static/images/diary_bg.png" />
      </div>
      <div v-else class="data">
        <diaryList v-for="(item, index) in diaryData" :key="index" :diaryList="item"></diaryList>
      </div>
    </div>
    <div class="noMore" v-show="noMore">已经到底部了</div>
  </scroll-view >
</template>

<script>
import store from "./store";
import diaryList from "./diaryList/diaryList.vue";
import httpRequest from "../../utils/httpRequest.js";

export default {
  data() {
    return {
      userId: null,
      diaryData: [],
      page: 1,
      pageSize: 10,
      noMore: false
    };
  },
  components: {
    diaryList
  },
  computed: {
  },
  methods: {
    scrollFun() {
      console.log('滚到底部');
      if(this.noMore) {
        return;
      }
      this.page ++ ;
      this.getDiaryList();
    },
    toAdd() {
      store.commit("changeData", null);
      mpvue.navigateTo({ url: "../diary/addDiary/main" });
    },
    getTestData() {
      let url =
        "http://img5.imgtn.bdimg.com/it/u=3905026749,806656350&fm=26&gp=0.jpg";
      this.diaryData = [
        {
          date: "2020/2/2 22:11:22",
          dataArr: [
            {
              diaryId: 0,
              time: "2020/2/2 12:11:22",
              content: "这是一篇日记1",
              images: [url, url]
            }
          ]
        },
        {
          date: "2020/2/5 22:11:22",
          dataArr: [
            {
              diaryId: 0,
              time: "2020/2/2 12:04:22",
              content:
                "这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1这是一篇日记1",
              images: [url, url, url]
            },
            {
              diaryId: 1,
              time: "2020/2/2 22:11:22",
              content: "这是一篇日记2",
              images: [url, url, url]
            }
          ]
        },
        {
          date: "2020/2/5 00:00:00",
          dataArr: [
            {
              diaryId: 0,
              time: "2020/2/5 01:11:22",
              content: "这是一篇日记1",
              images: [url, url, url]
            },
            {
              diaryId: 1,
              time: "2020/2/5 12:12:22",
              content: "这是一篇日记2",
              images: [url, url, url]
            }
          ]
        }
      ];
    },
    getDiaryList() {
      let send = {
        url: "/diary",
        data: {
          page: this.page,
          pageSize: this.pageSize,
          userId: 1 // 测试用户
        }
      };
      httpRequest.get(send).then(res => {
        this.getTestData();
        this.noMore = true;
        return;
        if (res.code == 1) {
          if (!res.data.records || res.data.records.length==0) {
            this.noMore = true;
          } else {
            console.log(this.diaryData)
            this.diaryData = this.diaryData.concat(res.data.records);
            console.log(this.diaryData)
          }
        }
      });
    },
  },
  mounted() {
    this.getDiaryList();
  },
  onShow() {
  }
};
</script>

<style scoped>
.re-detail {
  width: 100%;
  padding: 1px 0;
  background-color: #f6faff;
}
.title {
  width: 90%;
  font-size: 25px;
  font-weight: 500;
  margin: 5% auto;
  text-align: left;
}

.main {
  width: 100%;
  height: 100%;
}
.view {
  display: inline-block !important;
  position: relative;
  vertical-align: top;
  width: 50%;
}
.content {
  padding: 2px 8px;
  background-color: white;
  box-shadow: 0 0 5px silver;
  border-radius: 4px;
}

.image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.flower-name {
  font-size: 16px;
  margin: 6px auto;
  margin-top: 8px;
  text-align: center;
}

.flower-meaning {
  font-size: 14px;
  margin: 5px auto;
  text-align: left;
}
</style>

<template>
  <div class="re-detail">
    <h1 class="title">推荐详情</h1>
    <div style="display: none">
      <img
        v-for="(item, index) in dataList"
        :key="item"
        :src="item.src"
        @load="loadImage"
        :data-index="index"
        alt=""
      >
    </div>
    <scroll-view
      class="main"
      scroll-y="true"
      :style="{height:windowHeight+'px'}"
      @scrolltolower="loadMoreImages"
    >
      <div class="view">
        <div
          class="content"
          v-for="(item, index) in firstList"
          :key="index"
          :style="{ width: imgWidth+'px', height:(item.height + 64)+'px', marginTop: imgMargin+'px',marginLeft:imgMargin + 'px'}"
        >
          <div class="flower-name">{{item.name}}</div>
          <div class="img-content" :style="{height:item.height + 'px'}">
            <img
              :src="item.src"
              class="image"
              :data-index="index"
              data-type="1"
              @click="previewImg"
              alt=""
            >
          </div>
          <div class="flower-meaning">{{item.meaning}}</div>
        </div>
      </div>
      <div class="view">
        <div
          class="content"
          v-for="(item, index) in secondList"
          :style="{marginLeft:(imgMargin/2)+'px', width: imgWidth+'px', height:(item.height + 64)+'px',marginTop: imgMargin+'px'}"
          :key="index"
        >
          <div class="flower-name">{{item.name}}</div>
          <div class="img-content" :style="{height:item.height+'px'}">
            <img
              :src="item.src"
              class="image"
              :data-index="index"
              data-type="2"
              @click="previewImg"
              alt=""
            >
          </div>
          <div class="flower-meaning">{{item.meaning}}</div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: "flow",
  data() {
    return {
      dataList: [], // 数据源
      firstList: [], // 第一列数组
      secondList: [], // 第二列数组
      windowWidth: 0, // 页面视图宽度
      windowHeight: 0, // 视图高度
      imgMargin: 26, // 图片边距: 单位px
      imgWidth: 0, // 图片宽度: 单位px
      topArr: [0, 0] // 存储每列的累积top
    };
  },
  methods: {
    // 加载图片
    loadImage: function(e) {
      let index = e.currentTarget.dataset.index; // 图片所在索引
      let imgW = e.mp.detail.width;
      let imgH = e.mp.detail.height; // 图片实际宽度和高度
      let imgWidth = this.imgWidth; // 图片宽度
      let imgScaleH = imgWidth / imgW * imgH; // 计算图片应该显示的高度
      let dataList = this.dataList;
      let margin = this.imgMargin; // 图片间距

      // 第一列的累积top，和第二列的累积top
      let firstColH = this.topArr[0];
      let secondColH = this.topArr[1];
      let firstList = this.firstList;
      let secondList = this.secondList;
      let obj = dataList[index];

      obj.height = imgScaleH;

      if (firstColH <= secondColH) {
        // 表示新图片应该放到第一列
        firstColH += margin + obj.height;
        firstList.push(obj);
      } else {
        // 放到第二列
        secondColH += margin + obj.height;
        secondList.push(obj);
      }
      this.dataList = dataList;
      this.firstList = firstList;
      this.secondList = secondList;
      this.topArr = [firstColH, secondColH];
    },
    // 加载更多图片
    loadMoreImages: function() {
      let index;
      let imgs = [
        {
          src: require("../../../../static/images/flower1.png"),
          name: "花花1",
          meaning: "花语1"
        },
        {
          src: require("../../../../static/images/flower2.png"),
          name: "花花2",
          meaning: "花语2"
        },
        {
          src: require("../../../../static/images/flower3.png"),
          name: "花花3",
          meaning: "花语3"
        },
        {
          src: require("../../../../static/images/flower4.png"),
          name: "花花4",
          meaning: "花语4"
        },
        {
          src: require("../../../../static/images/flower5.png"),
          name: "花花5",
          meaning: "花语5"
        }
      ];

      // for (let i = 0; i < 1; i++) {
      //   let randomNum = Math.random() * 100;
      //   index = parseInt(randomNum) % imgs.length;
      //   imgs[index].height = 0;
      //   imgs.splice(index, 1);
      // }
      this.dataList = imgs;
      wx.hideLoading();
    }

    /** 预览图片 图片需使用外部链接*/
    // previewImg: function(e) {
    //   let index = e.currentTarget.dataset.index;
    //   let currentSrc = "";
    //   switch (e.currentTarget.dataset.type) {
    //     case "1":
    //       currentSrc = this.firstList[index].src;

    //       break;
    //     case "2":
    //       currentSrc = this.secondList[index].src;
    //   }
    //   wx.previewImage({
    //     urls: [currentSrc]
    //   });
    // }
  },
  onLoad() {
    wx.showLoading({
      title: "加载中..."
    });
    let that = this;
    // 获取页面宽高度
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        let windowWidth = res.windowWidth;
        let imgMargin = that.imgMargin;
        // 两列，每列的图片宽度
        let imgWidth = (windowWidth - imgMargin * 3 - 12) / 2;
        that.windowWidth = windowWidth;
        that.windowHeight = res.windowHeight;
        that.imgWidth = imgWidth;
        that.loadMoreImages(); // 初始化数据
      }
    });
  }
};

</script>


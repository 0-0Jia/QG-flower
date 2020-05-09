<style scoped>
.recommend {
  width: 100%;
  padding: 1px 0;
  background-color: #f6faff;
}
.title {
  width: 90%;
  font-size: 25px;
  font-weight: 500;
  margin: 0.5em auto;
  margin-bottom: 1%;
  text-align: left;
}

/*瀑布流*/
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
  position: relative;
  box-shadow: 0 0 5px silver;
  border-radius: 5px;
}
/*图片*/
.image {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
/*遮罩层*/
.mask {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(41, 41, 41, 0.3);
  border-radius: 5px;
  color: white;
  text-align: center;
  z-index: 10;
}
.rec-desc {
  position: absolute;
  width: 90%;
  left: 5%;
  bottom: 9%;
  line-height: 20px;
  text-align: center;
}
.option {
  font-size: 16px;
}
.eng-desc {
  font-size: 12px;
  font-weight: 300;
}
</style>

<template>
  <div class="recommend">
    <h1 class="title">送花推荐</h1>
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
          :style="{ width: imgWidth+'px', height:(item.height)+'px', marginTop: imgMargin+'px',marginLeft:imgMargin + 'px'}"
          @click="toDetail(item.option)"
        >
          <div class="img-content" :style="{height:item.height + 'px'}">
            <img :src="item.src" class="image" :data-index="index" data-type="1" alt="">
          </div>
          <div class="mask" :style="{ width: imgWidth+'px', height:(item.height)+'px'}">
            <div class="rec-desc">
              <p class="option">{{item.option}}</p>
              <p class="eng-desc">{{item.engDesc}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="view">
        <div
          class="content"
          v-for="(item, index) in secondList"
          :style="{marginLeft:(imgMargin/2)+'px', width: imgWidth+'px', height:(item.height)+'px',marginTop: imgMargin+'px'}"
          :key="index"
          @click="toDetail(item.option)"
        >
          <div class="img-content" :style="{height:item.height+'px'}">
            <img :src="item.src" class="image" :data-index="index" data-type="2" alt="">
          </div>
          <div class="mask" :style="{ width: imgWidth+'px', height:(item.height)+'px'}">
            <div class="rec-desc">
              <p class="option">{{item.option}}</p>
              <p class="eng-desc">{{item.engDesc}}</p>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      dataList: [], // 数据源
      firstList: [], // 第一列数组
      secondList: [], // 第二列数组
      windowWidth: 0, // 页面视图宽度
      windowHeight: 0, // 视图高度
      imgMargin: 16, // 图片边距: 单位px
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
          src: "https://s1.ax1x.com/2020/05/09/YlJBB4.png",
          option: "友情鲜花",
          engDesc: "for your friends"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJdjU.png",
          option: "爱情鲜花",
          engDesc: "for your love"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJU3V.png",
          option: "道歉鲜花",
          engDesc: "for apology"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJ0uF.png",
          option: "哀思鲜花",
          engDesc: "show your grief"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJacT.png",
          option: "感谢老师",
          engDesc: "appreciate teacher"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJDHJ.png",
          option: "婚庆鲜花",
          engDesc: "for wedding"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJyNR.png",
          option: "生日鲜花",
          engDesc: "birthday presents"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJsE9.png",
          option: "问候长辈",
          engDesc: "for elder"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJ641.png",
          option: "探病慰问",
          engDesc: "hospital flower"
        },
        {
          src: "https://s1.ax1x.com/2020/05/09/YlJg9x.png",
          option: "祝福庆贺",
          engDesc: "for celebration"
        }
      ];
      this.dataList = imgs;
      wx.hideLoading();
    },
    // 进入详情页面
    toDetail(type) {
      mpvue.navigateTo({ url: "../recommend/reDetail/main?type=" + type });
    },

    /**
     * 请求
     */
    request() {
      this.$wxhttp
        .post({
          url: "/xxx/xxx",
          data: data
        })
        .then(res => {
          console.log("成功数据:", res);
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    }
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
        let imgWidth = (windowWidth - imgMargin * 3) / 2;
        that.windowWidth = windowWidth;
        that.windowHeight = res.windowHeight;
        that.imgWidth = imgWidth;
        that.loadMoreImages(); // 初始化数据
      }
    });
  }
};
</script>


import store from '../store/index'
// 接口地址
// const host = 'http://39.98.41.126:10021/flower/api/v1/'
const host = 'https://qgflower.qgailab.com:10021/flower/api/v1/'


// 获取token
function getAccessToken() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        // 获取code
        console.log('wx.login成功,获取code：' + res.code)
        if (res.code) {
          wx.request({
            // 将code发给后端
            url: host + 'user/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: (response) => {
              // 获取token
              // console.log('成功获取token',response.header.Authorization)
              let Authorization = response.header.Authorization 
              // 写入token
              wx.setStorageSync('Authorization', Authorization)
              resolve(Authorization)
            },
          })
        } else {
          reject(res.errMsg)
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
}
// wx请求
function request(url, method, data, Authorization) {
  // wx.showLoading({
  //   title: '加载中' // 数据请求前loading
  // });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header:
      {
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      success: function (res) {
        // wx.hideLoading();
        if (res.data.code == 1) {
          // 将res转发到sendReq的回调函数
          resolve(res.data);
        } else if (res.data.code == 3001) {
          // token过期
          reject('expire')
        }
      },
      fail: function (res) {
        //wx.hideLoading()
      },
      complete: function () {
       // wx.hideLoading()
      }
    })
  })
}
// token校验+发送请求
function sendReq(url, method, data) {
  return new Promise((resolve, reject) => {
    if (!wx.getStorageSync("Authorization")) {
      // 没有token时，获取token-->发起请求-->请求返回值传入回调
      getAccessToken().then((Authorization) => {
        request(url, method, data, Authorization).then((data) => {
          resolve(data);
        })
      })
    } else {
      // 有token时，发起请求-->请求返回值传入回调
      let Authorization = wx.getStorageSync("Authorization");
      request(url, method, data, Authorization)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          if (err == 'expire') {  // token过期，清除token，重新请求
            wx.removeStorageSync('Authorization');
            getAccessToken().then((Authorization) => {
              request(url, method, data, Authorization).then((data) => {
                resolve(data);
              })
            })
          }
        })
    }
  })
}

function get(obj) {
  return sendReq(obj.url, 'GET', obj.data);
}

function post(obj) {
  return sendReq(obj.url, 'POST', obj.data)
}

function put(obj) {
  return sendReq(obj.url, 'PUT', obj.data)
}

function Delete(obj) {
  return sendReq(obj.url, 'DELETE', obj.data)
}

export default {
  request,
  get,
  post,
  put,
  host,
  Delete
}
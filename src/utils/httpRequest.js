// 接口地址
const host = 'http://39.98.41.126:10021/flower/api/v1/' 
 
function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  });
  return new Promise((resolve, reject) => {
    let cookie = wx.getStorageSync("sessionid").split(";")[0];
    
    wx.request({
      url: host + url, 
      method: method,
      data: data,
      header: 
      // url
      //  === '/customer/login' // 通过传进来的url判断是否是登陆页
      // ?{
      //   'content-type': 'application/json',
      // } 
      // :{
      //   'content-type': 'application/json',
      //   'cookie': cookie
      // },
      {
        'content-type': 'application/json', // 默认值
        'cookie': cookie
      },
      success: function (res) {
        wx.hideLoading()
          resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
 
function get (obj) {
  return request(obj.url, 'GET', obj.data)
}
 
function post (obj) {
  return request(obj.url, 'POST', obj.data)
}

function Delete (obj) {
  return request(obj.url, 'DELETE', obj.data)
}

export default {
  request,
  get,
  post,
  host,
  Delete
}
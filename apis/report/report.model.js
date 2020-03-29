var mongoose = require("bluebird").promisifyAll(require("mongoose"));

var ReportSchema = new mongoose.Schema(
  {
    appId: String, //应用平台唯一标识
    clientId: String, //客户本地标识ID
    version: String, //SDK版本
    deviceData: {
      //客户端设备信息
      SDKVersion: String, //基础库版本
      brand: String, //设备品牌
      fontSizeSetting: String, //设备字体大小
      language: String, //语言
      model: String, //设备型号
      network: String, //当前网络环境
      pixelRatio: String, //设备像素密度
      platform: String, //设备平台
      screenHeight: String, //屏幕高度
      screenWidth: String, //屏幕宽度
      windowHeight: String, //视口高度
      windowWidth: String, //视口宽度
      osVersion: String, //系统版本
      wxVersion: String //微信版本
    }, //客户端信息信息(wx.getSystemInfoAsync)
    data: Object, //上报信息
    messageId: String, //消息标识ID
    typeId: String, //消息类型标识ID
    currentRoute: {
      //上传提交页面信息(接口上报)
      route: String, //页面路径
      query: Object //页面参数
    },
    refererRoute: {
      //提交页面信息(添加到数组)
      route: String, //页面路径
      query: Object //页面参数
    },
    customerData: {
      type: String, //自定义事件类型标识ID,
      data: Object //自定义事件数据
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);
module.exports = mongoose.model("Report", ReportSchema);

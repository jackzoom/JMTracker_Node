const Report = require("./report.model");
let controller = {};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log("handleError:");
    res.status(statusCode).send(err);
  };
}

function responseResult(res, data, statusCode) {
  statusCode = statusCode || 200;
  res.status(statusCode).json({
    data: data,
    code: 0
  });
}

controller.push = function(req, res) {
  Report.createAsync(req.body)
    .then(function() {
      res.status(200).end();
    })
    .catch(handleError(res));
};

controller.insert = function(req, res) {
  //Mock一条数据
  const Mock = new Report({
    appId: "mock-appid", //应用平台唯一标识
    clientId: "ffff01711a920a57118258442e71430b", //客户本地标识ID
    version: "v1.0.0-beta", //SDK版本
    deviceData: {
      //客户端设备信息
      SDKVersion: "2.4.0", //基础库版本
      brand: "devtools", //设备品牌
      fontSizeSetting: 16, //设备字体大小
      language: "zh_CN", //语言
      model: "iPhone 6/7/8 Plus", //设备型号
      network: 2, //当前网络环境
      pixelRatio: 3, //设备像素密度
      platform: "devtools", //设备平台
      screenHeight: 736, //屏幕高度
      screenWidth: 414, //屏幕宽度
      windowHeight: 624, //视口高度
      windowWidth: 414, //视口宽度
      osVersion: "iOS 10.0.1", //系统版本
      wxVersion: "7.0.4" //微信版本
    }, //客户端信息信息(wx.getSystemInfoAsync)
    data: {}, //上报信息
    messageId: "ffff01712622f057ff82c2ec237dd642", //消息标识ID
    typeId: 100001, //消息类型标识ID
    currentRoute: {
      //当前页面路由
      route: "pages/index", //页面路径
      query: {} //页面参数
    },
    refererRoute: {
      //前一个页面路由
      route: "", //页面路径
      query: {} //页面参数
    }
  });
  Mock.saveAsync()
    .then(result => {
      res.status(200).end();
    })
    .catch(handleError(res));
};

controller.get = function(req, res) {
  // var page = req.query.page || 1;
  // var count = req.query.count || 5;
  // var skip = (page - 1) * count;
  let query = req.query,
    pageNum = query["pageNum"] || 0,
    pageSize = query["pageSize"] || 20;
  let skip = pageNum * pageSize,
    count = pageSize;
  let findObj = {},
    findVal = req.query["filterVal"] || { $exists: true };
  req.query.filterStr && (findObj[req.query.filterStr] = findVal);
  console.log("查询条件：", req.query, findObj);
  Report.findAsync(findObj, null, {
    skip: parseInt(skip),
    limit: parseInt(count)
  })
    .then(result => {
      let data = result.map(item => ({
        detail: item,
        id: item._id
      }));
      //   console.log("分页数据：", data);
      responseResult(res, data);
    })
    .catch(handleError(res));
};

module.exports = controller;

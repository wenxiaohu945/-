Page({

  data: {

  nav:'',

  cid:'',

  list:'',

  network:''

  },



  linkDetail:function(e){

    //console.log(e)

    wx.navigateTo({

      url:'/pages/detail/detail?iid='+e.currentTarget.dataset.iid

    })

  },



  loadColumn:function(e){

    //console.log(e)

    var that=this

    that.setData({

      cid:e.currentTarget.dataset.id,

      list:''

    })

    wx.request({

      url: 'https://ttc.botbrain.ai/v3/data/feed',

      data: {

        appid: 'RVCQS9UR56',

        columnid: that.data.cid,

        uid: wx.getStorageSync('openid'),

        sid: Date.parse(new Date()) / 1000,

        ct: 20,

        platform: 'wechatMini'

      },

      success: function (e) {

        console.log(e)

        that.setData({

          list: e.data.data

        })

      }

    })

  },



  onReachBottom: function(e){

    var that=this

    wx.request({

      url: 'https://ttc.botbrain.ai/v3/data/feed',

      data: {

        appid: 'RVCQS9UR56',

        columnid: that.data.cid,

        uid: wx.getStorageSync('openid'),

        sid: Date.parse(new Date()) / 1000,

        ct: 20,

        platform: 'wechatMini'

      },

      success: function(e){

        //console.log(e)

        that.setData({

          list: that.data.list.concat(e.data.data)

        })

      }

    })



  },



  onLoad: function (options) {

    var that=this

    wx.getNetworkType({

      success: function(res) {

        //console.log(res)

        that.setData({

          network: res.networkType

        })

      },

    })

  wx.request({

    url: 'https://ttc.botbrain.ai/v3/config/RVCQS9UR56',//接口

    data:{

      appid: 'RVCQS9UR56',//开发者的APP ID

      securekey:'KMHFMCCMN224H3929Z325V',//开发者自己的程序密钥

      platform: 'wechatMini',

      network: that.data.network

    },

    success: function(e){

      //console.log(e)

      that.setData({

        nav:e.data.data.columns,

        cid:e.data.data.columns[0].id

      })

    }

  })

  //获取用户的openid

  wx.login({

    success:function(e){

      //console.log(e)

      wx.request({

        url:'https://open.emstail.com/v5/getOpenid',

        data:{

          appid:'wxe4fac813a0d128d3',

          secret:'fe9f5049b65ac70d7f91f84d79c22585',

          code: e.code

        },

        success:function(res){

          //console.log(res)

          wx.setStorageSync('openid',res.data.openid)



          wx.request({

            url:'https://ttc.botbrain.ai/v3/data/feed',

            data:{

              appid:'RVCQS9UR56',

              columnid: that.data.cid,

              uid: wx.getStorageSync('openid'),

              sid:Date.parse(new Date())/1000,

              ct: 50,

              platform:'wechatMini'

            },

            success:function(e){

              //console.log(e)

              that.setData({

                list:e.data.data

              })

            }

          })

        }

      })

    }

  })

  },

})

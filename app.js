App({
  onLaunch: function () {
    // Initialize cloud environment
    if (!wx.cloud) {
      console.error('Please use WeChat version 2.2.3 or above to use cloud capabilities')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // Check if user is logged in
    const user = wx.getStorageSync('user') || null
    if (user) {
      this.globalData.user = user
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },

  globalData: {
    user: null
  }
})

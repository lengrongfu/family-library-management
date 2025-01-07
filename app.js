App({
  onLaunch: function () {
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

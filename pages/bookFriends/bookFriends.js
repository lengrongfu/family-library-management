Page({
  data: {
    bookFriends: []
  },

  onLoad: function () {
    this.loadBookFriends();
  },

  loadBookFriends: function () {
    const bookFriends = wx.getStorageSync('bookFriends') || [];
    this.setData({ bookFriends });
  },

  navigateToAddBookFriend: function () {
    wx.navigateTo({
      url: '/pages/addBookFriend/addBookFriend'
    });
  }
});

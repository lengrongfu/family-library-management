Page({
  data: {
    books: []
  },

  onLoad: function () {
    this.loadBooks();
  },

  loadBooks: function () {
    const books = wx.getStorageSync('books') || [];
    this.setData({ books });
  },

  navigateToAddBook: function () {
    wx.navigateTo({
      url: '/pages/addBook/addBook'
    });
  },

  navigateToSearchBook: function () {
    wx.navigateTo({
      url: '/pages/searchBook/searchBook'
    });
  },

  navigateToBookDetails: function (event) {
    const bookIsbn = event.currentTarget.dataset.bookIsbn;
    wx.navigateTo({
      url: `/pages/bookDetails/bookDetails?bookId=${bookIsbn}`
    });
  }
});

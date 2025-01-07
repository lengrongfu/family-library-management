Page({
  data: {
    isbn: '',
    bookInfo: null,
    price: ''
  },

  // Function to handle input changes
  handleInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  // Function to scan ISBN
  scanISBN() {
    wx.scanCode({
      success: (res) => {
        this.setData({
          isbn: res.result
        });
        this.fetchBookInfo(res.result);
      },
      fail: (err) => {
        wx.showToast({
          title: 'Failed to scan ISBN',
          icon: 'none'
        });
      }
    });
  },

  // Function to fetch book info from Douban API
  fetchBookInfo(isbn) {
    wx.request({
      url: `https://api.douban.com/v2/book/isbn/${isbn}`,
      method: 'GET',
      success: (res) => {
        this.setData({
          bookInfo: res.data
        });
      },
      fail: (err) => {
        wx.showToast({
          title: 'Failed to fetch book info',
          icon: 'none'
        });
      }
    });
  },

  // Function to add book to the library
  addBook() {
    const { isbn, bookInfo, price } = this.data;
    if (!isbn || !bookInfo || !price) {
      wx.showToast({
        title: 'Please complete all fields',
        icon: 'none'
      });
      return;
    }

    // Save book info to local database
    const db = wx.cloud.database();
    db.collection('books').add({
      data: {
        isbn,
        bookInfo,
        price
      },
      success: (res) => {
        wx.showToast({
          title: 'Book added successfully',
          icon: 'success'
        });
        this.setData({
          isbn: '',
          bookInfo: null,
          price: ''
        });
      },
      fail: (err) => {
        wx.showToast({
          title: 'Failed to add book',
          icon: 'none'
        });
      }
    });
  }
});

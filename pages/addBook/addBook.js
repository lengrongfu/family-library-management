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
    const apiKey = '0ac44ae016490db2204ce0a042db2916';
    wx.request({
      url: `https://api.douban.com/v2/book/isbn/${isbn}?apiKey=${apiKey}`,
      method: 'GET',
      success: (res) => {
        const { title, author, publisher } = res.data;
        this.setData({
          bookInfo: {
            title,
            author: author[0],
            publisher
          }
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

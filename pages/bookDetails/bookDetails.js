Page({
  data: {
    bookId: '',
    bookInfo: null,
    price: ''
  },

  onLoad(options) {
    const { bookId } = options;
    this.setData({
      bookId
    });
    this.fetchBookDetails(bookId);
  },

  // Function to fetch book details from local database
  fetchBookDetails(bookId) {
    const db = wx.cloud.database();
    db.collection('books').doc(bookId).get({
      success: (res) => {
        this.setData({
          bookInfo: res.data.bookInfo,
          price: res.data.price
        });
      },
      fail: (err) => {
        wx.showToast({
          title: 'Failed to fetch book details',
          icon: 'none'
        });
      }
    });
  },

  // Function to handle input changes
  handleInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  // Function to update book details
  updateBook() {
    const { bookId, bookInfo, price } = this.data;
    if (!bookInfo || !price) {
      wx.showToast({
        title: 'Please complete all fields',
        icon: 'none'
      });
      return;
    }

    const db = wx.cloud.database();
    db.collection('books').doc(bookId).update({
      data: {
        bookInfo,
        price
      },
      success: (res) => {
        wx.showToast({
          title: 'Book updated successfully',
          icon: 'success'
        });
      },
      fail: (err) => {
        wx.showToast({
          title: 'Failed to update book',
          icon: 'none'
        });
      }
    });
  },

  // Function to delete book
  deleteBook() {
    const { bookId } = this.data;
    const db = wx.cloud.database();
    db.collection('books').doc(bookId).remove({
      success: (res) => {
        wx.showToast({
          title: 'Book deleted successfully',
          icon: 'success'
        });
        wx.navigateBack();
      },
      fail: (err) => {
        wx.showToast({
          title: 'Failed to delete book',
          icon: 'none'
        });
      }
    });
  }
});

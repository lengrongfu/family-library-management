Page({
  data: {
    isbn: '',
    bookInfo: {
      title: '',
      author: '',
      publisher: ''
    },
    price: ''
  },

  // Function to handle input changes
  handleInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  // Function to add book to the library
  addBook() {
    const { isbn, bookInfo, price } = this.data;
    if (!isbn || !bookInfo.title || !bookInfo.author || !bookInfo.publisher || !price) {
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
          bookInfo: {
            title: '',
            author: '',
            publisher: ''
          },
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

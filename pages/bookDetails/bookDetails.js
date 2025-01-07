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
    const books = wx.getStorageSync('books') || [];
    const book = books.find(b => b.isbn === bookId);
    if (book) {
      this.setData({
        bookInfo: book.bookInfo,
        price: book.price
      });
    } else {
      wx.showToast({
        title: 'Failed to fetch book details',
        icon: 'none'
      });
    }
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

    let books = wx.getStorageSync('books') || [];
    const bookIndex = books.findIndex(b => b.isbn === bookId);
    if (bookIndex !== -1) {
      books[bookIndex] = { isbn: bookId, bookInfo, price };
      wx.setStorageSync('books', books);
      wx.showToast({
        title: 'Book updated successfully',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: 'Failed to update book',
        icon: 'none'
      });
    }
  },

  // Function to delete book
  deleteBook() {
    const { bookId } = this.data;
    let books = wx.getStorageSync('books') || [];
    const newBooks = books.filter(b => b.isbn !== bookId);
    wx.setStorageSync('books', newBooks);
    wx.showToast({
      title: 'Book deleted successfully',
      icon: 'success'
    });
    wx.navigateBack();
  }
});

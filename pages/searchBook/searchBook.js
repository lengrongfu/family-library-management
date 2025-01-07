Page({
  data: {
    searchQuery: '',
    searchResults: [],
    filter: 'all',
    sort: 'title'
  },

  // Function to handle input changes
  handleInputChange(e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  // Function to search books
  searchBooks() {
    const { searchQuery } = this.data;
    if (!searchQuery) {
      wx.showToast({
        title: 'Please enter a search query',
        icon: 'none'
      });
      return;
    }

    // Fetch books from local database
    const db = wx.cloud.database();
    db.collection('books').where({
      'bookInfo.title': db.RegExp({
        regexp: searchQuery,
        options: 'i'
      })
    }).get({
      success: (res) => {
        this.setData({
          searchResults: res.data
        });
      },
      fail: (err) => {
        wx.showToast({
          title: 'Failed to search books',
          icon: 'none'
        });
      }
    });
  },

  // Function to filter search results
  filterResults(e) {
    const { filter } = e.currentTarget.dataset;
    this.setData({
      filter
    });
    this.applyFiltersAndSort();
  },

  // Function to sort search results
  sortResults(e) {
    const { sort } = e.currentTarget.dataset;
    this.setData({
      sort
    });
    this.applyFiltersAndSort();
  },

  // Function to apply filters and sorting
  applyFiltersAndSort() {
    let { searchResults, filter, sort } = this.data;

    // Apply filter
    if (filter !== 'all') {
      searchResults = searchResults.filter(book => book.bookInfo.genre === filter);
    }

    // Apply sorting
    searchResults.sort((a, b) => {
      if (sort === 'title') {
        return a.bookInfo.title.localeCompare(b.bookInfo.title);
      } else if (sort === 'author') {
        return a.bookInfo.author.localeCompare(b.bookInfo.author);
      } else if (sort === 'price') {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });

    this.setData({
      searchResults
    });
  }
});

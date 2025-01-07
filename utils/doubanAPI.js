const API_BASE_URL = 'https://api.douban.com/v2/book';
const API_KEY = '0ac44ae016490db2204ce0a042db2916';

function fetchBookDetails(isbn) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}/isbn/${isbn}?apiKey=${API_KEY}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error('Failed to fetch book details'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

module.exports = {
  fetchBookDetails
};

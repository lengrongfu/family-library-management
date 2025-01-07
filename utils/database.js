const db = wx.cloud.database();

function addBook(book) {
  return db.collection('books').add({
    data: book
  });
}

function getBookById(bookId) {
  return db.collection('books').doc(bookId).get();
}

function updateBook(bookId, updatedBook) {
  return db.collection('books').doc(bookId).update({
    data: updatedBook
  });
}

function deleteBook(bookId) {
  return db.collection('books').doc(bookId).remove();
}

function searchBooks(query) {
  return db.collection('books').where({
    'bookInfo.title': db.RegExp({
      regexp: query,
      options: 'i'
    })
  }).get();
}

module.exports = {
  addBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks
};

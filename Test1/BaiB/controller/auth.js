export const checkError = (book, author) => {
  const error = { book: "", author: "" };

  if (!book ) {
    error.book = "Tên sách không hợp lệ";
  }
  if (!author) {
    error.author = "Tên tác giả không được bỏ trống";
  }
  if (error.book || error.author) {
    return {
      hasError: true,
      error: error,
    };
  }
  return {
    hasError: false,
  };
};



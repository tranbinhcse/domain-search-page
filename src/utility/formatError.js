export function formatError(errorArray) {
  const formattedErrorObject = {}
  // Tạo một mảng mới chứa các đối tượng được định dạng theo yêu cầu
  // Lặp qua mỗi mục trong mảng lỗi
  errorArray.forEach((item) => {
    const fieldName = item[2] // Tên trường
    const errorMessage = item[0] // Tin nhắn lỗi

    // Gán tin nhắn lỗi cho tên trường trong đối tượng đã tạo
    formattedErrorObject[fieldName] = errorMessage
  })

  return formattedErrorObject
}

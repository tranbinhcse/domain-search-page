// Hàm cắt tên miền và TLD từ domain
export const extractDomainParts = (domain) => {
  const parts = domain.split('.')
  const sld = parts.shift() // Lấy phần tử đầu tiên
  const tld = parts.join('.') // Ghép lại các phần tử còn lại

  return { sld, tld }
}

export const splitFullName = (fullname) => {
  // Tách chuỗi fullname thành các từ riêng biệt
  const words = fullname.split(' ')

  // Nếu chỉ có một từ, coi nó là firstname, lastname sẽ là chuỗi trống
  if (words.length === 1) {
    return {
      firstname: words[0],
      lastname: ''
    }
  }

  // Nếu có nhiều hơn một từ, lastname là từ cuối cùng
  const firstname = words.pop()
  const lastname = words.join(' ')

  return {
    firstname: firstname,
    lastname: lastname
  }
}

export const checkAge = (dateOfBirth) => {
  // Lấy ngày hiện tại
  const currentDate = new Date()
  const date23YearsAgo = new Date(dateOfBirth)

  // Ngày mà người đó tròn 18 tuổi
  const date18YearsAgo = new Date(dateOfBirth)
  date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() + 18)
  console.log(date18YearsAgo)
  // Ngày mà người đó tròn 23 tuổi

  date23YearsAgo.setFullYear(date23YearsAgo.getFullYear() + 23)
  console.log(date23YearsAgo)
  // Kiểm tra xem ngày hiện tại có nằm trong khoảng từ 18 đến 23 tuổi không
  return currentDate >= date18YearsAgo && currentDate < date23YearsAgo
}

export const isValidDomain = (domain) => {
  console.log(domain)
  // Biểu thức chính quy để kiểm tra tên miền
  var domainRegex = /^(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/

  // Kiểm tra xem chuỗi khớp với biểu thức chính quy hay không
  return domainRegex.test(domain)
}

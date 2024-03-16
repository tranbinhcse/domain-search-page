// Hàm cắt tên miền và TLD từ domain
export const extractDomainParts = (domain) => {
    const parts = domain.split('.');
    const sld = parts.shift(); // Lấy phần tử đầu tiên
    const tld = parts.join('.'); // Ghép lại các phần tử còn lại
  
    return { sld, tld };
  };
   
 
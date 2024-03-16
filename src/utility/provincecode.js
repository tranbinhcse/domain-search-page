 const provinceCode = [
    
      {
        "STT": 1,
        "name": "Hà Nội",
        "code": "001"
      },
      {
        "STT": 2,
        "name": "Hà Giang",
        "code": "002"
      },
      {
        "STT": 3,
        "name": "Cao Bằng",
        "code": "004"
      },
      {
        "STT": 4,
        "name": "Bắc Kạn",
        "code": "006"
      },
      {
        "STT": 5,
        "name": "Tuyên Quang",
        "code": "008"
      },
      {
        "STT": 6,
        "name": "Lào Cai",
        "code": "010"
      },
      {
        "STT": 7,
        "name": "Điện Biên",
        "code": "011"
      },
      {
        "STT": 8,
        "name": "Lai Châu",
        "code": "012"
      },
      {
        "STT": 9,
        "name": "Sơn La",
        "code": "014"
      },
      {
        "STT": 10,
        "name": "Yên Bái",
        "code": "015"
      },
      {
        "STT": 11,
        "name": "Hòa Bình",
        "code": "017"
      },
      {
        "STT": 12,
        "name": "Thái Nguyên",
        "code": "019"
      },
      {
        "STT": 13,
        "name": "Lạng Sơn",
        "code": "020"
      },
      {
        "STT": 14,
        "name": "Quảng Ninh",
        "code": "022"
      },
      {
        "STT": 15,
        "name": "Bắc Giang",
        "code": "024"
      },
      {
        "STT": 16,
        "name": "Phú Thọ",
        "code": "025"
      },
      {
        "STT": 17,
        "name": "Vĩnh Phúc",
        "code": "026"
      },
      {
        "STT": 18,
        "name": "Bắc Ninh",
        "code": "027"
      },
      {
        "STT": 19,
        "name": "Hải Dương",
        "code": "030"
      },
      {
        "STT": 20,
        "name": "Hải Phòng",
        "code": "031"
      },
      {
        "STT": 21,
        "name": "Hưng Yên",
        "code": "033"
      },
      {
        "STT": 22,
        "name": "Thái Bình",
        "code": "034"
      },
      {
        "STT": 23,
        "name": "Hà Nam",
        "code": "035"
      },
      {
        "STT": 24,
        "name": "Nam Định",
        "code": "036"
      },
      {
        "STT": 25,
        "name": "Ninh Bình",
        "code": "037"
      },
      {
        "STT": 26,
        "name": "Thanh Hóa",
        "code": "038"
      },
      {
        "STT": 27,
        "name": "Nghệ An",
        "code": "040"
      },
      {
        "STT": 28,
        "name": "Hà Tĩnh",
        "code": "042"
      },
      {
        "STT": 29,
        "name": "Quảng Bình",
        "code": "044"
      },
      {
        "STT": 30,
        "name": "Quảng Trị",
        "code": "045"
      },
      {
        "STT": 31,
        "name": "Thừa Thiên Huế",
        "code": "046"
      },
      {
        "STT": 32,
        "name": "Đà Nẵng",
        "code": "048"
      },
      {
        "STT": 33,
        "name": "Quảng Nam",
        "code": "049"
      },
      {
        "STT": 34,
        "name": "Quảng Ngãi",
        "code": "051"
      },
      {
        "STT": 35,
        "name": "Bình Định",
        "code": "052"
      },
      {
        "STT": 36,
        "name": "Phú Yên",
        "code": "054"
      },
      {
        "STT": 37,
        "name": "Khánh Hòa",
        "code": "056"
      }
]

const provinceCodeToObject = {};

provinceCode.forEach(province => {
    provinceCodeToObject[province.code] = province.name
});

export default provinceCodeToObject;
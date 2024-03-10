import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';


import DomainRepository from '@/repositories/DomainRepository'
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";

export const useDomainSearchStore = defineStore('domainSearchStore', () => {
  const tldsLoaded = ref(false)
  const searching = ref(false)
  const searchKey = ref('')
  const lastSearchKey = ref('')
  const domains = ref([]) 
  const topDomains = ref([])
  const tlds = ref([])

  const lastTldIndex = ref(0); // Chỉ số của TLD cuối cùng đã được xử lý

  const domainRegisterStore = useDomainRegisterStore()

  // const domainRegisterStore = useStore('domainRegisterStore');


  // Add a method to update the inCart property based on the name
  const updateInCart = (name, inCart) => {
    const domainIndex = domains.value.findIndex(domain => domain.domain === name);
    
    if (domainIndex !== -1) {
      domains.value[domainIndex].inCart = inCart;
    }
  };



async function searchDomains(loadMore = false) {
  if (!tldsLoaded.value) {
    await getDomainTlds();
  }

  if(searchKey.value == ''){
    return false;
  }
  // Kiểm tra xem từ khóa tìm kiếm có thay đổi không
  if (searchKey.value !== lastSearchKey.value) {
    domains.value = []; // Xoá danh sách cũ nếu từ khóa tìm kiếm mới
    lastTldIndex.value = 0;
    lastSearchKey.value = searchKey.value; // Cập nhật từ khóa tìm kiếm trước đó
  }
  

  if (!loadMore) {
    domains.value = []; // Xoá danh sách cũ nếu không phải là tải thêm
    lastTldIndex.value = 0;
  }

  searching.value = true;
  const currentSearchKey = searchKey.value;

  let searchName = currentSearchKey;
  let searchTld = '';

  // Kiểm tra xem searchKey có phải dạng name.tld không
  if (currentSearchKey.includes('.')) {
    const parts = currentSearchKey.split('.');
    searchName = parts[0];
    searchTld = '.' + parts.slice(1).join('.');
  }



  const matchedTldIndex = tlds.value.findIndex(tldObject => tldObject.tld === searchTld);

  if (matchedTldIndex !== -1) {
    // Đưa TLD tương ứng lên đầu danh sách
    const matchedTld = tlds.value.splice(matchedTldIndex, 1)[0];
    tlds.value.unshift(matchedTld);
  }



  const startIndex = loadMore ? lastTldIndex.value : 0; // Xác định chỉ số bắt đầu dựa trên việc tải thêm hay không
  const endIndex = startIndex + 10;
  const tldsToSearch = tlds.value.slice(startIndex, endIndex);

  lastTldIndex.value = endIndex; // Cập nhật chỉ số cho lần tải tiếp theo

   const lookupPromises = tldsToSearch.map((tldObject, index) => {
    const domain = createDomainObject(searchName, tldObject, tldObject.tld === searchTld);


    const cartItemsValue = domainRegisterStore.cartItems;
     
    const inCart = cartItemsValue?.some((cartDomain) => cartDomain.name === domain.sld + domain.tld);

    domain.inCart = inCart;

    return DomainRepository.lookup({
      name: domain.sld + domain.tld
    }).then(domainInfo => {

      if (domain.isFeatured || domainInfo.avaliable) {
        updateDomainInfo(domain, domainInfo);
        domains.value.push(domain); // Thêm TLD vào domains sau khi lookup thành công
      }


    }).catch(error => {
      console.error(`Error looking up ${domain.sld}${domain.tld}:`, error);
      const domainIndex = loadMore ? startIndex + index : index;
      domains.value[domainIndex].status = 'error';
      domains.value[domainIndex].error = error.message || 'Unknown error occurred';
    });
  });
  await Promise.allSettled(lookupPromises);

  lastTldIndex.value = endIndex; 

  searching.value = false;

  // Update topDomains based on the first 4 items in domains
  if (domains.value.length > 4) {
    topDomains.value = domains.value.slice(0, 4);
  } else {
    topDomains.value = domains.value;
  }

}

  function createDomainObject(sld, tldObject, isFeatured = false) {
    return {
      sld,
      tld: tldObject.tld,
      isFeatured,
      ...tldObject.periods[0], // Lấy thông tin từ periods
      premium: false,
      avaliable: false,
      transfer: false,
      inCart: false,
      status: 'inCheck',
      type: 'register',
      epp: tldObject.epp,
      options: tldObject.options,
      
      // Các trường khác từ tldObject nếu cần
    };
  }

  function updateDomainInfo(domain, domainInfo) {
 
    // Cập nhật thông tin domain dựa trên kết quả từ API lookup
    domain.premium = domainInfo?.premium;
    domain.avaliable = domainInfo.avaliable;
    domain.transfer = domainInfo.transfer;
    domain.status = domainInfo.status;
    domain.domain = domainInfo.domain;
    domain.error = domainInfo.error;
    domain.idnName = domainInfo.idnName;
    // Thêm bất kỳ trường nào khác cần cập nhật từ domainInfo
  }

  async function getWhoisDomain(domain) {
    return await DomainRepository.whois(domain)
  }

  async function getDomainTlds() {
    tlds.value = await DomainRepository.getTlds()
    tldsLoaded.value = true
  }

  return { tldsLoaded, searching, searchKey, domains, searchDomains, getDomainTlds, lastTldIndex, getWhoisDomain, updateInCart, tlds, topDomains }
})
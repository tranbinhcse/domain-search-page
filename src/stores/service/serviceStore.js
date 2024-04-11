import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import ServiceRepository from '@/repositories/ServiceRepository'

export const useServiceStore = defineStore('serviceStore', () => {
  const loading = ref(false)
  const slug = ref(0)
  const page = ref(0)
  const records = ref(0)
  const perpage = ref(10)
  const totalPages = ref(0)
  const services = ref([])
  const filter = ref({
    status: ''
  })
  const subCategories = ref([])

  async function getServices() {
    loading.value = true
    const res = await ServiceRepository.get(slug.value, { page: page.value, perpage: perpage.value, filter: filter.value })
    services.value = res.services
    page.value = res.page
    records.value = res.records
    perpage.value = res.perpage
    totalPages.value = res.totalPages
    loading.value = false
  }

  // async function getSubCategories(parentSlug) {
  //   console.log(parentSlug);
  //   const res = await ServiceRepository.getSubCategories();
  //   const parentCategory = res.categories.find(category => category.slug === parentSlug);
  
  //   if (!parentCategory) {
  //     console.error(`Parent category with slug ${parentSlug} not found`);
  //     return;
  //   }
  
  //   let subCategories = [];
  //   if (parentCategory.subcategories) {
  //     // Nếu danh mục cha có subcategories, lấy subcategories đó
  //     subCategories = parentCategory.subcategories;
  //   } else {
  //     // Nếu không, lấy tất cả các danh mục cùng cấp với danh mục cha
  //     const parentCategoryType = parentCategory.type;
  //     subCategories = res.categories.filter(category => category.type === parentCategoryType);
  //   }
  
  //   subCategories.value = subCategories;
  // }
  

  watch([page, perpage, filter, slug], getServices, {deep: true})
  
  return { loading, page, perpage, records, totalPages, services, filter, getServices , slug, subCategories}
})
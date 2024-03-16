<template>
    <div>
        {{ cartItems }}
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";
import { extractDomainParts } from '@/utility/utility.js';

// import { useStore } from '@/stores'; // Giả sử bạn đã tạo store và export nó từ '@/stores'
// Lấy route hiện tại từ Vue Router
const route = useRoute();
const router = useRouter();
 



const domainRegisterStore = useDomainRegisterStore()
 
const { addToCart, removeInCart } = domainRegisterStore
const { loading, cartItems } = storeToRefs(domainRegisterStore)



// Xử lý khi component được mounted
const handleMount = () => {
    const { query } = route;

    if (Array.isArray(query.domain)) {

        query.domain.forEach(domain => {
        const { tld }  = extractDomainParts(domain);
        const newItem = {
            domain: domain,
            name: domain,
            period: 1,
            type: 'register',
            tld: tld
        };
        console.log(newItem);
        addToCart(newItem);
        });
    } else if (query.domain) {
        // Nếu query.domain không phải mảng và tồn tại, chỉ xử lý một phần tử
        const { tld } = extractDomainParts(query.domain);
        const newItem = {
            domain: query.domain,
            name: query.domain,
            period: 1,
            type: 'register',
            tld: tld
        };
        addToCart(newItem);
    }
    router.push({ name: 'DomainConfig' });


}; 
handleMount();



</script>
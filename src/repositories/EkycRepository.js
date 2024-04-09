import { get, post } from "@/core/apiClient"
const EkycRepository = {
    recognition: async (request_id, type, image) => {
        const ocrData = await post(`/ekyc/ocr/recognition`, {request_id, type, image})
        return ocrData
    }, 
    verification: async (request_id, image_live, token = null) => {
        const faceid = await post(`/ekyc/faceid/verification`, {request_id, image_live, token})
        return faceid
    },
    checkNationalId: async idnumber => {
        const data = await post(`/ekyc/checkid`, {idnumber})
        return data 
    }

}

export default EkycRepository
import { get, post } from '@/core/apiClient'
const PaymentRepository = {
  getPaymentMethods: async () => {
    const { payments } = await get(`/payment`)
    return payments
  }
}

export default PaymentRepository

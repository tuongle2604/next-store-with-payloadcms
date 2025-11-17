import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { type Product } from '@/payload-types'

function useGetProduct(productID: string) {
  return useQuery({
    queryKey: ['product-detail', productID],
    queryFn: async () => {
      if (!productID) {
        return null
      }

      try {
        const { data } = await axios.get<Product>(`/api/products/${productID}`, {
          withCredentials: true,
        })

        return data
      } catch (error) {
        console.log(error)
      }
    },
  })
}

export { useGetProduct }

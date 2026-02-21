import { GetProductsResponse } from '@/shared/interfaces/products.interface';


export const fetchProducts = async ( category: string ) => {

    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)

    const data = await response.json()

    return data as GetProductsResponse
}

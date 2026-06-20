import type { Product } from './types/type'
import ProductCard from './ProductCard'
import LoadingProductCard from '../loading/LoadingProductCard'
const ProductsGrid = ({products,loading}:{products:Product[]|undefined,loading:boolean}) => {
  return (
    <div className='grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full h-full justify-items-center'>
      { loading ? Array.from({length:25}).map((_,i:number)=>(
          <LoadingProductCard key={i}/>
        )) :
        products?.map((el:Product,i:number)=>(
          <ProductCard product={el} key={i} />
        ))
      }
    </div>
  )
}

export default ProductsGrid

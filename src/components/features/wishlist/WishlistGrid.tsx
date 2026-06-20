import type { ProductWithCount } from '../products/types/type'
import WishlistCard from './WishlistCard'
const WishlistGrid = ({products,loading}:{products:ProductWithCount[]|null,loading:boolean}) => {
  return (
   !loading && <div className='grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
      {
        products?.map((el:ProductWithCount,i:number)=>(
          <WishlistCard product={el} key={i} />
        ))
      }
    </div>
  )
}

export default WishlistGrid

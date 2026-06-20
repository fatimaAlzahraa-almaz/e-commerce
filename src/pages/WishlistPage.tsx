import WishlistGrid from "../components/features/wishlist/WishlistGrid"
import { UserAuth } from "../app/context/AuthContext";
import { useAppSelector } from "../app/hooks/hooks";
const WishListPage = () => {
  
  const{user}=UserAuth();
  const favorites=useAppSelector((state)=>state.favorites.value)
  return (
    <div className="mt-18 flex flex-col gap-4 p-2 sm:p-4 min-h-[80vh]">
      <div className="flex flex-col gap-2">
          <p className="text-2xl font-medium text-gray-700 ">My Wishlist</p>
          <p className="text-gray-600">{favorites?.length || 0} items</p>
      </div>
      {
        (!user || favorites?.length==0) &&  <p className="text-2xl sm:text-3xl  text-gray-700 text-center h-full w-full my-auto">Your Wishlist is empty!</p>
      }
       
      <WishlistGrid products={favorites} loading={false}/>
    </div>
  )
}

export default WishListPage
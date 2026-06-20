import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import PlaceorderPage from '../pages/PlaceOrderPage'
import ProductInfoPage from '../pages/ProductInfoPage'
import SigninPage from '../pages/SigninPage'
import SignupPage from '../pages/SignupPage'
import WishListPage from '../pages/WishlistPage'
import AllProductsPage from '../pages/AllProductsPage'
import SearchPage from '../pages/SearchPage'
import CategoryProductsPage from '../pages/CategoryProductsPage'
import {Routes,Route} from 'react-router-dom'
const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/cart' element={<CartPage/>}></Route>
      <Route path='/checkout' element={<CheckoutPage/>}></Route>
      <Route path='/placeorder' element={<PlaceorderPage/>}></Route>
      <Route path='/productinfo/:id' element={<ProductInfoPage/>}></Route>
      <Route path='/products' element={<AllProductsPage/>}></Route>
      <Route path='/signin' element={<SigninPage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/wishlist' element={<WishListPage/>}></Route>
      <Route path='/search' element={<SearchPage/>}></Route>
      <Route path='/category' element={<CategoryProductsPage/>}></Route>

    </Routes>
  )
}

export default Router

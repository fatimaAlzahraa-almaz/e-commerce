import HeroSection from "../components/features/home/HeroSection";
import CategoryRow from "../components/features/home/CategoryRow";
import SpecificationSection from "../components/features/home/SpecificationSection";
import ProductsRow from "../components/features/products/ProductsHomeRow";
import LoginNotification from "../components/features/notification/LoginNotification";
import { useAppSelector } from "../app/hooks/hooks";
const HomePage = () => {
  const showLoginNotification=useAppSelector((state)=>state.loginNotification.value)
  return (
    <div className="mt-18 min-h-[80vh]  relative ">
      {showLoginNotification && <LoginNotification />}
      <HeroSection />
      <CategoryRow />
      <ProductsRow title={"Latest Products"} order={"asc"} sort={"title"} />
      <ProductsRow title={"Best Selling"} order={""} sort={""} />
      <SpecificationSection />
    </div >
  );
};

export default HomePage;

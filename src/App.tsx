import "./App.css";
import Footer from "./components/layout/Footer";
import Router from "./routes/Router";
import Header from "./components/layout/Header";
import { useCartListener } from "./app/features/cart/useCartListener";
import { useFavoritesListener } from "./app/features/favorites/useFavoritesListener";
import { UserAuth } from "./app/context/AuthContext";
function App() {
  const{user}=UserAuth();
  useCartListener(user?.email??undefined);
  useFavoritesListener(user?.email??undefined);
  return (
   
      <div>
        <Header />
        <Router />
        <Footer />
      </div>
   
  );
}

export default App;

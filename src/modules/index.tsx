
import {
  Routes,
  Route,
} from "react-router-dom";
import Box from "../design-system/components/Box";
import AppNotifier from "./app/components/AppNotifier";
import Header from "./app/components/Header";
import ShoppingCart from "./shopping-cart";
import CheckoutPage from "./shopping-cart/CheckoutPage";
import CheckingOutOverlay from "./shopping-cart/components/CheckingOutOverlay";

import ShoppingList from './shopping-list';
import ProductPage from "./shopping-list/ProductPage";
 




function EntryPoint() {

  return (
    <Box>
      <Header />
      <AppNotifier />
      <CheckingOutOverlay />
    <Routes>
      <Route path="/" element={< ShoppingList />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    
   
    </Routes>
    </Box>
  )
}


export default EntryPoint;

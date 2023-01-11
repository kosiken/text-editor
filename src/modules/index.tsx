
import {
  Routes,
  Route,
} from "react-router-dom";
import Box from "../design-system/components/Box";
import AppNotifier from "./app/components/AppNotifier";
import Header from "./app/components/Header";
import ShoppingCart from "./shopping-cart";

import ShoppingList from './shopping-list';
import ProductPage from "./shopping-list/ProductPage";
 




function EntryPoint() {

  return (
    <Box>
      <Header />
      <AppNotifier />
    <Routes>
      <Route path="/" element={< ShoppingList />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<ShoppingCart />} />
    
   
    </Routes>
    </Box>
  )
}


export default EntryPoint;

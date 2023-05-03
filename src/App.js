import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import ProductContext from "./context/ProductContext";
import CartContext from "./context/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (itemId) => {
    setCart(cart.filter((cartItem) => cartItem.id !== itemId));
  };

  return (
    <ProductContext.Provider value={{ products, cart, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation cart={cart} />

          {/* Routes */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart cart={cart} />
            </Route>
          </main>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;

import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    price: 100,
    description: "Description for Product 1",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    price: 200,
    description: "Description for Product 2",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Category C",
    price: 300,
    description: "Description for Product 3",
    image: "https://via.placeholder.com/150",
  },
  // Add more products as needed
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    county: "",
    city: "",
    postalCode: "",
    name: "",
    email: "",
  });

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const handleQuantityChange = (productId, delta) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const orderData = {
      orderDetails,
      cart,
    };
    // Replace this with your email sending logic
    console.log("Order submitted:", orderData);
    alert("Order submitted! Check console for details.");
  };

  return (
    <div className="app">
      <style>
        {`
          .app {
            font-family: Arial, sans-serif;
            padding: 20px;
          }

          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: #f8f9fa;
            margin-bottom: 20px;
          }

          .cart {
            position: relative;
            cursor: pointer;
          }

          .cart img {
            width: 40px;
          }

          .cart-count {
            position: absolute;
            top: -10px;
            right: -10px;
            background: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
          }

          .cart-contents {
            position: fixed;
            top: 60px;
            right: 10px;
            border: 1px solid #ddd;
            padding: 10px;
            background-color: #fff;
            width: 300px;
            display: ${isCartOpen ? "block" : "none"};
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            padding: 20px;
          }

          .product-item {
            border: 1px solid #ddd;
            padding: 20px;
            text-align: center;
            transition: transform 0.2s;
          }

          .product-item:hover {
            transform: scale(1.05);
          }

          .product-item img {
            max-width: 100%;
            cursor: pointer;
          }

          .product-page {
            padding: 20px;
          }

          .product-page img {
            max-width: 100%;
          }

          .quantity-control {
            display: flex;
            align-items: center;
          }

          .quantity-control button {
            margin: 0 5px;
          }

          .order-form input {
            display: block;
            margin-bottom: 10px;
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
          }
        `}
      </style>

      <header>
        <h1>My Webstore</h1>
        <div className="cart" onClick={() => setIsCartOpen(!isCartOpen)}>
          <img src="https://via.placeholder.com/40" alt="Cart" />
          {cart.length > 0 && (
            <div className="cart-count">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          )}
        </div>
      </header>

      {selectedProduct ? (
        <div className="product-page">
          <button onClick={() => setSelectedProduct(null)}>Back</button>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <h1>{selectedProduct.name}</h1>
          <p>{selectedProduct.description}</p>
          <p>{selectedProduct.price} RON</p>
          <button onClick={() => addToCart(selectedProduct)}>
            Add to Cart
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.name}
                onClick={() => setSelectedProduct(product)}
              />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>{product.price} RON</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => setSelectedProduct(product)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-contents">
        <h2>Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(item.id, -1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
        <form className="order-form" onSubmit={handleSubmitOrder}>
          <input
            type="text"
            name="county"
            placeholder="County"
            value={orderDetails.county}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={orderDetails.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={orderDetails.postalCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={orderDetails.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={orderDetails.email}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Order</button>
        </form>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

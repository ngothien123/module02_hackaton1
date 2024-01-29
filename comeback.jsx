// Product.js
import  { useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.css';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const sampleProducts = [
    {
      id: 1,
      name: "Điện thoại Samsung Galaxy S21",
      price: 20000000,
      img:  "https://ntstore.com.vn/wp-content/uploads/2022/12/600_galaxy_s21_5g_ntstore-4.jpg"
    },
    {
      id: 2,
      name: "Điện thoại iPhone 14 Promax",
      price: 20500000,
      img: "https://cdn.trangthienlong.com.vn/wp-content/uploads/2022/10/iphone-14-pro-max-mau-tim-deep-purple-128gb-256gb-512gb-1tb-trang-thien-long-mobile.jpg"
    },
    {
      id: 3,
      name: "Điện thoại Samsung Galaxy S20",
      price: 21000000,
      img: "https://ntstore.com.vn/wp-content/uploads/2022/12/600_galaxy_s21_5g_ntstore-4.jpg"
    },
    {
      id: 4,
      name: "Điện thoại iPhone 11 Promax",
      price: 21500000,
      img: "https://chamsocdidong.com/images/service/2023/10/25/original/thay-man-hinh-iphone-15-pro-max_1698219525.jpg"
    },
    {
      id: 5,
      name: "Điện thoại Samsung Galaxy S22",
      price: 22000000,
      img: "https://viostore.vn/wp-content/uploads/2022/10/1799791919.jpeg"
    },
    {
      id: 6,
      name: "Điện thoại Samsung Galaxy S23",
      price: 22500000,
      img: "https://tse3.mm.bing.net/th?id=OIP.ZVeFgZ7oDODoAqjh9Jn2nQHaHa&pid=Api&P=0&h=180"
    },
    {
      id: 7,
      name: "Điện thoại Oppo A9",
      price: 22000000,
      img: "https://tse2.mm.bing.net/th?id=OIP.88LuTw7rEU2JDXWrsIxu_wHaE8&pid=Api&P=0&h=180"
    },
    {
      id: 8,
      name: "Điện thoại Oppo V5",
      price: 23900000,
      img: "https://tse4.mm.bing.net/th?id=OIP.Q8Zn4a5ta1skPGttct-JJAHaE8&pid=Api&P=0&h=180"
    },
    {
      id: 9,
      name: "Điện thoại Oppo A5s",
      price: 24000000,
      img: "https://cf.shopee.vn/file/60d340971f64e50e66cfe845bbfbc883"
    },
    {
      id: 10,
      name: "Điện thoại Oppo A73",
      price: 24500000,
      img: "https://toplist.vn/images/800px/chiec-dien-thoai-oppo-tot-nhat-hien-nay-69032.jpg"
    },

  ];


  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('product'));
    const storedCart = JSON.parse(localStorage.getItem('cart'));

    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      setProducts(sampleProducts);
      localStorage.setItem('product', JSON.stringify(sampleProducts));
    }

    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      const existingProduct = cart.find((item) => item.id === selectedProduct.id);

      if (existingProduct) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === selectedProduct.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...selectedProduct, quantity: 1 }]);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible((prevVisibility) => !prevVisibility);
  };
  const closeCart = () => {
    setIsCartVisible(false);
  };

  return (
    <div>
      <div className="container">
        <div className="container-header">
          <div className="container-header-item">
            <div>Trang chủ</div>
            <div>Danh sách sản phẩm</div>
          </div>
          <div className="container-header-item">
            <button onClick={toggleCartVisibility}>
              <ShoppingCartIcon />
            </button>
            <span className="quantity">{getTotalQuantity()}</span>
          </div>
        </div>
      </div>
      <h3>DANH SÁCH SẢN PHẨM</h3>
      <div className="product">
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.img} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product.id)}>Thêm vào Giỏ Hàng</button>
          </div>
        ))}
      </div>

      <div className={`cart ${isCartVisible ? 'visible' : ''}`}>
        <button className="close-cart" onClick={closeCart}>
          Close
        </button>
        <h3>GIỎ HÀNG</h3>
  
        <div className="checkout-container">
        <div className="cart">
          {cart.map((product) => (
            <div key={product.id}>
              <img src={product.img} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                <p>{product.quantity}</p>
                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </div>
              <button onClick={() => removeFromCart(product.id)}>Xóa</button>
            </div>
          ))}
        </div>
          <p>Tổng số lượng: {getTotalQuantity()}</p>
          <p>Tổng giá trị: {getTotalPrice()} VNĐ</p>
          <button className="checkout-button">Thanh toán</button>
        </div>
      </div>
    </div>
  );
}
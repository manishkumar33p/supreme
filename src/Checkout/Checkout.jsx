import React, { useEffect, useState } from "react";
import "./Checkout.css";
import emailjs from "@emailjs/browser";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
});

const removeItem = (indexToRemove) => {
  const updatedCart = cartItems.filter(
    (_, index) => index !== indexToRemove
  );

  setCartItems(updatedCart);

  localStorage.setItem(
    "marv_home_cart",
    JSON.stringify(updatedCart)
  );
};

const sendCheckoutEmail = async () => {
  const templateParams = {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    city: formData.city,
    products: cartItems
      .map((item) => item.name)
      .join(", "),
  };

  try {
    await emailjs.send(
      "service_2ng31kl",
      "template_7i0twa4",
      templateParams,
      "qNScG7klNblK7hXS5"
    );

    alert("Enquiry Sent Successfully");
  } catch (error) {
    console.log(error);
    alert("Failed To Send");
  }
};


  useEffect(() => {
  const savedCart =
    localStorage.getItem("marv_home_cart");

  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }
}, []);

  const total = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "number"
        ? item.price
        : 0;

    return sum + price;
  }, 0);

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-left">

          <h2>Customer Details</h2>

         <form
  onSubmit={(e) => {
    e.preventDefault();
    sendCheckoutEmail();
  }}
>

            <input
  type="text"
  placeholder="Full Name"
  value={formData.name}
  onChange={(e) =>
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }
/>

           <input
  type="tel"
  placeholder="Mobile Number"
  value={formData.phone}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value,
    })
  }
/>

           <input
  type="email"
  placeholder="Email Address"
  value={formData.email}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }
/>
<textarea
  placeholder="Full Address"
  value={formData.address}
  onChange={(e) =>
    setFormData({
      ...formData,
      address: e.target.value,
    })
  }
/>

            <input
  type="text"
  placeholder="City"
  value={formData.city}
  onChange={(e) =>
    setFormData({
      ...formData,
      city: e.target.value,
    })
  }
/>

            <button type="submit">
              Place Enquiry
            </button>

          </form>

        </div>

       <div className="checkout-right">

  <h2>Order Summary</h2>

  <button className="clear"
    onClick={() => {
      setCartItems([]);
      localStorage.removeItem("marv_home_cart");
    }}
  >
    Clear Cart
  </button>

  {cartItems.length === 0 ? (
    <p>No Items Added</p>
  ) : (
    cartItems.map((item, index) => (
      <div
        className="summary-item"
        key={index}
      >
        <h4>{item.name}</h4>

        <p>
          {typeof item.price === "number"
            ? `₹${item.price.toLocaleString()}`
            : item.price}
        </p>

        <button className="remove-btn"
          onClick={() => removeItem(index)}
        >
          Remove
        </button>

      </div>
    ))
  )}

  <div className="summary-total">
    Total: ₹{total.toLocaleString()}
  </div>

</div>

      </div>

    </div>
  );
}

export default Checkout;
import React from "react";
import "./Orders.css";

const Orders = ({ orders }) => {
  const orderEls = orders.map((order) => {
    return (
      <div className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section className='orders-container'>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;

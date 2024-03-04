import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
    getOrders()
    .then(data => {
      setOrders(data.orders)
    })
    .catch((err) => console.error("Error fetching:", err));
  }, []);

  const postOrder = (newOrder) => {
    return fetch('http://localhost:3001/api/v1/orders', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
    .then(response => response.json())
    .then(newData => setOrders([...orders, newData]))
  }

  function addOrder(newOrder) {
    postOrder(newOrder)
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>
      <Orders orders={orders} />
    </main>
  );
}

export default App;

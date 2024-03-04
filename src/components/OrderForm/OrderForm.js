import { useState } from "react";

function OrderForm({ addOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const newOrder = {
      id: Date.now(),
      name,
      ingredients
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      alert('Please fill out the name field');
      return;
    }

    if (!ingredients.length) {
      alert('Please select at least one ingredient');
      return;
    }

    addOrder(newOrder)
    clearInputs();
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  function buildIngredients(e, newIngredient) {
    e.preventDefault();
    setIngredients([...ingredients, newIngredient])
  }

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        name={ingredient}
        value={ingredient}
        onClick={(e) => buildIngredients(e, e.target.value)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value) }
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;

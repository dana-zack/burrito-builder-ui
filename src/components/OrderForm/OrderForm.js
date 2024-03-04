import { useState } from "react";

function OrderForm({ addOrder }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [alert, setAlert] = useState('');

  const newOrder = {
      id: Date.now(),
      name,
      ingredients
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAlert('');

    if (!name) {
      setAlert('Please fill out the name field before continuing')
      return
    }

    if (!ingredients.length) {
      setAlert('Please select at least one ingredient before continuing')
      return
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
        className='ing-btn'
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

      <p className='order-msg'>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button className='submit-btn' onClick={(e) => handleSubmit(e)}>Submit Order</button>
      { alert && <p className='alert-msg'>{alert}</p>}
    </form>
  );
}

export default OrderForm;

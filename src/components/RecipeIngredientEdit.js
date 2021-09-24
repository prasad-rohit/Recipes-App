import React from "react";

const RecipeIngredientEdit = ({
  ingred,
  handleIngredientChange,
  handleIngredientDelete,
}) => {
  function handleChange(changes) {
    handleIngredientChange(ingred.id, { ...ingred, ...changes });
  }

  return (
    <>
      <input
        className="recipe-edit__input"
        type="text"
        value={ingred.name}
        onInput={(e) => handleChange({ name: e.target.value })}
      />
      <input
        className="recipe-edit__input"
        type="text"
        value={ingred.amount}
        onInput={(e) => handleChange({ amount: e.target.value })}
      />
      <button
        className="btn btn--danger"
        onClick={() => handleIngredientDelete(ingred.id)}
      >
        &times;
      </button>
    </>
  );
};

export default RecipeIngredientEdit;

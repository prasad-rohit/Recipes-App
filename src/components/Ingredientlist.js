import Ingredients from "./Ingredients";

const IngredientList = ({ ingredients }) => {
  const IngredientComp = ingredients.map((ingredient) => {
    return <Ingredients key={ingredient.id} {...ingredient} />;
  });

  return <>{IngredientComp}</>;
};

export default IngredientList;

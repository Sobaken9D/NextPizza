import {Ingredient} from "@prisma/client";
import React from "react";
import {Api} from "@/services/api-client";


interface ReturnProps {
  items: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngrediets] = React.useState<Ingredient[]>([]);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        setIngrediets(ingredients);
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, [])

  return {ingredients};
}
import {Ingredient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";


/**
 * Функция для подсчета общей стоймости пиццы
 * @param type - тип теста
 * @param size - размер пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - список выбранных ингредиентов
 *
 * @returns number общая стоймость
 */
export const calcTotalPizzaPrice = (type: PizzaType, size: PizzaSize, items: ProductItem[], ingredients: Ingredient[], selectedIngredients: Set<number>) => {
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
}
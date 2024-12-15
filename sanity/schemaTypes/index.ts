import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { heroType } from "./heroType";
import { productType } from "./productType";
import { orderType } from "./orderTyoe";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, heroType, productType, orderType],
};

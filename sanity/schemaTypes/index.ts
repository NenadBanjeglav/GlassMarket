import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { heroType } from "./heroType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { pdfFileType } from "./pdfFileType";
import { userType } from "./userType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    heroType,
    productType,
    orderType,
    pdfFileType,
    userType,
  ],
};

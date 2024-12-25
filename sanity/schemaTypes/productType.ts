/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BasketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  //@ts-ignore
  icon: BasketIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "volume",
      title: "Volume - ml",
      type: "number",
    }),
    defineField({
      name: "width",
      title: "Width (mm)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "height",
      title: "Height (mm)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "weight",
      title: "Weight (gr)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "category" },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      description: "Indicates whether the product is available in stock.",
      options: {
        layout: "checkbox", // Use "checkbox" or "switch" for a toggle-like UI
      },
      initialValue: true, // Default value to make it intuitive for new products
    }),

    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          {
            title: "Nov",
            value: "NOVO",
          },
          {
            title: "Akcija",
            value: "AKCIJA",
          },
        ],
      },
    }),
    defineField({
      name: "relatedCaps",
      title: "Related Caps",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      description: "Link to related products such as caps for bottles.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price",
      inStock: "inStock",
    },
    prepare(selection) {
      const { title, media, price, inStock } = selection;
      return {
        title: title,
        subtitle: `${inStock ? "In Stock" : "Out of Stock"} - $${price}`,
        media: media,
      };
    },
  },
});

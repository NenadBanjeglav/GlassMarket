import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "street",
      title: "Street",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "postalCode",
      title: "Postal Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
    }),

    defineField({
      name: "pib",
      title: "PIB",
      type: "string",
    }),

    defineField({
      name: "message",
      title: "Customer Message",
      type: "text",
    }),

    defineField({
      name: "total",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "discountedPrice",
      title: "Discounted Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity} rsd`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",

      options: {
        list: [
          { title: "Confirmed", value: "confirmed" },
          { title: "Shipped", value: "shipped" },
        ],
      },
    }),
  ],

  preview: {
    select: {
      name: "customerName",
      amount: "total",
      orderId: "orderNumber",
      email: "email",
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    prepare(select) {
      const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;

      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount}, ${select.email}`,
        media: BasketIcon,
      };
    },
  },
});

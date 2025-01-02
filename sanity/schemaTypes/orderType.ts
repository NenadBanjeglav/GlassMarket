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
      readOnly: true,
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
      readOnly: true,
    }),

    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      name: "street",
      title: "Street",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      name: "postalCode",
      title: "Postal Code",
      type: "string",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Direktna bankovna transakcija", value: "bankTransfer" },
          { title: "Plaćanje prilikom preuzimanja", value: "cashOnDelivery" },
        ],
      },
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "deliveryMethod",
      title: "Delivery Method",
      type: "string",
      options: {
        list: [
          { title: "Prodavnica", value: "store" },
          { title: "Dostava", value: "delivery" },
        ],
      },
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "pib",
      title: "PIB",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "message",
      title: "Customer Message",
      type: "text",
      readOnly: true,
    }),

    defineField({
      name: "priceOfProducts",
      title: "Price of Products",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      readOnly: true,
    }),

    defineField({
      name: "deliveryPrice",
      title: "Delivery Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      readOnly: true,
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      readOnly: true,
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
              readOnly: true,
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
              readOnly: true,
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
              discount: "product.discount",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * (1 - select.discount / 100) * select.quantity} rsd`,
                media: select.image,
              };
            },
          },
        }),
      ],
      readOnly: true,
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Confirmed", value: "confirmed" },
          { title: "Shipped", value: "shipped" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Ready For Pick Up", value: "readyForPickUp" },
        ],
      },
    }),
  ],

  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
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

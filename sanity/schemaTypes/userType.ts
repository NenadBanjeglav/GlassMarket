import { defineType, defineField, defineArrayMember } from "sanity";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      description: "The unique ID associated with the user in Clerk.",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
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
      name: "address",
      title: "Address",
      type: "object",
      fields: [
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
      ],
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
      name: "orders",
      title: "Orders",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "order" }],
        }),
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      orders: "orders",
    },
    prepare(selection) {
      const { title, subtitle, orders } = selection;
      const orderCount = orders ? orders.length : 0;
      return {
        title,
        subtitle: `${subtitle} (${orderCount} ${orderCount === 1 ? "order" : "orders"})`,
      };
    },
  },
});

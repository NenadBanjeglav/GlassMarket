/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  //@ts-ignore
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
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
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Toggle to activate/deactivate the hero section",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      isActive: "isActive",
    },
    prepare(select) {
      const { title, description, isActive } = select;
      const status = isActive ? "🟢 Active" : "🔴 Inactive";
      const formattedDescription = description
        ? description
        : "No description provided";

      return {
        title: title || "Untitled Hero",
        subtitle: `${formattedDescription} - ${status}`,
      };
    },
  },
});

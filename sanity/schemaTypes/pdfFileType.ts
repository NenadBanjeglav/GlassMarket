/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pdfFileType = defineType({
  name: "pdfFile",
  title: "PDF File",
  type: "document",
  //@ts-ignore
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "A short description of the PDF file",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      description: "Upload a PDF file",
      options: {
        accept: ".pdf", // Restrict to PDF files
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

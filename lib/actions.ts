"use server";

import { Resend } from "resend";
import { OrderEmail } from "@/components/resend/order-email";

export interface OrderEmailValues {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  deliveryMethod: string;
  products: Array<{
    name: string;
    price: number;
    quantity: number;
    total: number;
    image?: string;
  }>;
  productTotal: number;
  deliveryTotal: number;
  grandTotal: number;
  pdfBase64: string; // Base64-encoded PDF string
}

export async function sendOrderEmailWithPDF(values: OrderEmailValues) {
  const { customerEmail, pdfBase64 } = values;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "potvrda@glassmarket.dev",
      to: [customerEmail],
      subject: "Porudžbina - Detalji i PDF",
      react: OrderEmail(values),
      attachments: [
        {
          filename: "order-details.pdf",
          content: pdfBase64, // Base64-encoded PDF content
        },
      ],
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email with PDF:", error);
    throw new Error("Failed to send email with PDF");
  }
}

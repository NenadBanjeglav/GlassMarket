"use server";

import { Resend } from "resend";
import { OrderEmail } from "@/components/resend/order-email";
import { StatusUpdateEmail } from "@/components/resend/status-update-email";

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
  pdfBase64: string;
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

export async function sendOrderStatusEmailUpdate(
  orderNumber: string,
  newStatus: string,
  customerEmail: string,
  customerName: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "no-reply@glassmarket.dev",
      to: [customerEmail],
      subject: `Ažuriranje statusa narudžbine #${orderNumber}`,
      react: StatusUpdateEmail({ customerName, orderNumber, newStatus }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending order status update Email:", error);
    throw new Error("Failed to send order status update!");
  }
}

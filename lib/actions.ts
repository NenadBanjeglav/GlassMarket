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

export interface ContactFormData {
  selected: "company" | "individual"; // Enum type for selected field
  name: string; // User's name
  phone: string; // User's phone number
  email: string; // User's email address
  companyName?: string; // Optional company name, required only if "selected" is "company"
  message: string; // User's message
}

export async function sendContactFormEmail(values: ContactFormData) {
  const { name, email, phone, companyName, message, selected } = values;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = "Nova poruka sa kontakt forme";

  const content = `
    <h1>Nova poruka sa kontakt forme</h1>
    <p><strong>Ime:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    ${
      selected === "company"
        ? `<p><strong>Ime kompanije:</strong> ${companyName || "Nije navedeno"}</p>`
        : ""
    }
    <p><strong>Poruka:</strong> ${message}</p>
  `;

  try {
    await resend.emails.send({
      from: "no-reply@glassmarket.dev", // Provereni email za Resend
      to: ["nenadmobmail@gmail.com"],
      subject,
      html: content,
    });

    return { success: true };
  } catch (error) {
    console.error("Greška pri slanju email-a sa kontakt forme:", error);
    throw new Error("Neuspešno slanje email-a sa kontakt forme");
  }
}

export async function sendOrderEmailWithPDF(values: OrderEmailValues) {
  const { customerEmail, pdfBase64 } = values;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "potvrda@glassmarket.dev",
      to: [customerEmail],
      bcc: ["nenadmobmail@gmail.com"],
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

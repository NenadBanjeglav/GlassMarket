import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Img,
  Link,
} from "@react-email/components";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

interface OrderEmailProps {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  deliveryMethod: string;
  products: OrderItem[];
  productTotal: number;
  deliveryTotal: number;
  grandTotal: number;
}

export const OrderEmail = ({
  orderNumber,
  orderDate,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  paymentMethod,
  deliveryMethod,
  products,
  productTotal,
  deliveryTotal,
  grandTotal,
}: OrderEmailProps) => (
  <Html>
    <Body
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Header */}
        <Img
          src="https://www.glassmarket.dev/logo.jpg"
          alt="Glass Market"
          style={{ maxWidth: "150px", marginBottom: "20px" }}
        />
        <Text
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Porudžbenica
        </Text>
        <Text>Broj porudžbine: {orderNumber}</Text>
        <Text>Datum porudžbine: {orderDate}</Text>

        {/* Customer Info */}
        <Text
          style={{ fontSize: "18px", marginTop: "20px", fontWeight: "bold" }}
        >
          Podaci naručioca:
        </Text>
        <Text>Ime: {customerName}</Text>
        <Text>Adresa: {customerAddress}</Text>
        <Text>Telefon: {customerPhone}</Text>
        <Text>E-mail: {customerEmail}</Text>

        {/* Order Details */}
        <Text
          style={{ fontSize: "18px", marginTop: "20px", fontWeight: "bold" }}
        >
          Detalji narudžbine:
        </Text>
        <Text>Način plaćanja: {paymentMethod}</Text>
        <Text>Dostava: {deliveryMethod}</Text>

        {/* Product Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Proizvod
              </th>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Cena
              </th>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Količina
              </th>
              <th
                style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                Ukupno
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {product.image && (
                    <Img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                        verticalAlign: "middle",
                        display: "inline-block",
                      }}
                    />
                  )}
                  {product.name}
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.price.toFixed(2)} RSD
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.quantity}
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {product.total.toFixed(2)} RSD
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <Text style={{ marginTop: "20px", fontWeight: "bold" }}>
          Cena proizvoda: {productTotal.toFixed(2)} RSD
        </Text>
        <Text>Cena dostave: {deliveryTotal.toFixed(2)} RSD</Text>
        <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
          Ukupan iznos: {grandTotal.toFixed(2)} RSD
        </Text>

        {/* Footer */}
        <Text style={{ fontSize: "12px", color: "#666", marginTop: "30px" }}>
          Zahvaljujemo se na poverenju!
        </Text>
        <Link
          href="https://www.glassmarket.rs"
          style={{ fontSize: "12px", color: "#666" }}
        >
          www.glassmarket.rs
        </Link>
      </Container>
    </Body>
  </Html>
);

import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Img,
} from "@react-email/components";

interface StatusUpdateEmailProps {
  orderNumber: string;
  customerName: string;
  newStatus: string;
}

export const StatusUpdateEmail = ({
  orderNumber,
  customerName,
  newStatus,
}: StatusUpdateEmailProps) => {
  const statusTranslations: Record<string, string> = {
    confirmed: "Potvrđena",
    shipped: "Poslata",
    cancelled: "Otkazana",
    readyForPickUp: "Spremna za preuzimanje",
  };

  const translatedStatus = statusTranslations[newStatus] || newStatus;

  return (
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
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Ažuriranje statusa narudžbine
          </Text>
          <Text
            style={{
              fontSize: "16px",
              marginBottom: "20px",
              color: "#333333",
            }}
          >
            Poštovani {customerName},
          </Text>
          <Text
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              color: "#333333",
              marginBottom: "20px",
            }}
          >
            Status Vaše narudžbine broj <b>{orderNumber}</b> je promenjen u:{" "}
            <b className="uppercase">{translatedStatus}</b>.
          </Text>
          <Text
            style={{
              fontSize: "14px",
              lineHeight: "1.5",
              color: "#333333",
            }}
          >
            Zahvaljujemo se na Vašem poverenju i ukoliko imate bilo kakvih
            pitanja, slobodno nas kontaktirajte.
          </Text>

          {/* Footer */}
          <Text
            style={{
              fontSize: "12px",
              color: "#666666",
              marginTop: "30px",
            }}
          >
            Srdačno,
            <br />
            Vaš Glass Market tim
          </Text>
          <Link
            href="https://www.glassmarket.rs"
            style={{
              fontSize: "12px",
              color: "#666666",
            }}
          >
            www.glassmarket.rs
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

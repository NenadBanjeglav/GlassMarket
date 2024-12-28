/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/fonts/Poppins-Regular.ttf", // Regular font file
      fontWeight: "normal",
    },
    {
      src: "/fonts/Poppins-Bold.ttf", // Bold font file
      fontWeight: "bold",
    },
  ],
});

export interface OrderItem {
  _key: string;
  product: Product;
  quantity: number;
}

export interface OrderData {
  _type: "order";
  orderNumber: string;
  clerkUserId: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  street: string;
  postalCode: string;
  paymentMethod: string;
  deliveryMethod: string;
  companyName: string;
  pib: string;
  message: string;
  priceOfProducts: number;
  deliveryPrice: number;
  totalPrice: number;
  products: OrderItem[]; // array of order items
  createdAt: string;
  status: "confirmed" | "pending" | "shipped" | "delivered" | string;
}

interface InvoiceDocumentProps {
  orderData: OrderData;
}

// Example styling
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    padding: 40,
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: "auto",
  },
  titleBlock: {
    textAlign: "right",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  orderNumber: {
    fontSize: 12,
    marginTop: 5,
    color: "#666666",
  },
  buyerInfo: {
    marginBottom: 15,
  },
  buyerInfoTitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 5,
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    padding: 6,
  },
  th: {
    flex: 2,
    fontWeight: "bold",
  },
  thCentered: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  td: {
    flex: 2,
  },
  tdCentered: {
    flex: 1,
    textAlign: "center",
  },
  productImage: {
    width: 25,
    height: 25,
    marginRight: 6,
  },
  totalRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  totalValue: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    flexDirection: "row",

    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
  },
  footerLeft: {
    textAlign: "left",
  },
  footerRight: {
    textAlign: "right",
  },
});

export function InvoiceDocument({ orderData }: InvoiceDocumentProps) {
  const {
    orderNumber,
    customerName,
    email,
    phone,
    city,
    street,
    paymentMethod,
    deliveryMethod,
    totalPrice,
    products,
    createdAt,
    deliveryPrice,
    priceOfProducts,
  } = orderData;
  const address = `${street}, ${city}`;

  return (
    <Document>
      {/* Main Page */}
      <Page style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Image src="/logo.jpg" style={styles.logo} />
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Porudžbenica</Text>
            <Text style={styles.orderNumber}>
              Broj porudžbine: {orderNumber.slice(-5)}
            </Text>
            <Text style={styles.orderNumber}>
              Datum porudžbine:{" "}
              {new Date(createdAt).toLocaleDateString("sr-Latn", {
                day: "numeric",
                month: "2-digit",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>

        {/* BUYER INFO */}
        <View style={styles.buyerInfo}>
          <Text style={styles.buyerInfoTitle}>Podaci naručioca:</Text>
          <Text>Ime: {customerName}</Text>
          <Text>Adresa: {address}</Text>
          <Text>Telefon: {phone}</Text>
          <Text>E-mail: {email}</Text>
        </View>

        {/* PAYMENT & DELIVERY */}
        <View style={{ marginBottom: 20 }}>
          <Text>
            Način plaćanja:
            {paymentMethod === "bankTransfer"
              ? " Direktna bankovna transakcija"
              : " Plaćanje prilikom preuzimanja"}
          </Text>
          <Text>
            Dostava:
            {deliveryMethod === "store"
              ? " Preuzimanje u prodavnici"
              : " Dostava kurirskom službom"}
          </Text>
        </View>

        {/* PRODUCT TABLE HEADERS */}
        <View style={styles.tableHeader}>
          <Text style={styles.th}>Proizvod</Text>
          <Text style={styles.thCentered}>Pojedinačna cena</Text>
          <Text style={styles.thCentered}>Količina</Text>
          <Text style={styles.thCentered}>Ukupno</Text>
        </View>

        {/* PRODUCT TABLE ROWS */}
        {products.map((p, idx) => (
          <View style={styles.tableRow} key={idx} wrap={true}>
            <View style={styles.td}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {p.product.image ? (
                  <Image
                    src={urlFor(p.product.image).url()}
                    style={styles.productImage}
                  />
                ) : null}
                <View>
                  <Text>{p.product.name}</Text>
                  <Text style={{ fontSize: 9, color: "#666" }}>
                    Težina: {p.product.weight}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.tdCentered}>
              {(p.product.price! * (1 - p.product.discount! / 100)).toFixed(2)}{" "}
              RSD
            </Text>
            <Text style={styles.tdCentered}>{p.quantity}</Text>
            <Text style={styles.tdCentered}>
              {(
                p.product.price! *
                (1 - p.product.discount! / 100) *
                p.quantity
              ).toFixed(2)}{" "}
              RSD
            </Text>
          </View>
        ))}

        {/* TOTALS */}

        <View style={{ marginTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text style={styles.totalLabel}>Cena proizvoda:</Text>
            <Text style={styles.totalValue}>
              {priceOfProducts.toFixed(2)} RSD
            </Text>
          </View>
          {deliveryMethod === "delivery" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={styles.totalLabel}>Cena dostave:</Text>
              <Text style={styles.totalValue}>
                {deliveryPrice.toFixed(2)} RSD
              </Text>
            </View>
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.totalLabel}>Ukupan iznos:</Text>
            <Text style={styles.totalValue}>{totalPrice.toFixed(2)} RSD</Text>
          </View>
        </View>
      </Page>

      {/* FOOTER */}
      <Page style={styles.page}>
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text>Arona Zagorice 6, 21203 Veternik, Srbija</Text>
            <Text>021/649-69-40</Text>
            <Text>069/670-844</Text>
            <Text>info@glassmarket.rs</Text>
          </View>
          <View style={styles.footerRight}>
            <Text>PIB: 100463276</Text>
            <Text>MB: 08639337</Text>
            <Text>Ž.R.: 220-139879-77</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

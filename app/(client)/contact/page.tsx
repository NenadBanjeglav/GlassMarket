import ShiftingContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import { MapPin, Clock, Mail, Smartphone, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactPage = () => {
  return (
    <main>
      <div className="flex flex-col items-center bg-gray-100">
        <Container className="mt-3 w-full rounded-lg bg-white p-8 shadow-md">
          <ShiftingContactForm />
          <div className="flex flex-col justify-between gap-10 pb-10 md:flex-row">
            <address
              className="flex basis-1/2 flex-col justify-center gap-4 p-2
            "
            >
              <Link
                href="https://maps.app.goo.gl/VyVoVWDeH3gkdVds8"
                className="flex flex-col items-center gap-2 text-sm text-gray-500 md:flex-row md:text-base"
              >
                <MapPin className="text-red-700" /> Arona Zagorice 6, 21203
                Veternik, Srbija
              </Link>
              <p className="flex flex-col items-center gap-2 text-sm text-gray-500 md:flex-row md:text-base">
                <Clock className="text-red-700" /> Pon - Pet : 08.00 - 16.00
              </p>
              <Link
                className="flex flex-col items-center gap-2 text-sm text-gray-500 md:flex-row md:text-base"
                href="mailto:info@glassmarket.rs"
              >
                <Mail className="text-red-700 " />
                info@glassmarket.rs
              </Link>

              <Link
                className="flex flex-col items-center gap-2 text-sm text-gray-500 md:flex-row md:text-base"
                href="tel:069670844"
              >
                <Smartphone className="text-red-700" />
                069/ 67-08-44
              </Link>

              <Link
                className="flex flex-col items-center gap-2 text-sm text-gray-500 md:flex-row md:text-base"
                href="tel:0216496940"
              >
                <Phone className="text-red-700" />
                021/ 649-69-40
              </Link>
            </address>
            <div className="flex basis-1/2 flex-col items-center justify-center">
              <p className="flex flex-col items-center gap-2 text-sm text-gray-500 md:flex-row md:text-base">
                Skeniraj i pozovi
              </p>
              <Image
                src="/qrcontact.png"
                width={200}
                height={200}
                alt="QR Code for Phone Number"
              />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default ContactPage;

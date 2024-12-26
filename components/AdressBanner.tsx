import { MapPin, Clock, Mail, Smartphone, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import Container from "./Container";

const AdressBanner = () => {
  return (
    <address className="mx-auto hidden bg-red-700 p-2 lg:block">
      <Container className="hidden max-w-7xl items-center justify-between text-xs text-white lg:flex">
        <div className="flex max-w-7xl items-center justify-center gap-4">
          <Link
            href="https://maps.app.goo.gl/VyVoVWDeH3gkdVds8"
            className="flex items-center gap-2"
          >
            <MapPin size={16} /> Arona Zagorice 6, 21203 Veternik, Srbija
          </Link>
          <p className="flex items-center gap-2">
            <Clock size={16} /> Pon - Pet : 08.00 - 16.00
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            className="flex items-center gap-2"
            href="mailto:info@glassmarket.rs"
          >
            <Mail size={16} />
            info@glassmarket.rs
          </Link>

          <Link className="flex items-center gap-2" href="tel:069670844">
            <Smartphone size={16} />
            069/ 67-08-44
          </Link>

          <Link className="flex items-center gap-2" href="tel:0216496940">
            <Phone size={16} />
            021/ 649-69-40
          </Link>
        </div>
      </Container>
    </address>
  );
};

export default AdressBanner;

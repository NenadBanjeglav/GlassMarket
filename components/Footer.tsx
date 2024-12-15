import React from "react";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-lightBg text-sm">
      <Container className="flex items-center justify-center py-5">
        <p className="text-gray-500">
          Copyright © 2024 <span className="text-lightBlue">Glass</span>
          <span className="text-red-500">Market</span> all rights reserved{" "}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

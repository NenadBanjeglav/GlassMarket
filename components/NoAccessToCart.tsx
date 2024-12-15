import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccessToCart = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 py-12 md:py-32">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="logo"
              width={200}
              height={100}
              className="mb-4"
            />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Dobrodošli nazad!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Prijavite se da biste videli stavke u korpi i završili kupovinu! Ne
            propustite svoje omiljene proizvode!
          </p>
          <SignInButton mode="modal">
            <Button className="w-full" size="lg">
              Prijavite se
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-center text-sm text-muted-foreground">
            Nemate nalog?
          </p>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              Kreirajte nalog
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccessToCart;

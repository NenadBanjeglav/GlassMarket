import Image from "next/image";
import React from "react";
import Container from "./Container";

import Link from "next/link";
import CartIcon from "./CartIcon";
import { Package, User } from "lucide-react";

import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getUserOrders } from "@/sanity/helpers";

const Header = async () => {
  const user = await currentUser();

  let orders;

  if (user?.id) {
    orders = await getUserOrders(user.id);
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-white py-4 shadow-md">
      <Container className="flex items-center justify-between gap-5">
        <Link href="/">
          <Image src="/logo.jpg" alt="logo" width={70} height={40} priority />
        </Link>
        {/* <Search /> */}
        <div className="flex items-center gap-5">
          <CartIcon />
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="hoverEffect relative  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs shadow-md hover:shadow-none md:gap-2 md:text-sm"
              >
                <Package className=" size-6 text-darkBlue" />
                <span className="hidden text-base font-semibold md:inline-block">
                  Porudžbine
                </span>
                <div className="absolute right-[-10px] top-[-10px] z-10 flex size-5 items-center justify-center rounded-full bg-red-500">
                  <span className="text-[9px] font-bold text-white">
                    {orders && orders?.length > 0 ? orders?.length : 0}
                  </span>
                </div>
              </Link>
              <div className="hoverEffect  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 shadow-md hover:shadow-none">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="hoverEffect  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 shadow-md hover:shadow-none">
                <SignInButton mode="modal">
                  <div className="flex gap-1">
                    <User className=" size-6 text-darkBlue" />
                    <span className="hidden text-base font-semibold md:inline-block">
                      Prijavi se
                    </span>
                  </div>
                </SignInButton>
              </div>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;

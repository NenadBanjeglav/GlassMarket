"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Package, User, X } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Category, Order } from "@/sanity.types";
import {
  ClerkLoaded,
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import CartIcon from "./CartIcon";
import Container from "./Container";

export const RoundedDrawerNavExample = ({
  categories,
  orders,
}: {
  categories: Category[];
  orders?: Order[];
}) => {
  const categorySlugs = categories.reduce<{ title: string; href: string }[]>(
    (acc, cat) => {
      if (cat.title && cat.slug?.current) {
        acc.push({
          title: cat.title,
          href: `/categories/${cat.slug.current}`,
        });
      }
      return acc;
    },
    []
  );

  return (
    <header className="bg-white">
      <Container>
        <RoundedDrawerNav
          orders={orders}
          links={[
            {
              title: "Kategorije",
              sublinks: [
                { title: "Svi Proizvodi", href: "/store" },
                ...categorySlugs,
              ],
            },

            {
              title: "Podrška",
              sublinks: [
                {
                  title: "Kako naručiti",
                  href: "/how-to-order",
                },
                {
                  title: "Način plaćanja",
                  href: "/payment-options",
                },
                {
                  title: "Reklamacije",
                  href: "/returns",
                },
                {
                  title: "Način i cena dostave",
                  href: "/shipping",
                },
              ],
            },
            {
              title: "Kompanija",
              sublinks: [
                {
                  title: "O nama",
                  href: "/about",
                },
                {
                  title: "Kontakt",
                  href: "/contact",
                },
              ],
            },
          ]}
          navBackground="bg-white"
          bodyBackground="bg-white"
        ></RoundedDrawerNav>
      </Container>
    </header>
  );
};

type LinkType = {
  title: string;
  sublinks: { title: string; href: string }[];
};

const RoundedDrawerNav = ({
  navBackground,
  links,
  orders,
}: {
  navBackground: string;
  bodyBackground: string;
  children?: ReactNode;
  links: LinkType[];
  orders?: Order[];
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeSublinks = useMemo(() => {
    if (!hovered) return [];
    const link = links.find((l) => l.title === hovered);

    return link ? link.sublinks : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        className={`${navBackground}  py-4`}
      >
        <div className="flex items-start justify-between ">
          <div className="flex items-start">
            <Link href="/">
              <Image
                src="/logo.jpg"
                alt="logo"
                width={50}
                height={40}
                priority
              />
            </Link>
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
            />
          </div>
          <div className="ml-auto flex items-center gap-[10px]">
            <CartIcon />
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="hoverEffect relative  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs shadow-md hover:shadow-none md:gap-2 md:text-sm"
                >
                  <Package className=" size-[26px] text-darkBlue" />
                  <span className="hidden text-base font-semibold md:inline-block">
                    Porudžbine
                  </span>
                  <div className="absolute right-[-10px] top-[-10px] z-10 flex size-5 items-center justify-center rounded-full bg-red-500">
                    <span className="text-[9px] font-bold text-white">
                      {orders && orders?.length > 0 ? orders?.length : 0}
                    </span>
                  </div>
                </Link>
                <div className="hoverEffect flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 shadow-md hover:shadow-none">
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="hoverEffect  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 shadow-md hover:shadow-none">
                  <SignInButton mode="modal">
                    <div className="flex gap-1">
                      <User className=" size-[26px] text-darkBlue" />
                      <span className="hidden text-base font-semibold md:inline-block">
                        Prijavi se
                      </span>
                    </div>
                  </SignInButton>
                </div>
              </SignedOut>
            </ClerkLoaded>
            <button
              onClick={() => setMobileNavOpen((pv) => !pv)}
              className="hoverEffect mt-0.5  flex items-start justify-end rounded-md border border-gray-200 px-2 py-1 text-gray-600 shadow-md hover:shadow-none md:hidden"
            >
              {mobileNavOpen && <X className=" size-[26px] text-darkBlue" />}
              {!mobileNavOpen && (
                <Menu className=" size-[26px] text-darkBlue" />
              )}
            </button>
          </div>
        </div>
        <MobileLinks links={links} open={mobileNavOpen} />
      </nav>
    </>
  );
};

const DesktopLinks = ({
  links,
  setHovered,
  hovered,
  activeSublinks,
}: {
  links: LinkType[];
  setHovered: Dispatch<SetStateAction<string | null>>;
  hovered: string | null;
  activeSublinks: LinkType["sublinks"];
}) => {
  return (
    <div className="ml-9 mt-0.5 hidden text-gray-600 md:block">
      <div className="flex gap-6">
        {links.map((l) => (
          <TopLink key={l.title} setHovered={setHovered} title={l.title}>
            {l.title}
          </TopLink>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <a
                className="block text-2xl font-semibold text-gray-600 transition-colors hover:text-red-700"
                href={l.href}
                key={l.title}
              >
                {l.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLinks = ({ links, open }: { links: LinkType[]; open: boolean }) => {
  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            return (
              <div key={l.title} className="space-y-1.5">
                <span className=" block font-semibold text-gray-600">
                  {l.title}
                </span>
                {l.sublinks.map((sl) => (
                  <a
                    className=" block text-gray-600"
                    href={sl.href}
                    key={sl.title}
                  >
                    {sl.title}
                  </a>
                ))}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TopLink = ({
  children,
  setHovered,
  title,
}: {
  children: string;
  setHovered: Dispatch<SetStateAction<null | string>>;
  title: string;
}) => (
  <span
    onMouseEnter={() => setHovered(title)}
    className="cursor-pointer text-gray-600 transition-colors hover:text-red-700"
  >
    {children}
  </span>
);

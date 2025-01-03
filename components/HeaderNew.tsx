"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Category, Order } from "@/sanity.types";

import CartIcon from "./CartIcon";
import Container from "./Container";
import Search from "./Search";

export const RoundedDrawerNavExample = ({
  categories,
  orders,
  isAdminUser,
}: {
  categories: Category[];
  orders?: Order[];
  isAdminUser: boolean;
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
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container>
        <RoundedDrawerNav
          isAdminUser={isAdminUser}
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
            {
              title: "Admin",
              sublinks: [
                {
                  title: "Analitika",
                  href: "/admin",
                },
                {
                  title: "Studio",
                  href: "/studio",
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

  isAdminUser,
}: {
  navBackground: string;
  bodyBackground: string;
  children?: ReactNode;
  links: LinkType[];
  orders?: Order[];
  isAdminUser: boolean;
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
        className={`${navBackground}  py-4 `}
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
              isAdminUser={isAdminUser}
            />
          </div>
          <div className="ml-auto flex items-center gap-[10px]">
            <Search />
            <CartIcon />

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
        <MobileLinks
          links={links}
          open={mobileNavOpen}
          isAdminUser={isAdminUser}
        />
      </nav>
    </>
  );
};

const DesktopLinks = ({
  links,
  setHovered,
  hovered,
  activeSublinks,
  isAdminUser,
}: {
  links: LinkType[];
  setHovered: Dispatch<SetStateAction<string | null>>;
  hovered: string | null;
  activeSublinks: LinkType["sublinks"];
  isAdminUser: boolean;
}) => {
  return (
    <div className="ml-9 mt-0.5 hidden text-gray-600 md:block">
      <div className="flex gap-6">
        {links.map((l) => {
          if (l.title === "Admin" && !isAdminUser) return null;
          return (
            <TopLink key={l.title} setHovered={setHovered} title={l.title}>
              {l.title}
            </TopLink>
          );
        })}
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

const MobileLinks = ({
  links,
  open,
  isAdminUser,
}: {
  links: LinkType[];
  open: boolean;
  isAdminUser: boolean;
}) => {
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
            if (l.title === "Admin" && !isAdminUser) return null;
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

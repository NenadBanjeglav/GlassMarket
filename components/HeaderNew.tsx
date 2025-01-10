"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import {
  MAIN_CATEGORIES_QUERYResult,
  MY_ORDERS_QUERYResult,
} from "@/sanity.types";

import CartIcon from "./CartIcon";
import Container from "./Container";
import Search from "./Search";

export const RoundedDrawerNavExample = ({
  categories,
  orders,
  isAdminUser,
}: {
  categories: MAIN_CATEGORIES_QUERYResult;
  orders?: MY_ORDERS_QUERYResult;
  isAdminUser: boolean;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformCategories = (categories: any[]): MainLinkType[] => {
    return categories.map((category) => ({
      title: category.title,
      href: `/${category.slug.current}`,
      sublinks: category.subcategories?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sub: { title: any; slug: { current: any } }) => ({
          title: sub.title.split(" ").slice(1).join(" "),
          href: `/categories/${sub.slug.current}`,
        })
      ),
    }));
  };

  const transformedCategories = transformCategories(categories);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <Container>
        <RoundedDrawerNav
          isAdminUser={isAdminUser}
          orders={orders}
          links={[
            {
              title: "Kategorije",
              href: "#",
              sublinks: [
                { title: "Svi Proizvodi", href: "/store" },
                ...transformedCategories,
              ],
            },

            {
              title: "Podrška",
              href: "#",
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
              href: "#",
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
              href: "#",
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
        />
      </Container>
    </header>
  );
};

type MainLinkType = {
  title: string;
  href: string;
  sublinks?: MainLinkType[]; // Allow for nested sublinks of the same type
};

const RoundedDrawerNav = ({
  navBackground,
  links,
  isAdminUser,
}: {
  navBackground: string;
  bodyBackground: string;
  children?: ReactNode;
  links: MainLinkType[];
  orders?: MY_ORDERS_QUERYResult;
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
  links: MainLinkType[];
  setHovered: Dispatch<SetStateAction<string | null>>;
  hovered: string | null;
  activeSublinks: MainLinkType["sublinks"];
  isAdminUser: boolean;
}) => {
  const [expandedSublink, setExpandedSublink] = useState<string | null>(null);

  const toggleSublink = (title: string) => {
    // If the clicked sublink is already expanded, collapse it. Otherwise, expand it.
    setExpandedSublink((prev) => (prev === title ? null : title));
  };

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 py-6"
          >
            {activeSublinks!.map((l) => (
              <div key={l.title}>
                {l.sublinks && l.sublinks.length > 0 ? (
                  <>
                    {/* Parent Sublink */}
                    <div
                      className="flex cursor-pointer items-center justify-between text-2xl font-semibold text-gray-600 transition-colors hover:text-red-700"
                      onClick={() => toggleSublink(l.title)}
                    >
                      <span>{l.title}</span>
                      {expandedSublink === l.title ? (
                        <ChevronUp className="size-5" />
                      ) : (
                        <ChevronDown className="size-5" />
                      )}
                    </div>

                    {/* Child Sublinks */}
                    <AnimatePresence>
                      {expandedSublink === l.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className=" space-y-2 pl-4"
                        >
                          {l.sublinks.map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (child: any) => (
                              <Link
                                key={child.title}
                                className="block text-lg text-gray-500 transition-colors hover:text-red-500"
                                href={child.href}
                              >
                                {child.title}
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  // Show link if no sublinks
                  <Link
                    href={l.href}
                    className="block cursor-pointer text-2xl font-semibold text-gray-600 transition-colors hover:text-red-700"
                  >
                    {l.title}
                  </Link>
                )}
              </div>
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
  links: MainLinkType[];
  open: boolean;
  isAdminUser: boolean;
}) => {
  const [expandedChildLink, setExpandedChildLink] = useState<string | null>(
    null
  );

  const toggleChildLink = (title: string) => {
    setExpandedChildLink((prev) => (prev === title ? null : title));
  };

  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            // Skip Admin link if user is not admin
            if (l.title === "Admin" && !isAdminUser) return null;

            return (
              <div key={l.title} className="space-y-1.5">
                {/* Parent Link */}
                <div>
                  <span className="block font-semibold text-gray-600">
                    {l.title}
                  </span>

                  <div className="space-y-1.5">
                    {l.sublinks?.map((sl) => (
                      <div key={sl.title} className="space-y-1">
                        {sl.sublinks && sl.sublinks.length > 0 ? (
                          <>
                            <div
                              className="flex cursor-pointer items-center justify-between text-gray-600"
                              onClick={() => toggleChildLink(sl.title)}
                            >
                              <span>{sl.title}</span>
                              {sl.sublinks?.length > 0 ? (
                                expandedChildLink === sl.title ? (
                                  <ChevronUp className="size-5" />
                                ) : (
                                  <ChevronDown className="size-5" />
                                )
                              ) : null}
                            </div>
                            <AnimatePresence>
                              {expandedChildLink === sl.title &&
                                sl.sublinks?.length > 0 && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-1 pl-4"
                                  >
                                    {sl.sublinks.map((child) => (
                                      <Link
                                        key={child.title}
                                        className="block text-gray-500"
                                        href={child.href}
                                      >
                                        {child.title}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link className="text-gray-600" href={sl.href}>
                            {sl.title}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileLinks;

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

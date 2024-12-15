"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { UserResource } from "@clerk/types";
import { Separator } from "./ui/separator";
import userCartStore, { CartItem } from "@/store";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/sanity/helpers";
import PriceFormatter from "./PriceFormatter";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street name and number is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  companyName: z.string().optional(),
  pib: z.string().optional(),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val, {
    message: "You must accept the rules and conditions",
  }),
});

interface Props {
  user: UserResource;
  orderItems: CartItem[];
}

const OrderForm = ({ user, orderItems }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { firstName, lastName, emailAddresses } = user;
  const { getItemCount, getSubtotalPrice, getTotalPrice } = userCartStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: firstName || "",
      lastname: lastName || "",
      email: emailAddresses[0].toString() || "",
      phone: "",
      city: "",
      street: "",
      postalCode: "",
      companyName: "",
      pib: "",
      message: "",
      acceptTerms: false,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);

    const orderNumber = crypto.randomUUID();
    const totalPrice = getTotalPrice();
    const discountedPrice = getSubtotalPrice();
    const amountDiscount = discountedPrice - totalPrice;

    const orderData = {
      _type: "order",
      orderNumber,
      clerkUserId: user.id,
      customerName: `${data.name} ${data.lastname}`,
      email: data.email,
      phone: data.phone,
      city: data.city,
      street: data.street,
      postalCode: data.postalCode,
      companyName: data.companyName,
      pib: data.pib,
      message: data.message,
      total: totalPrice,
      products: orderItems.map(({ product }) => ({
        _key: product._id,
        product: {
          _type: "reference",
          _ref: product._id,
        },
        quantity: getItemCount(product._id),
      })),
      discountedPrice,
      amountDiscount,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    try {
      const result = await createOrder(orderData);

      if (result.success) {
        toast.success("Porudžbina je uspešno kreirana!");
        router.push(`/success?orderNumber=${orderNumber}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Neuspešno kreiranje porudžbine:", error);
      toast.error("Neuspešno kreiranje porudžbine. Molimo pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">
                  Ime <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input id="name" placeholder="Unesite vaše ime" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="lastname">
                  Prezime <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="lastname"
                    placeholder="Unesite vaše prezime"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">
                  Email adresa <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Unesite vašu email adresu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="phone">
                  Kontakt telefon <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="phone"
                    placeholder="Unesite vaš broj telefona"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="city">
                  Grad <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input id="city" placeholder="Unesite vaš grad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="street">
                  Ulica i broj <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="street"
                    placeholder="Unesite naziv ulice i broj"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="postalCode">
                  Poštanski broj <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="postalCode"
                    placeholder="Unesite vaš poštanski broj"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="companyName">Ime kompanije (opciono)</Label>
              <FormControl>
                <Input
                  id="companyName"
                  placeholder="Unesite ime vaše kompanije"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pib"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="pib">PIB (opciono)</Label>
              <FormControl>
                <Input id="pib" placeholder="Unesite PIB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="message">Poruka (opciono)</Label>
              <FormControl>
                <Textarea
                  id="message"
                  placeholder="Unesite vašu poruku"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="acceptTerms">
                    Prihvatam uslove naručivanja
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <h2 className=" text-lg font-semibold">Vaša porudžbina</h2>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-5 rounded-t-lg border bg-white p-2.5 text-base font-semibold md:grid-cols-6">
            <h2 className="col-span-2 md:col-span-3">Proizvod</h2>
            <h2>Cena</h2>
            <h2 className="text-right">Količina</h2>
            <h2 className="text-right">Ukupno</h2>
          </div>
          <div className="rounded-b-lg border border-t-0 bg-white">
            {orderItems.map(({ product }) => {
              const itemCount = getItemCount(product._id);
              return (
                <div
                  key={product._id}
                  className="grid grid-cols-5 border-b p-2.5 last:border-b-0 md:grid-cols-6"
                >
                  <div className="col-span-2 flex items-center md:col-span-3">
                    {product.image && (
                      <div className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1">
                        <Image
                          src={urlFor(product.image).url()}
                          alt="slika proizvoda"
                          width={300}
                          height={300}
                          className="hoverEffect size-10 overflow-hidden object-cover group-hover:scale-105 md:h-14 md:w-full"
                        />
                      </div>
                    )}
                    <h2 className="text-sm">{product.name}</h2>
                  </div>
                  <div className="flex items-center">
                    <PriceFormatter amount={product.price} />
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold text-darkText">
                      {itemCount}
                    </p>
                  </div>
                  <div className="flex items-center justify-end">
                    <PriceFormatter
                      amount={product.price ? product.price * itemCount : 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 w-full rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Rezime porudžbine</h2>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <span>Cena</span>
                <PriceFormatter amount={getTotalPrice()} />
              </div>

              <div className="flex place-items-center justify-between">
                <span>Popust</span>
                <PriceFormatter amount={getSubtotalPrice() - getTotalPrice()} />
              </div>
              <Separator />
              <div className="flex place-items-center justify-between">
                <span>Ukupno</span>
                <PriceFormatter amount={getSubtotalPrice()} />
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Obrada..." : "Poruči"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;

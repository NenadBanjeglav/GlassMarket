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
import { useForm, useWatch } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Loader } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street name and number is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  deliveryMethod: z.enum(["store", "delivery"]).default("store"),
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
  const {
    getItemCount,
    getSubtotalPrice,
    getTotalPrice,
    getTotalWeight,
    getDeliveryPrice,
  } = userCartStore();

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
      deliveryMethod: "store",
      companyName: "",
      pib: "",
      message: "",
      acceptTerms: false,
    },
  });

  const deliveryMethod = useWatch({
    control: form.control,
    name: "deliveryMethod",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);

    const orderNumber = crypto.randomUUID();
    const totalPrice = getTotalPrice();
    const deliveryPrice =
      data.deliveryMethod === "delivery" ? getDeliveryPrice() : 0;
    const discountedPrice = getSubtotalPrice().finalPrice + deliveryPrice;
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
      deliveryMethod: data.deliveryMethod,
    };

    try {
      const result = await createOrder(orderData);

      if (result.success) {
        toast.success("Porudžbina je uspešno kreirana!");
        router.push(
          `/success?orderNumber=${orderNumber}&deliveryMethod=${deliveryMethod}`
        );
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
                    Prihvatam uslove naručivanja{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryMethod"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="deliveryMethod">
                Način dostave <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="store" id="store" />
                    <Label htmlFor="store">Preuzimanje u prodavnici</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Dostava kurirskom službom</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <h2 className=" text-lg font-semibold">Vaša porudžbina</h2>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-4 rounded-t-lg border bg-white p-2.5 text-base font-semibold md:grid-cols-6">
            <h2 className="col-span-1 md:col-span-3">Proizvod</h2>
            <h2 className=" text-center md:text-left">Cena</h2>
            <h2 className="text-center ">Kol.</h2>
            <h2 className=" text-center">Ukupno</h2>
          </div>
          <div className="rounded-b-lg border border-t-0 bg-white">
            {orderItems.map(({ product }) => {
              const itemCount = getItemCount(product._id);
              const { discount, price } = product;
              const discountedPrice =
                discount && discount > 0
                  ? price! - (discount * price!) / 100
                  : price;
              return (
                <div
                  key={product._id}
                  className="grid grid-cols-4 border-b p-2.5 last:border-b-0 md:grid-cols-6"
                >
                  <div className="col-span-1 flex items-center md:col-span-3">
                    {product.image && (
                      <div className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1">
                        <Image
                          src={urlFor(product.image).url()}
                          alt="product image"
                          width={300}
                          height={300}
                          className="hoverEffect inline-block size-10 overflow-hidden object-cover group-hover:scale-105 md:h-14 md:w-full"
                        />
                      </div>
                    )}
                    <h2 className="hidden text-sm md:inline-block">
                      {product.name}
                    </h2>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    {discount! > 0 && (
                      <PriceFormatter
                        amount={price}
                        className="truncate text-[8px] line-through"
                      />
                    )}
                    <PriceFormatter
                      amount={discountedPrice}
                      className="truncate text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold text-darkText">
                      {itemCount}
                    </p>
                  </div>
                  <div className="flex items-center justify-end md:justify-center">
                    <PriceFormatter
                      className="truncate text-xs"
                      amount={discountedPrice ? discountedPrice * itemCount : 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 w-full rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Rezime porudžbine</h2>

            <div className="w-full space-y-2">
              <div className="flex place-items-center justify-between">
                <span>Ukupna Težina:</span>
                <span className="text-sm font-semibold text-darkText">
                  {getTotalWeight() / 1000} kg
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cena Robe</span>
                <PriceFormatter amount={getTotalPrice()} />
              </div>

              <div className="flex place-items-center justify-between">
                <span>Akcijski Popust:</span>
                <PriceFormatter
                  amount={getSubtotalPrice().subtotal - getTotalPrice()}
                />
              </div>

              <div className="flex place-items-center justify-between">
                <span>Količinski Popust:</span>
                <span className="text-sm font-semibold text-darkText">
                  -
                  <PriceFormatter
                    amount={getSubtotalPrice().additionalDiscount}
                  />
                </span>
              </div>
              {deliveryMethod === "delivery" && (
                <>
                  <div className="flex place-items-center justify-between">
                    <span>Dostava:</span>
                    <span className="text-sm font-semibold text-darkText">
                      + <PriceFormatter amount={getDeliveryPrice()} />
                    </span>
                  </div>

                  <Separator />

                  <div className="flex place-items-center justify-between">
                    <span>Ukupno</span>
                    <PriceFormatter
                      amount={
                        getSubtotalPrice().finalPrice + getDeliveryPrice()
                      }
                    />
                  </div>
                </>
              )}
              {deliveryMethod !== "delivery" && (
                <>
                  <Separator />
                  <div className="flex place-items-center justify-between">
                    <span>Ukupno</span>
                    <PriceFormatter amount={getSubtotalPrice().finalPrice} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-20">
          {loading ? <Loader className="animate-spin" /> : "Poruči"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;

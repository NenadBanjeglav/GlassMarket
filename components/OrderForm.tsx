"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import userCartStore, { CartItem } from "@/store";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder, createOrUpdateUser } from "@/sanity/helpers";
import PriceFormatter from "./PriceFormatter";
import { useForm, useWatch } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { pdf } from "@react-pdf/renderer";
import { InvoiceDocument } from "./InvoiceDocument";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateAndDownloadPDF(orderData: any) {
  // 1) Generate PDF blob from your InvoiceDocument
  const blob = await pdf(<InvoiceDocument orderData={orderData} />).toBlob();

  // 2) Create a URL from the blob
  const url = URL.createObjectURL(blob);

  // 3) Create a temporary link element
  const link = document.createElement("a");
  link.href = url;
  link.download = `Porudzbenica_${orderData.orderNumber}.pdf`;

  // 4) Append to the DOM, trigger click, and remove
  document.body.appendChild(link);
  link.click();
  link.remove();

  // 5) Release the object URL
  URL.revokeObjectURL(url);
}

const formSchema = z.object({
  name: z.string().min(1, "Ime je obavezno"),
  lastname: z.string().min(1, "Prezime je obavezno"),
  email: z.string().email("Neispravna email adresa"),
  phone: z.string().min(1, "Broj telefona je obavezan"),
  city: z.string().min(1, "Grad je obavezan"),
  street: z.string().min(1, "Ulica i broj su obavezni"),
  postalCode: z.string().min(1, "Poštanski broj je obavezan"),
  deliveryMethod: z.enum(["store", "delivery"]).default("store"),
  paymentMethod: z
    .enum(["bankTransfer", "cashOnDelivery"])
    .default("bankTransfer"),
  companyName: z.string().optional(),
  pib: z.string().optional(),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val, {
    message: "Morate prihvatiti pravila i uslove",
  }),
});

interface Props {
  orderItems: CartItem[];
}

export type FormSchemaType = z.infer<typeof formSchema>;

const OrderForm = ({ orderItems }: Props) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    getItemCount,
    getSubtotalPrice,
    getTotalPrice,
    getTotalWeight,
    getDeliveryPrice,
  } = userCartStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      city: "",
      street: "",
      postalCode: "",
      deliveryMethod: "store",
      paymentMethod: "bankTransfer",
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

  const paymentMethod = useWatch({
    control: form.control,
    name: "paymentMethod",
  });

  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true);

    const orderNumber = crypto.randomUUID();
    const priceOfProducts = getSubtotalPrice().subtotal;
    const deliveryPrice =
      data.deliveryMethod === "delivery" ? getDeliveryPrice() : 0;

    const orderData = {
      _type: "order",
      orderNumber,
      clerkUserId: user?.id || "",
      customerName: `${data.name} ${data.lastname}`,
      email: data.email,
      phone: data.phone,
      city: data.city,
      street: data.street,
      postalCode: data.postalCode,
      paymentMethod: data.paymentMethod,
      deliveryMethod: data.deliveryMethod,
      companyName: data.companyName,
      pib: data.pib,
      message: data.message,
      priceOfProducts: priceOfProducts,
      deliveryPrice: deliveryPrice,
      totalPrice: priceOfProducts + deliveryPrice,
      products: orderItems.map(({ product }) => ({
        _key: product._id,
        product: {
          _type: "reference",
          _ref: product._id,
        },
        quantity: getItemCount(product._id),
      })),
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    const orderDataForPdf = {
      ...orderData,
      products: orderItems.map(({ product }) => ({
        _key: product._id,
        quantity: getItemCount(product._id),
        product: {
          _type: "product",
          _id: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount ?? 0,
          weight: product.weight,
          image: product.image,
        },
      })),
    };

    try {
      const result = await createOrder(orderData);

      if (!result.success) {
        throw new Error(result.error);
      }

      if (result.success) {
        const newUser = {
          name: `${data.name} ${data.lastname}`,
          email: data.email,
          phone: data.phone,
          address: {
            city: data.city,
            street: data.street,
            postalCode: data.postalCode,
          },
          companyName: data.companyName,
          pib: data.pib,
        };

        await createOrUpdateUser(
          newUser,
          result.newOrder!._id,
          orderData.orderNumber
        );

        toast.success("Porudžbina je uspešno kreirana!");

        router.push(
          `/success?orderNumber=${orderNumber.slice(-5)}&deliveryMethod=${deliveryMethod}&paymentMethod=${paymentMethod}`
        );
        await generateAndDownloadPDF(orderDataForPdf);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <Label htmlFor="message">Napomena (opciono)</Label>
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
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="paymentMethod">
                  Način plaćanja <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                      <Label htmlFor="bankTransfer">
                        Direktna bankovna transakcija
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="cashOnDelivery"
                        id="cashOnDelivery"
                      />
                      <Label htmlFor="cashOnDelivery">
                        Plaćanje prilikom preuzimanja
                      </Label>
                    </div>
                  </RadioGroup>
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
                      <Label htmlFor="delivery">
                        Dostava kurirskom službom
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="grid md:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-4 rounded-t-lg border bg-white p-2.5 text-base font-semibold md:grid-cols-6">
              <h2 className="col-span-1 md:col-span-3 md:ml-6">Proizvod</h2>
              <h2 className=" text-center ">Cena</h2>
              <h2 className=" text-center ">Kol.</h2>
              <h2 className=" text-right md:text-center">Ukupno</h2>
            </div>

            <div className="rounded-b-lg border border-t-0 bg-white">
              {orderItems.map(({ product }) => {
                const itemCount = getItemCount(product._id);
                const { discount, price } = product;
                const priceOfProduct = price! * (1 - (discount || 0) / 100);

                return (
                  <div
                    key={product._id}
                    className="grid grid-cols-4 border-b p-2.5 last:border-b-0 md:grid-cols-6"
                  >
                    <div className="col-span-1 flex items-center md:col-span-3">
                      {product.image && (
                        <Link
                          href={`/product/${product.slug?.current}`}
                          className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1"
                        >
                          <Image
                            src={urlFor(product.image).url()}
                            alt="product image"
                            width={300}
                            height={300}
                            className="hoverEffect inline-block size-10 overflow-hidden object-cover group-hover:scale-105 md:h-14 md:w-full"
                          />
                        </Link>
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
                        amount={priceOfProduct}
                        className="truncate text-xs"
                      />
                    </div>
                    <div className="mx-auto flex items-center pb-1 text-xs font-semibold text-darkText">
                      {getItemCount(product._id)}
                    </div>

                    <div className="flex items-center justify-end md:justify-center">
                      <PriceFormatter
                        className="truncate text-xs"
                        amount={priceOfProduct * itemCount}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-1">
            <div className="mt-4 w-full rounded-lg border bg-white p-6 md:mt-0">
              <h2 className="mb-4 text-xl font-semibold">Pregled porudžbine</h2>
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <span>Cena Robe:</span>
                  <PriceFormatter amount={getTotalPrice()} />
                </div>

                {getSubtotalPrice().subtotal < getTotalPrice() && (
                  <div className="flex place-items-center justify-between">
                    <span>Akcijski Popust:</span>
                    <PriceFormatter
                      amount={getSubtotalPrice().subtotal - getTotalPrice()}
                    />
                  </div>
                )}

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
                          getSubtotalPrice().subtotal + getDeliveryPrice()
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
                      <PriceFormatter amount={getSubtotalPrice().subtotal} />
                    </div>
                  </>
                )}
                <div className="flex place-items-center justify-between">
                  <span>Težina:</span>
                  <span className="text-sm font-semibold text-darkText">
                    {(getTotalWeight() / 1000).toFixed(2)} kg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center gap-4 pb-12">
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
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:w-56"
          >
            {loading ? <Loader className="animate-spin" /> : "Poruči"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderForm;

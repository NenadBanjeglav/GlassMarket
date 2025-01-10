"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader } from "lucide-react";
import { z } from "zod";
import { sendContactFormEmail } from "@/lib/actions";
import { useState } from "react";

const contactSchema = z
  .object({
    selected: z
      .enum(["company", "individual"], {
        required_error: "Molimo izaberite opciju.",
      })
      .default("company"),
    name: z
      .string()
      .min(1, { message: "Ime je obavezno." })
      .max(100, { message: "Ime mora imati najviše 100 karaktera." }),
    phone: z
      .string()
      .min(10, { message: "Broj telefona mora imati najmanje 10 cifara." })
      .regex(/^\+?[0-9\s]+$/, {
        message:
          "Broj telefona može sadržati samo brojeve i razmake, i može počinjati sa +.",
      }),
    email: z
      .string()
      .email({ message: "Molimo unesite validnu email adresu." }),
    companyName: z.string().optional(),
    message: z
      .string()
      .min(10, { message: "Poruka mora imati najmanje 10 karaktera." })
      .max(1000, { message: "Poruka mora imati najviše 1000 karaktera." }),
  })
  .refine(
    (data) =>
      data.selected !== "company" ||
      (data.companyName && data.companyName.trim() !== ""),
    {
      message: "Naziv kompanije je obavezan ako predstavljate kompaniju.",
      path: ["companyName"], // Highlight the `companyName` field
    }
  );

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      selected: "company",
      name: "",
      phone: "",
      email: "",
      companyName: "",
      message: "",
    },
  });

  const { watch, setValue, handleSubmit } = form;

  const selected = watch("selected");

  const onSubmit = async (data: ContactFormData) => {
    try {
      setisLoading(true);
      const response = await sendContactFormEmail(data);

      if (response.success) {
        console.log("Email sent successfully.");
        form.reset();
      }
    } catch (error) {
      console.error("Error sending contact form email:", error);
    } finally {
      setisLoading(false);
      form.reset();
    }
  };

  return (
    <section id="contact" className="bg-blue-50">
      <div className="mx-auto flex max-w-7xl flex-col-reverse overflow-hidden rounded-lg shadow-lg md:my-12 lg:flex-row">
        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="duration-[750ms] flex w-full flex-col gap-2 bg-darkBlue p-8 text-blue-100 transition-colors"
          >
            <h3 className=" mb-6 text-4xl font-bold">Kontaktirajte nas</h3>

            {/* Name Field */}
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-2xl text-blue-100">
                    Zdravo 👋! Moje ime je...
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="!duration-[750ms] !w-full !rounded-md !bg-lightBlue !p-2 !placeholder-white/70 !transition-colors"
                      placeholder="Vaše ime..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-2xl text-blue-100">
                    Moj broj telefona je...
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="!duration-[750ms] !w-full !rounded-md !bg-lightBlue !p-2 !placeholder-white/70 !transition-colors"
                      placeholder="Vaš broj telefona..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-2xl text-blue-100">
                    Moja e-pošta je...
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="!duration-[750ms] !w-full !rounded-md bg-lightBlue !p-2 !placeholder-white/70 !transition-colors"
                      placeholder="Vaša e-pošta..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company/Individual Toggle */}
            <div className="mb-6">
              <p className="mb-2 text-2xl text-blue-100">I predstavljam...</p>
              <div className="w-fit overflow-hidden rounded-lg border border-blue-100 font-medium">
                <button
                  type="button"
                  className={`${
                    selected === "company" ? "text-lightBlue" : "text-blue-100"
                  } duration-[750ms] relative px-3 py-1.5 text-sm transition-colors`}
                  onClick={() => setValue("selected", "company")}
                >
                  <span className="relative z-10">Kompaniju</span>
                  {selected === "company" && (
                    <motion.div
                      transition={BASE_TRANSITION}
                      layoutId="form-tab"
                      className="absolute inset-0 z-0 bg-white"
                    />
                  )}
                </button>
                <button
                  type="button"
                  className={`${
                    selected === "individual"
                      ? "text-lightBlue"
                      : "text-blue-100"
                  } duration-[750ms] relative px-3 py-1.5 text-sm transition-colors`}
                  onClick={() => setValue("selected", "individual")}
                >
                  <span className="relative z-10">Fizičko lice</span>
                  {selected === "individual" && (
                    <motion.div
                      transition={BASE_TRANSITION}
                      layoutId="form-tab"
                      className="absolute inset-0 z-0 bg-white"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Company Name Field */}
            <AnimatePresence>
              {selected === "company" && (
                <motion.div
                  initial={{
                    marginTop: -104,
                    opacity: 0,
                  }}
                  animate={{
                    marginTop: 0,
                    opacity: 1,
                  }}
                  exit={{
                    marginTop: -104,
                    opacity: 0,
                  }}
                  transition={BASE_TRANSITION}
                  className="mb-6"
                >
                  <FormField
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 text-2xl text-blue-100">
                          Pod imenom...
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="!duration-[750ms] !w-full !rounded-md bg-lightBlue !p-2 !placeholder-white/70 !transition-colors"
                            placeholder="Ime vaše kompanije..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Field */}
            <FormField
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-2xl text-blue-100">
                    Interesuje me...
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="!duration-[750ms] !w-full !rounded-md !bg-lightBlue !p-2 !placeholder-white/70 !transition-colors"
                      placeholder="Slobodno nam postavite pitanje :)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-6 rounded-lg bg-blue-100 px-8 py-3 text-lg font-semibold !text-lightBlue hover:bg-blue-50"
            >
              {isLoading ? <Loader className="animate-spin" /> : "Pošalji"}
            </Button>
          </form>
        </Form>

        {/* Images */}
        <div className="relative min-h-[100px] w-full overflow-hidden bg-white">
          <motion.div
            initial={false}
            animate={{
              x: selected === "individual" ? "0%" : "100%",
            }}
            transition={BASE_TRANSITION}
            className="absolute inset-0 bg-slate-200"
            style={{
              backgroundImage: "url(individual.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <motion.div
            initial={false}
            animate={{
              x: selected === "company" ? "0%" : "-100%",
            }}
            transition={BASE_TRANSITION}
            className="absolute inset-0 bg-slate-200"
            style={{
              backgroundImage: "url(company.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;

const BASE_TRANSITION = { ease: "anticipate", duration: 0.75 };

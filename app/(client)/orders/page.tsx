import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserOrders } from "@/sanity/helpers";
import { auth } from "@clerk/nextjs/server";
import { FileX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getUserOrders(userId!);

  return (
    <div>
      <Container className="py-10">
        {orders.length ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Lista narudžbina</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">
                        Broj narudžbine
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Datum
                      </TableHead>
                      <TableHead>Kupac</TableHead>
                      <TableHead className="w-[100px] md:w-auto">
                        Email
                      </TableHead>
                      <TableHead>Ukupno</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex h-screen flex-col items-center justify-center px-4 py-12 md:px-6">
            <FileX className="mb-4 size-24 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-900">
              Nema pronađenih narudžbina.
            </h3>
            <p className="mt-2 max-w-md text-center text-sm text-gray-600">
              Izgleda da još niste napravili nijednu narudžbinu. Počnite sa
              kupovinom kako biste videli vaše narudžbine ovde!
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Pregledajte proizvode</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;

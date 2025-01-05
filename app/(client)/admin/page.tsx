import React from "react";

import { getAllOrders, getAllUsers, getOrderSummary } from "@/sanity/helpers";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Barcode, CreditCard, User } from "lucide-react";
import PriceFormatter from "@/components/PriceFormatter";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Charts } from "@/components/Charts";
import OrdersComponent from "@/components/OrdersComponent";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import UsersComponent from "@/components/UsersComponent";

const AdminPage = async () => {
  const summary = await getOrderSummary();
  const allOrders = await getAllOrders();
  const allUsers = await getAllUsers();

  return (
    <main className=" overflow-x-hidden bg-white">
      <Container>
        <div className="pt-10">
          <h2 className="text-center text-2xl font-semibold uppercase text-gray-600">
            Admin <span className="text-lightBlue">Pregled</span>
          </h2>
          <p className="text-center text-gray-500"></p>
        </div>
        <div className="my-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ukupno Prihod
              </CardTitle>

              <Banknote />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <PriceFormatter
                  amount={summary.totalSales}
                  className="text-2xl font-bold text-black"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ukupno Porudzbina
              </CardTitle>

              <CreditCard />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Broj Kupaca</CardTitle>

              <User />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.userCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proizvoda</CardTitle>

              <Barcode />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.productCount}</div>
            </CardContent>
          </Card>
        </div>

        <Charts chartData={summary.salesData} />

        <Card className="my-10 max-h-96 w-full overflow-y-scroll">
          <CardHeader>
            <CardTitle>Porudzbine</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] md:w-auto">Broj</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Kupac</TableHead>
                    <TableHead className="w-[100px] md:w-auto">Email</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <OrdersComponent orders={allOrders} />
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="my-10 max-h-96 w-full overflow-y-scroll">
          <CardHeader>
            <CardTitle>Kupci</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] md:w-auto">Kupac</TableHead>
                    <TableHead className="w-[100px] md:w-auto">Email</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead className="w-[100px] md:w-auto">
                      Adresa
                    </TableHead>
                    <TableHead>Br.Porudzbina</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <UsersComponent users={allUsers} />
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
};

export default AdminPage;

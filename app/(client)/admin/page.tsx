import React from "react";

import { getOrderSummary } from "@/sanity/helpers";
import Container from "@/components/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Barcode, CreditCard, User } from "lucide-react";
import PriceFormatter from "@/components/PriceFormatter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderStatusSelect from "@/components/OrderStatusSelect";
import { Charts } from "@/components/Charts";

const AdminPage = async () => {
  const summary = await getOrderSummary();
  console.log(summary.salesData);

  return (
    <main className="h-screen bg-white">
      <Container>
        <div className="pt-10">
          <h2 className="text-center text-2xl font-semibold uppercase text-gray-600">
            Admin <span className="text-lightBlue">Pregled</span>
          </h2>
          <p className="text-center text-gray-500"></p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  className="text-2xl font-bold"
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
              <div className="text-2xl font-bold">{summary.ordersCount}</div>
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
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Charts chartData={summary.salesData} />
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Porudzbine poslenja tri dana:</CardTitle>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>KUPAC</TableHead>
                      <TableHead>DATUM</TableHead>
                      <TableHead>UKUPNO</TableHead>
                      <TableHead>STATUS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summary.recentOrders
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .map((order: any) => (
                        <TableRow key={order.orderNumber}>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>
                            {order._createdAt &&
                              new Date(order._createdAt).toLocaleDateString(
                                "sr-Latn",
                                {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric",
                                }
                              )}
                          </TableCell>
                          <TableCell>
                            <PriceFormatter amount={order.totalPrice} />
                          </TableCell>
                          <TableCell>
                            <OrderStatusSelect order={order} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </Container>
    </main>
  );
};

export default AdminPage;

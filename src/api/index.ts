import { SalesResponseSchema } from "../schemas";

export async function getSalesByDate(date: string) {
  const url = `${process.env.NEXT_PUBLIC_IMAGE_URL}/admin/sales/api?saleDate=${date}`;
  const req = await fetch(url);
  const json = await req.json();

  const sales = SalesResponseSchema.parse(json);

  return sales;
}

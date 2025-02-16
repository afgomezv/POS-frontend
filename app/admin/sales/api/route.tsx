import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const saleDate = searchParams.get("saleDate");

  const url = `${process.env.API_URL}/sales?saleDate=${saleDate}`;

  const req = await fetch(url);
  const response = await req.json();

  return Response.json(response);
}

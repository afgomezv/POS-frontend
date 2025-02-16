import { getSalesByDate } from "@/src/api";
import SaleFilter from "@/src/components/sales/SaleFilter";
import Heading from "@/src/components/ui/Heading";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { format } from "date-fns";

export default async function SalesPage() {
  const queryClient = new QueryClient();

  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });

  return (
    <>
      <Heading>Ventas</Heading>
      <p className="text-lg">
        En esta sección a podras visualizar las ventas, usa el calendario para
        filtrar por fechas
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SaleFilter />
      </HydrationBoundary>
    </>
  );
}

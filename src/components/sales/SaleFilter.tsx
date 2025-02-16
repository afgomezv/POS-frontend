"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import SaleSummary from "./SaleSummary";
import { formatCurrency } from "@/src/utils";
//import dynamic from "next/dynamic";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// const Calendar = dynamic(() => import("react-calendar"), {
//   ssr: false, // Ensure server-side rendering for dynamic imports
// });

const SaleFilter = () => {
  const [date, setDate] = useState<Value>(new Date());

  const formattedDate = format(date?.toString() || new Date(), "yyyy-MM-dd");
  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });

  const total = data?.reduce((total, sale) => total + +sale.total, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
      <div className="lg:sticky lg:top-10">
        <Calendar value={date} onChange={setDate} locale="es" />
      </div>
      <div>
        {isLoading && "Cargando..."}
        {data?.length ? (
          data.map((sale) => <SaleSummary key={sale.id} sale={sale} />)
        ) : (
          <p className="text-lg text-center">No hay ventas en esta fecha</p>
        )}

        <p className="my-5 text-lg font-bold text-right">
          Total del día: {""}
          <span className="font-normal">{formatCurrency(+total!)}</span>
        </p>
      </div>
    </div>
  );
};

export default SaleFilter;

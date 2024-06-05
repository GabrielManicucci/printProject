"use client";
import Image from "next/image";
import { useRef } from "react";
import { useReactToPrint, ReactToPrint } from "react-to-print";

import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from "react-thermal-printer";

export default function Home() {
  const componentToPrint = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentToPrint.current,
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-medium text-2xl">Impressão</h1>

      <button
        className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
        onClick={handlePrint}
      >
        Imprimir
      </button>
    </main>
  );
}

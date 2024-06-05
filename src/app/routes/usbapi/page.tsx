"use client";
import PrintButton from "@/app/components/printButton/printButton";
import Link from "next/link";
import React from "react";

export default function UsbApi() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1>Imprimir via USB Api</h1>
      <PrintButton />

      <Link
        className="mt-4 px-6 py-4 bg-stone-700 text-slate-100 rounded-md"
        href={"/"}
      >
        Ir para home
      </Link>
    </div>
  );
}

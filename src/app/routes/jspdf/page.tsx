"use client";
import React from "react";
import jsPDF from "jspdf";
import Link from "next/link";

export default function Jspdf() {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Conteúdo do PDF", 10, 10);
    doc.text("Isso será impresso como PDF.", 10, 20);

    doc.save("documento.pdf");
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1>Imprimir PDF sem Visualização</h1>
      <button
        className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
        onClick={generatePDF}
      >
        Imprimir PDF
      </button>
      <Link
        className="mt-4 px-6 py-4 bg-stone-700 text-slate-100 rounded-md"
        href={"/"}
      >
        Ir para home
      </Link>
    </div>
  );
}

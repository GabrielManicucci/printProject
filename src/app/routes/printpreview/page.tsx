"use client";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useReactToPrint, ReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import Link from "next/link";

export default function Main() {
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef(null);

  // We store the resolve Promise being used in `onBeforeGetContent` here
  const promiseResolveRef = useRef<(() => void) | null>(null);

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      console.log("ok");
    }
  }, [isPrinting]);

  const handlePrint = useReactToPrint({
    documentTitle: "Document for print",
    pageStyle: `
      @page {
        size: 5.08cm 7.26cm;
        margin: 0;
      }
      @media print {
        body {
        margin: 0;
        }
      }
  `,
    content: () => printRef.current,
    onBeforeGetContent: async () => {
      try {
        // const data: Uint8Array = await render(receipt);
        setIsPrinting(true);
      } catch (error) {
        console.log(error);
      }
    },
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div
        ref={printRef}
        className="flex flex-col items-center w-[76mm] h-[50mm] px-2 text-xs gap-3 py-4"
      >
        <div className="">
          <Barcode
            value="123456789012"
            format="CODE128"
            width={1.2}
            height={30}
            displayValue={true}
            fontOptions=""
            fontSize={12}
            margin={10}
            lineColor="black"
            renderer="svg"
          />
        </div>
      </div>

      <button
        className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
        onClick={handlePrint}
      >
        Imprimir!
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

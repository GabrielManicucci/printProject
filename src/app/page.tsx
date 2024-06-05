"use client";
import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useReactToPrint, ReactToPrint } from "react-to-print";
import Barcode from "react-barcode";

// import {
//   Br,
//   Cut,
//   Line,
//   Printer,
//   Text,
//   Row,
//   render,
//   Barcode,
// } from "react-thermal-printer";

export default function Main() {
  // const receipt = (
  //   <Printer
  //     className="w-[5cm]"
  //     type="epson"
  //     width={42}
  //     characterSet="pc860_portuguese"
  //   >
  //     <Text size={{ width: 2, height: 2 }}>Produto Teste</Text>
  //     <Text bold={true}>Produto</Text>
  //     <Br />
  //     <Line />
  //     <Row left="lore ipsum" right="863" />
  //     <Row left="lore ipsum" right="8,637" />
  //     <Line />
  //     <Row left="lore ipsum" right="11,000" />
  //     <Barcode type="UPC-A" content="111111111111" />
  //     <Barcode type="CODE39" content="A000$" />
  //     <Barcode align="center" type="UPC-A" content="111111111111" />
  //     <Text>Valor: R$ 1200</Text>
  //     <Row left="Status: ok" right="- 500" />
  //     <Br />
  //     <Line />
  //     <Br />
  //     <Text align="center">Wifi: some-wifi / PW: 123123</Text>
  //     <Cut />
  //   </Printer>
  // );

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
      {/* <div className="bg-stone-300 w-[5cm] h-[22.5cm]" ref={printRef}>
        {receipt}
      </div> */}
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
        {/* 
        <div className="flex gap-2 items-center flex-col">
          <h1 className="">Etiqueta vertical Teste</h1>
          <p>onteúdo teste</p>
        </div> */}
      </div>

      <button
        className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
        onClick={handlePrint}
      >
        Imprimir!
      </button>
    </div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
  Barcode,
} from "react-thermal-printer";

export default function Teste() {
  const receipt = (
    <Printer type="epson" width={42} characterSet="pc860_portuguese">
      <Text size={{ width: 2, height: 2 }}>Produto Teste</Text>
      <Text bold={true}>Produto</Text>
      <Br />
      <Line />
      <Row left="lore ipsum" right="863" />
      <Row left="lore ipsum" right="8,637" />
      <Line />
      <Row left="lore ipsum" right="11,000" />
      <Barcode type="UPC-A" content="111111111111" />
      <Barcode type="CODE39" content="A000$" />
      <Barcode align="center" type="UPC-A" content="111111111111" />
      <Text>Valor: R$ 1200</Text>
      <Row left="Status: ok" right="- 500" />
      <Br />
      <Line />
      <Br />
      <Text align="center">Wifi: some-wifi / PW: 123123</Text>
      <Cut />
    </Printer>
  );

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
    content: () => printRef.current,
    onBeforeGetContent: async () => {
      try {
        const data: Uint8Array = await render(receipt);
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
      <div className="bg-stone-300 p-7" ref={printRef}>
        {receipt}
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

"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
    <Printer type="epson" width={7} characterSet="korea">
      <Text size={{ width: 2, height: 2 }}>Produto Teste</Text>
      <Br />
      <Line />
      <Row left="lore ipsum" right="11,000" />
      <Text>Valor: R$ 1200</Text>
      <Text align="center">Wifi: some-wifi / PW: 123123</Text>
      <Cut />
    </Printer>
  );

  const handlePrint = async () => {
    const data: Uint8Array = await render(receipt);

    const port = await (navigator as any).serial.requestPort();
    await port.open({ baudRate: 9600 });

    const writer = port.writable?.getWriter();
    if (writer != null) {
      await writer.write(data);
      writer.releaseLock();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <>{receipt}</>

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

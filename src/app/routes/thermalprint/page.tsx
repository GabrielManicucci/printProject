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
    <Printer type="epson" characterSet="korea">
      <Text size={{ width: 2, height: 2 }}>Hello World!</Text>
      <Line />
      <Barcode type="CODE128" content="111111111111" />
      <Line />
      <Text align="center">-- Projeto de estudos de --</Text>
      <Text align="center">-- Gabriel Manicucci --</Text>
      <Cut />
    </Printer>
  );

  const handlePrint = async () => {
    const encoder = new TextEncoder();
    //     const text = encoder.encode(`^XA

    // ^FX Top section with logo, name and address.
    // ^CF0,60
    // ^FO50,50^GB100,100,100^FS
    // ^FO75,75^FR^GB100,100,100^FS
    // ^FO93,93^GB40,40,40^FS
    // ^FO220,50^FDIntershipping, Inc.^FS
    // ^CF0,30
    // ^FO220,115^FD1000 Shipping Lane^FS
    // ^FO220,155^FDShelbyville TN 38102^FS
    // ^FO220,195^FDUnited States (USA)^FS
    // ^FO50,250^GB700,3,3^FS

    // ^FX Second section with recipient address and permit information.
    // ^CFA,30
    // ^FO50,300^FDJohn Doe^FS
    // ^FO50,340^FD100 Main Street^FS
    // ^FO50,380^FDSpringfield TN 39021^FS
    // ^FO50,420^FDUnited States (USA)^FS
    // ^CFA,15
    // ^FO600,300^GB150,150,3^FS
    // ^FO638,340^FDPermit^FS
    // ^FO638,390^FD123456^FS
    // ^FO50,500^GB700,3,3^FS

    // ^FX Third section with bar code.
    // ^BY5,2,270
    // ^FO100,550^BC^FD12345678^FS

    // ^FX Fourth section (the two boxes on the bottom).
    // ^FO50,900^GB700,250,3^FS
    // ^FO400,900^GB3,250,3^FS
    // ^CF0,40
    // ^FO100,960^FDCtr. X34B-1^FS
    // ^FO100,1010^FDREF1 F00B47^FS
    // ^FO100,1060^FDREF2 BL4H8^FS
    // ^CF0,190
    // ^FO470,955^FDCA^FS

    // ^XZ`);
    const data: Uint8Array = await render(receipt);
    // const data = new Uint8Array([
    //   0x1b,
    //   0x40, // Inicializar a impressora (ESC @)
    //   0x1b,
    //   0x61,
    //   0x01, // Centralizar texto (ESC a 1)
    //   ...Array.from(text), // Texto a ser impresso
    //   0x0a, // Nova linha
    //   0x1b,
    //   0x64,
    //   0x02, // Pular 2 linhas (ESC d 2)
    //   0x1d,
    //   0x56,
    //   0x41,
    //   0x03, // Cortar papel (GS V A 3)
    // ])

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

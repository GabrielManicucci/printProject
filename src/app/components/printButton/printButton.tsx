"use client";
import React from "react";

class PrintButton extends React.Component {
  handlePrint = async () => {
    try {
      const connectedDevices = await (navigator as any).usb.getDevices();
      console.log("Dispositivos conectados:", connectedDevices);
      // Solicitar ao usuário que selecione um dispositivo USB.
      const device = await (navigator as any).usb
        .requestDevice({
          filters: [],
        })
        .then((usbDevice: any) => {
          console.log(`Product name: ${usbDevice.productName}`);
        })
        .catch((e: any) => {
          console.error(`There is no device. ${e}`);
        });

      if (!device) {
        console.error("Nenhum dispositivo selecionado");
        return;
      }

      console.log("Dispositivo selecionado:", device);

      // Conectar ao dispositivo.
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);

      // Obter o vendorId e productId do dispositivo selecionado.
      const vendorId = device.vendorId;
      const productId = device.productId;

      console.log(`Vendor ID: ${vendorId}, Product ID: ${productId}`);

      // Exemplo de comando de impressão para uma impressora térmica (ajuste conforme necessário).
      const data = new Uint8Array([
        0x1b,
        0x40, // Inicializar a impressora
        0x1b,
        0x61,
        0x01, // Centralizar texto
        0x48,
        0x65,
        0x6c,
        0x6c,
        0x6f, // "Hello"
        0x0a, // Nova linha
        0x1b,
        0x64,
        0x02, // Pular 2 linhas
        0x1d,
        0x56,
        0x41,
        0x03, // Cortar papel
      ]);

      // Enviar dados para a impressora.
      await device.transferOut(1, data);

      console.log("Impressão enviada com sucesso.");
    } catch (error) {
      console.error("Erro ao enviar impressão:", error);
    }
  };

  render() {
    return (
      <button
        className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
        onClick={this.handlePrint}
      >
        Imprimir
      </button>
    );
  }
}

export default PrintButton;

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-lg font-semibold">
        Diferentes formas descobertas de impressão
      </h1>

      <div className="flex flex-col gap-1 items-center mt-5">
        <Link
          className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
          href={"/routes/usbapi"}
        >
          Via USB Api
        </Link>
        <Link
          className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
          href={"/routes/printpreview"}
        >
          Via Visualização prévia
        </Link>
        <Link
          className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
          href={"/routes/jspdf"}
        >
          Sem Visualização prévia, abrindo nova página
        </Link>
        <Link
          className="mt-12 px-6 py-4 bg-slate-600 text-slate-100 rounded-md"
          href={"/routes/thermalprint"}
        >
          Via API serial
        </Link>
      </div>
    </main>
  );
}

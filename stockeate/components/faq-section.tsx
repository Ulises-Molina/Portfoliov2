"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "¿Para quién es este sistema?",
    answer:
      "Está pensado para kioscos, almacenes, ferreterias y comercios chicos que quieren controlar stock y registrar ventas en segundos, sin complejidad.",
  },
  {
    question: "¿Puedo cargar productos ilimitados?",
    answer:
      "Sí. Podés cargar todos los productos que necesites y organizarlos para encontrarlos rápido al vender.",
  },
  {
    question: "¿Cómo funciona el control de stock?",
    answer:
      "Cada venta descuenta stock automáticamente y podés ver alertas cuando un producto está por debajo del mínimo.",
  },
  {
    question: "¿Qué son las ventas ágiles?",
    answer:
      "Es un flujo rápido de venta: buscás el producto, agregás cantidad y confirmás en pocos toques.",
  },
  {
    question: "¿Qué reportes incluye?",
    answer:
      "Vas a poder ver ventas del día/mes, productos más vendidos y alertas clave para reponer.",
  },
  {
    question: "¿Tiene cierre de caja e historial?",
    answer:
      "Sí. Podés cerrar caja con un resumen del día y ver el historial de operaciones para auditoría.",
  },
  {
    question: "¿Puedo gestionar clientes y proveedores?",
    answer:
      "Sí. Tenés una base de datos simple para registrar clientes y proveedores y consultarlos cuando los necesites.",
  },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div id="faqs" className="w-full flex justify-center items-start bg-[#F7F5F3]">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        {/* Left Column - Header */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-[#0F172A] font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            Preguntas frecuentes
          </div>
          <div className="w-full text-[#475569] text-base font-normal leading-7 font-sans">
            Todo lo importante sobre el sistema, en simple.
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)

              return (
                <div key={index} className="w-full border-b border-[#E5E7EB] overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[#EFF6FF] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-[#0F172A] text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronDownIcon
                        className={`w-6 h-6 text-[#475569] transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-[#475569] text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

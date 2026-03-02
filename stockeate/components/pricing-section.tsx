"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

interface Plan {
  id: string
  code: string
  name: string
  price: number
  currency: string
  interval_unit: "month" | "year" | "lifetime"
  interval_count: number
}

const MONTHLY_FEATURES = [
  "Productos ilimitados",
  "Gestión de stock",
  "Alertas inteligentes de inventario",
  "Ventas ágiles",
  "Reportes de rendimiento",
  "Cierre de caja diario",
  "Historial de operaciones",
  "Clientes y proveedores centralizados",
]

const YEARLY_FEATURES = [
  "Productos ilimitados",
  "Gestión de stock",
  "Alertas inteligentes de inventario",
  "Ventas ágiles",
  "Reportes de rendimiento",
  "Cierre de caja diario",
  "Historial de operaciones",
  "Clientes y proveedores centralizados",
]

function formatPrice(plan?: Plan) {
  if (!plan) {
    return "—"
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: plan.currency || "ARS",
    maximumFractionDigits: 0,
  }).format(plan.price)
}

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly")
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPlans = async () => {
      const { data, error } = await supabase.from("plans").select("*").eq("is_active", true)
      if (!error && data) {
        setPlans(data as Plan[])
      }
      setIsLoading(false)
    }

    loadPlans()
  }, [])

  const monthlyPlan =
    plans.find((plan) => plan.interval_unit === "month") ??
    plans.find((plan) => plan.code?.includes("monthly"))
  const annualPlan =
    plans.find((plan) => plan.interval_unit === "year" || plan.interval_unit === "lifetime") ??
    plans.find(
      (plan) =>
        plan.code?.includes("yearly") || plan.code?.includes("annual") || plan.code?.includes("lifetime")
    )
  const isMonthlyActive = billingPeriod === "monthly"
  const isAnnualActive = billingPeriod === "annually"

  return (
    <div id="pricing" className="w-full flex flex-col justify-center items-center gap-2 bg-[#F7F5F3]">
      {/* Header Section */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-[#E5E7EB] flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-6 py-1 shadow-[0px_2px_4px_rgba(30,64,175,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-4 shadow-none">
          {/* Pricing Badge */}
          <div className="px-[14px] py-[1px] bg-white shadow-[0px_0px_0px_4px_rgba(30,64,175,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[#E5E7EB] shadow-xs">
            <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 1V11M8.5 3H4.75C4.28587 3 3.84075 3.18437 3.51256 3.51256C3.18437 3.84075 3 4.28587 3 4.75C3 5.21413 3.18437 5.65925 3.51256 5.98744C3.84075 6.31563 4.28587 6.5 4.75 6.5H7.25C7.71413 6.5 8.15925 6.68437 8.48744 7.01256C8.81563 7.34075 9 7.78587 9 8.25C9 8.71413 8.81563 9.15925 8.48744 9.48744C8.15925 9.81563 7.71413 10 7.25 10H3.5"
                  stroke="#1E40AF"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-center flex justify-center flex-col text-[#0F172A] text-xs font-medium leading-3 font-sans">
              Planes y precios
            </div>
          </div>

          {/* Title */}
          <div className="self-stretch text-center flex justify-center flex-col text-[#0F172A] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Elegí el plan ideal para tu negocio
          </div>

          {/* Description */}
          <div className="self-stretch text-center text-[#475569] text-base font-normal leading-7 font-sans">
            Pagá mensual o anual con precios simples y transparentes.
            <br />
            Cambiá de plan cuando lo necesites.
          </div>
        </div>
      </div>

      {/* Billing Toggle Section */}
      <div className="self-stretch px-6 md:px-16 py-9 relative flex justify-center items-center gap-4">
        {/* Horizontal line */}
        <div className="w-full max-w-[1060px] h-0 absolute left-1/2 transform -translate-x-1/2 top-[63px] border-t border-[#E5E7EB] z-0"></div>

        {/* Toggle Container */}
        <div className="p-3 md:p-4 relative bg-[#F1F5F9] border border-[#E5E7EB] backdrop-blur-[44px] backdrop-saturate-150 backdrop-brightness-110 flex justify-center items-center rounded-lg z-20 before:absolute before:inset-0 before:bg-white before:opacity-60 before:rounded-lg before:-z-10">
          <div className="p-[2px] min-w-[240px] bg-[#E5E7EB] shadow-[0px_1px_0px_white] rounded-[99px] border-[0.5px] border-[#E5E7EB] flex justify-center items-center gap-0 relative">
            <div
              className={`absolute top-[2px] w-[calc(50%-2px)] h-[calc(100%-4px)] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.08)] rounded-[99px] transition-all duration-300 ease-in-out ${
                billingPeriod === "monthly" ? "left-[2px]" : "left-[50%]"
              }`}
            />

            <button
              onClick={() => setBillingPeriod("monthly")}
              className="px-4 py-1.5 rounded-[99px] flex justify-center items-center gap-2 transition-colors duration-300 relative z-10 flex-1"
            >
              <div
                className={`text-[13px] md:text-[14px] font-medium leading-5 font-sans transition-colors duration-300 ${
                  billingPeriod === "monthly" ? "text-[#0F172A]" : "text-[#475569]"
                }`}
              >
                Mensual
              </div>
            </button>

            <button
              onClick={() => setBillingPeriod("annually")}
              className="px-4 py-1.5 rounded-[99px] flex justify-center items-center gap-2 transition-colors duration-300 relative z-10 flex-1"
            >
              <div
                className={`text-[13px] md:text-[14px] font-medium leading-5 font-sans transition-colors duration-300 ${
                  billingPeriod === "annually" ? "text-[#0F172A]" : "text-[#475569]"
                }`}
              >
                Pago único
              </div>
            </button>
          </div>

          {/* Decorative dots */}
          <div className="w-[3px] h-[3px] absolute left-[5px] top-[5.25px] bg-[#E5E7EB] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]"></div>
          <div className="w-[3px] h-[3px] absolute right-[5px] top-[5.25px] bg-[#E5E7EB] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]"></div>
          <div className="w-[3px] h-[3px] absolute left-[5px] bottom-[5.25px] bg-[#E5E7EB] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]"></div>
          <div className="w-[3px] h-[3px] absolute right-[5px] bottom-[5.25px] bg-[#E5E7EB] shadow-[0px_0px_0.5px_rgba(0,0,0,0.12)] rounded-[99px]"></div>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="self-stretch border-b border-t border-[#E5E7EB] flex justify-center items-center">
        <div className="flex justify-center items-start w-full">
          {/* Left Decorative Pattern */}
          <div className="w-12 self-stretch relative overflow-hidden hidden md:block">
            <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[#E5E7EB] outline-offset-[-0.25px]"
                ></div>
              ))}
            </div>
          </div>

          {/* Pricing Cards Container */}
          <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 py-12 md:py-0">
            {/* Plan Mensual */}
            {isMonthlyActive && (
              <div
                className={`w-full md:w-[520px] self-stretch px-6 py-5 border overflow-hidden flex flex-col justify-start items-start gap-12 ${
                  isMonthlyActive ? "bg-[#1E40AF] border-[#1E3A8A]" : "bg-white border-[#E5E7EB]"
                }`}
              >
              {/* Plan Header */}
              <div className="self-stretch flex flex-col justify-start items-center gap-9">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div
                    className={`text-lg font-medium leading-7 font-sans ${
                      isMonthlyActive ? "text-white" : "text-[#0F172A]"
                    }`}
                  >
                    {monthlyPlan?.name ?? "Plan Mensual"}
                  </div>
                  <div
                    className={`w-full max-w-[242px] text-sm font-normal leading-5 font-sans ${
                      isMonthlyActive ? "text-[#BFDBFE]" : "text-[#475569]"
                    }`}
                  >
                    Ideal para empezar y pagar mes a mes.
                  </div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="flex flex-col justify-start items-start gap-1">
                    <div
                      className={`relative h-[60px] flex items-center text-5xl font-medium leading-[60px] font-serif ${
                        isMonthlyActive ? "text-white" : "text-[#0F172A]"
                      }`}
                    >
                      {isLoading ? "—" : formatPrice(monthlyPlan)}
                    </div>
                    <div
                      className={`text-sm font-medium font-sans ${
                        isMonthlyActive ? "text-[#BFDBFE]" : "text-[#475569]"
                      }`}
                    >
                      por mes
                    </div>
                    <div
                      className={`text-xs font-medium font-sans ${
                        isMonthlyActive ? "text-[#BFDBFE]" : "text-[#64748B]"
                      }`}
                    >
                      7 días de prueba sin cobro. Si no te gusta lo cancelas antes del cobro.
                    </div>
                  </div>
                </div>

                <div
                  className={`self-stretch px-4 py-[10px] relative overflow-hidden rounded-[99px] flex justify-center items-center ${
                    isMonthlyActive
                      ? "bg-white shadow-[0px_2px_4px_rgba(30,64,175,0.12)]"
                      : "bg-[#1E40AF] shadow-[0px_2px_4px_rgba(30,64,175,0.12)]"
                  }`}
                >
                  <div className="w-full h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                  <div
                    className={`max-w-[140px] flex justify-center flex-col text-[13px] font-medium leading-5 font-sans ${
                      isMonthlyActive ? "text-[#1E40AF]" : "text-white"
                    }`}
                  >
                    {isMonthlyActive ? "Probar gratis 7 días" : "Elegir mensual"}
                  </div>
                </div>
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                {MONTHLY_FEATURES.map((feature, index) => (
                  <div key={index} className="self-stretch flex justify-start items-center gap-[13px]">
                    <div className="w-4 h-4 relative flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke={isMonthlyActive ? "#E0F2FE" : "#475569"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div
                      className={`flex-1 text-[12.5px] font-normal leading-5 font-sans ${
                        isMonthlyActive ? "text-white" : "text-[#475569]"
                      }`}
                    >
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            )}

            {/* Plan Anual */}
            {isAnnualActive && (
              <div
                className={`w-full md:w-[520px] self-stretch px-6 py-5 border overflow-hidden flex flex-col justify-start items-start gap-12 ${
                  isAnnualActive ? "bg-[#1E40AF] border-[#1E3A8A]" : "bg-white border-[#E5E7EB]"
                }`}
              >
              {/* Plan Header */}
              <div className="self-stretch flex flex-col justify-start items-center gap-9">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div
                    className={`text-lg font-medium leading-7 font-sans ${
                      isAnnualActive ? "text-white" : "text-[#0F172A]"
                    }`}
                  >
                    {annualPlan?.name ?? "Plan Pago único"}
                  </div>
                  <div
                    className={`w-full max-w-[242px] text-sm font-normal leading-5 font-sans ${
                      isAnnualActive ? "text-[#BFDBFE]" : "text-[#475569]"
                    }`}
                  >
                    Pagás una sola vez y listo.
                  </div>
                </div>

                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="flex flex-col justify-start items-start gap-1">
                    <div
                      className={`relative h-[60px] flex items-center text-5xl font-medium leading-[60px] font-serif ${
                        isAnnualActive ? "text-white" : "text-[#0F172A]"
                      }`}
                    >
                      {isLoading ? "—" : formatPrice(annualPlan)}
                    </div>
                    <div
                      className={`text-sm font-medium font-sans ${
                        isAnnualActive ? "text-[#BFDBFE]" : "text-[#475569]"
                      }`}
                    >
                      pago único
                    </div>
                  </div>
                </div>

                <div
                  className={`self-stretch px-4 py-[10px] relative overflow-hidden rounded-[99px] flex justify-center items-center ${
                    isAnnualActive
                      ? "bg-white shadow-[0px_2px_4px_rgba(30,64,175,0.12)]"
                      : "bg-[#1E40AF] shadow-[0px_2px_4px_rgba(30,64,175,0.12)]"
                  }`}
                >
                  <div className="w-full h-[41px] absolute left-0 top-[-0.5px] bg-gradient-to-b from-[rgba(255,255,255,0.20)] to-[rgba(0,0,0,0.10)] mix-blend-multiply"></div>
                  <div
                    className={`max-w-[140px] flex justify-center flex-col text-[13px] font-medium leading-5 font-sans ${
                      isAnnualActive ? "text-[#1E40AF]" : "text-white"
                    }`}
                  >
                    {isAnnualActive ? "Comprar" : "Elegir pago único"}
                  </div>
                </div>
              </div>

              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                {YEARLY_FEATURES.map((feature, index) => (
                  <div key={index} className="self-stretch flex justify-start items-center gap-[13px]">
                    <div className="w-4 h-4 relative flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke={isAnnualActive ? "#E0F2FE" : "#475569"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div
                      className={`flex-1 text-[12.5px] font-normal leading-5 font-sans ${
                        isAnnualActive ? "text-white" : "text-[#475569]"
                      }`}
                    >
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            )}
          </div>

          {/* Right Decorative Pattern */}
          <div className="w-12 self-stretch relative overflow-hidden hidden md:block">
            <div className="w-[162px] left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  className="self-stretch h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[#E5E7EB] outline-offset-[-0.25px]"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

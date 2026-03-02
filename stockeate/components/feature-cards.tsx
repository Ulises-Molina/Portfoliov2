export function FeatureCards() {
  const features = [
    {
      title: "Plan your schedules",
      description: "Explore your data, build your dashboard,\nbring your team together.",
      highlighted: true,
    },
    {
      title: "Data to insights in the minutes",
      description: "Explore your data, build your dashboard,\nbring your team together.",
      highlighted: false,
    },
    {
      title: "Data to insights in the minutes",
      description: "Explore your data, build your dashboard,\nbring your team together.",
      highlighted: false,
    },
  ]

  return (
    <section className="border-t border-[#E5E7EB] border-b border-[#E5E7EB] bg-[#F8FAFC]">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 flex flex-col gap-2 ${
                feature.highlighted ? "bg-white border border-[#E5E7EB] shadow-sm" : "border border-[#E5E7EB]"
              }`}
            >
              {feature.highlighted && (
                <div className="space-y-1 mb-2">
                  <div className="w-full h-0.5 bg-[#E5E7EB]"></div>
                  <div className="w-32 h-0.5 bg-[#1E40AF]"></div>
                </div>
              )}
              <h3 className="text-[#0F172A] text-sm font-semibold leading-6">{feature.title}</h3>
              <p className="text-[#475569] text-sm leading-[22px] whitespace-pre-line">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

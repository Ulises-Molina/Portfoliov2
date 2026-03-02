export default function FooterSection() {
  return (
    <div className="w-full pt-10 flex flex-col justify-start items-start bg-[#F7F5F3]">
      {/* Main Footer Content */}
      <div className="self-stretch h-auto flex flex-col md:flex-row justify-between items-stretch pr-0 pb-8 pt-0">
        <div className="h-auto p-4 md:p-8 flex flex-col justify-start items-start gap-8">
          {/* Brand Section */}
          <div className="self-stretch flex justify-start items-center gap-3">
            <div className="text-center text-[#0F172A] text-xl font-semibold leading-4 font-sans">Stockear</div>
          </div>
          <div className="text-[#475569] text-sm font-medium leading-[18px] font-sans">
            Controlá tu stock sin complicarte
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-start items-start gap-4">
            {/* Twitter/X Icon */}
            <a
              href="https://x.com/stockear_x"
              target="_blank"
              aria-label="Stockear en X"
              className="w-6 h-6 relative overflow-hidden"
            >
              <div className="w-6 h-6 left-0 top-0 absolute flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    fill="#1E40AF"
                  />
                </svg>
              </div>
            </a>

            

            
          </div>
        </div>

        {/* Navigation Links */}
        <div className="self-stretch p-4 md:p-8 flex flex-col sm:flex-row flex-wrap justify-start sm:justify-end md:justify-end items-start md:items-end gap-6 md:gap-8 md:flex-1">
          {/* Product Column */}

          {/* Product Column */}
          <div className="flex flex-col justify-start items-end text-right gap-3 flex-1 min-w-[120px]">
            <div className="self-stretch text-[#475569] text-sm font-medium leading-5 font-sans">Menu</div>
            <div className="flex flex-col justify-end items-end gap-2">
              
              <a
                href="#como-funciona"
                className="text-[#0F172A] text-sm font-normal leading-5 font-sans cursor-pointer hover:text-[#1E40AF] transition-colors"
              >
                Como funciona
              </a>
              <a
                href="#pricing"
                className="text-[#0F172A] text-sm font-normal leading-5 font-sans cursor-pointer hover:text-[#1E40AF] transition-colors"
              >
                Precios
              </a>
              <a
                href="#faqs"
                className="text-[#0F172A] text-sm font-normal leading-5 font-sans cursor-pointer hover:text-[#1E40AF] transition-colors"
              >
                FAQs
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section with Pattern */}
      <div className="self-stretch h-12 relative overflow-hidden border-t border-b border-[#E5E7EB]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[300px] h-16 border border-[rgba(3,7,18,0.08)]"
                style={{
                  left: `${i * 300 - 600}px`,
                  top: "-120px",
                  transform: "rotate(-45deg)",
                  transformOrigin: "top left",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// function FeatureSection({
//   chipLabel,
//   chipColor = "primary",
//   title,
//   description,
//   features = [],
//   image,
//   imageMaxWidth = 360,
//   reverse = false,
//   bgColor = "transparent",
// }) {
//   return (
//     <section
//       dir="rtl"
//       className={`px-4 md:px-0 py-16 md:py-24 relative overflow-hidden ${bgColor === 'ui-card' ? 'bg-ui-card' : 'bg-ui-gray'}`}
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//         <div className={`flex flex-col-reverse items-center gap-12 md:gap-20 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

//           {/* Content */}
//           <div className="w-full md:w-3/5 text-right">
//             <div>
//               <span className={`inline-block px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest mb-6 ${chipColor === 'secondary' ? 'bg-secondary text-content-white' : 'bg-primary text-content-white'}`}>
//                 {chipLabel}
//               </span>

//               <h2 className="text-3xl md:text-5xl font-black text-content-main leading-[1.1] mb-6 tracking-tight">
//                 {title}
//               </h2>

//               <p className="text-base md:text-xl text-content-light font-medium leading-relaxed mb-10 max-w-2xl">
//                 {description}
//               </p>

//               <div className="space-y-4">
//                 {features.map((text, index) => (
//                   <div key={index} className="flex items-center gap-3 group">
//                     <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
//                     <p className="text-sm md:text-lg font-bold text-content-light leading-tight">
//                       {text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Image */}
//           <div className="w-full md:w-2/5 flex justify-center">
//             <div
//               className="relative w-full max-w-[280px] md:max-w-full"
//               style={{ maxWidth: `${imageMaxWidth}px` }}
//             >
//               <div className="relative group">
//                 {/* Decorative background element */}
//                 <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 transition-transform group-hover:scale-125 duration-700" />

//                 <div className="bg-ui-card p-4 md:p-6 rounded-[20px] shadow-2xl shadow-primary/5 border border-ui-border">
//                   <img
//                     src={image}
//                     alt={title}
//                     loading="lazy"
//                     decoding="async"
//                     className="w-full h-auto rounded-2xl transform transition-transform group-hover:scale-105 duration-700"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeatureSection;

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FeatureSection({
  chipLabel,
  chipColor = "primary",
  title,
  description,
  features = [],
  image,
  imageAlt,
  imageMaxWidth = 360,
  reverse = false,
  bgColor = "ui-gray",
}) {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".feature-chip", {
        y: 30,
      })
        .from(
          ".feature-title",
          {
            y: 40,
          },
          "-=0.4"
        )
        .from(
          ".feature-description",
          {
            y: 30,
          },
          "-=0.4"
        )
        .from(
          ".feature-item",
          {
            y: 20,
            stagger: 0.12,
          },
          "-=0.3"
        )
        .from(
          ".feature-image",
          {
            y: 30,
            scale: 0.92,
          },
          "-=0.6"
        );
    },
    { scope: container }
  );

  const backgroundClass =
    {
      "ui-card": "bg-ui-card",
      "ui-gray": "bg-ui-gray",
      transparent: "bg-transparent",
    }[bgColor] || "bg-ui-gray";

  const chipClass =
    chipColor === "secondary" ? "bg-secondary text-content-white" : "bg-primary text-content-white";

  return (
    <section
      ref={container}
      dir="rtl"
      className={`px-4 md:px-0 py-16 md:py-24 relative overflow-hidden ${backgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`flex flex-col-reverse items-center gap-12 md:gap-20 ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="w-full md:w-3/5 text-right">
            <div>
              <span
                className={`feature-chip inline-block px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest mb-6 ${chipClass}`}
              >
                {chipLabel}
              </span>

              <h2 className="feature-title text-3xl md:text-5xl font-black text-content-main leading-[1.1] mb-6 tracking-tight">
                {title}
              </h2>

              <p className="feature-description text-base md:text-xl text-content-light font-medium leading-relaxed mb-10 max-w-2xl">
                {description}
              </p>

              <div className="space-y-4">
                {features.map((text) => (
                  <div key={text} className="feature-item flex items-center gap-3 group">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <p className="text-sm md:text-lg font-bold text-content-light leading-tight">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex justify-center">
            <div
              className="relative w-full max-w-[280px] md:max-w-full"
              style={{ maxWidth: `${imageMaxWidth}px` }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 transition-transform group-hover:scale-125 duration-700" />

                <div className="feature-image bg-ui-card p-4 md:p-6 rounded-[20px] shadow-2xl shadow-primary/5 border border-ui-border">
                  <img
                    src={image}
                    alt={imageAlt || title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto rounded-2xl transform transition-transform group-hover:scale-105 duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;

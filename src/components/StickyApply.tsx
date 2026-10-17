"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/** Mobile-only bottom bar; hides once the application form (#apply) is reached. */
export default function StickyApply() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const apply = document.getElementById("apply");
      const reached = apply ? window.scrollY + window.innerHeight > apply.offsetTop + 120 : false;
      setShow(window.scrollY > 500 && !reached);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href="#apply" className="btn-primary w-full">
        Apply for a franchise <ArrowRight size={18} />
      </a>
    </div>
  );
}

import { useState } from "react";
import { faqs } from "../../data/faqs.js";
import { AccordionItem } from "../ui/AccordionItem.jsx";
import { Reveal, RevealItem } from "../ui/Reveal.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-y bg-bg-surface">
      <div className="container-page">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Questions, answered."
          subtitle="Everything else — ask us at hello@quill.ai."
        />

        <Reveal stagger className="mx-auto mt-12 flex max-w-[720px] flex-col gap-3 md:max-w-[640px] lg:max-w-[720px]">
          {faqs.map((item) => (
            <RevealItem key={item.id}>
              <AccordionItem
                item={item}
                open={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

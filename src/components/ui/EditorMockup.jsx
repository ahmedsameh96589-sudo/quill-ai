import { useRef } from "react";
import { Bold, Heading1, Italic, Link as LinkIcon, List, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { showcaseScript } from "../../data/showcaseScript.js";
import { useTypewriter } from "../../hooks/useTypewriter.js";
import { Caret } from "./TypewriterText.jsx";

const TOOLBAR = [
  { icon: Bold, mobile: true },
  { icon: Italic, mobile: true },
  { icon: Heading1, mobile: true },
  { icon: List, mobile: true },
  { icon: LinkIcon, mobile: false },
];

const FULL_SCRIPT = showcaseScript.blocks.map((block) => block.text).join("\n");

const countWords = (value) => value.trim().split(/\s+/).filter(Boolean).length;

export function EditorMockup() {
  const frameRef = useRef(null);
  const reduce = useReducedMotion();
  const { text } = useTypewriter([FULL_SCRIPT], {
    typeMs: 28,
    loop: false,
    startInView: true,
    ref: frameRef,
  });

  const typedBlocks = text.split("\n");
  const lastTypedIndex = typedBlocks.length - 1;

  return (
    <motion.div
      ref={frameRef}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[880px] overflow-hidden rounded-lg border border-border-subtle bg-bg-surface shadow-[var(--shadow-popular)]"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="type-body-sm truncate rounded-sm bg-bg-raised px-3 py-1 text-text-tertiary">
          {showcaseScript.filename}
        </span>
      </div>

      {/* Decorative toolbar — presentation only, nothing here is focusable */}
      <div
        aria-hidden="true"
        className="flex items-center gap-1 border-b border-border-subtle px-3 py-2"
      >
        {TOOLBAR.map(({ icon: Icon, mobile }, index) => (
          <span
            key={index}
            className={`${mobile ? "grid" : "hidden sm:grid"} size-8 place-items-center rounded-sm text-text-tertiary`}
          >
            <Icon size={18} />
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full grad-brand-deep px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white uppercase">
          <Sparkles size={13} />
          Improve
        </span>
      </div>

      {/* Body — the invisible copy reserves the final height so nothing shifts while typing */}
      <div className="grid px-5 py-6 sm:px-7 sm:py-8">
        <div className="invisible col-start-1 row-start-1" aria-hidden="true">
          {showcaseScript.blocks.map((block, index) => (
            <p
              key={index}
              className={block.style === "title" ? "type-editor-title" : "type-editor mt-4"}
            >
              {block.text}
            </p>
          ))}
        </div>

        <div className="col-start-1 row-start-1">
          {showcaseScript.blocks.map((block, index) => {
            const typed = typedBlocks[index];
            if (typed === undefined) return null;
            return (
              <p
                key={index}
                className={
                  block.style === "title"
                    ? "type-editor-title text-text-primary"
                    : "type-editor mt-4 text-text-secondary"
                }
              >
                {typed}
                {index === lastTypedIndex ? <Caret className="text-accent-violet" /> : null}
              </p>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-border-subtle px-5 py-2.5 sm:px-7">
        <span className="type-body-sm text-text-tertiary">Draft · saved just now</span>
        <span className="type-body-sm tabular-nums text-text-tertiary">
          {countWords(text)} words
        </span>
      </div>
    </motion.div>
  );
}

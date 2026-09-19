import { EditorMockup } from "../ui/EditorMockup.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";

export function ProductShowcase() {
  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="section-y">
      <div className="container-page">
        <SectionHeading
          id="showcase-heading"
          eyebrow="The editor"
          title="Watch Quill draft in real time."
          subtitle="A focused editor with AI one keystroke away — no tab-hopping, no prompt engineering."
        />

        <div className="mt-12 sm:px-[5%] md:px-0">
          <EditorMockup />
        </div>
      </div>
    </section>
  );
}

import { Feather, Github, Linkedin, Twitter } from "lucide-react";
import { footerColumns } from "../../data/footerLinks.js";

const SOCIALS = [
  { icon: Twitter, label: "Quill AI on Twitter" },
  { icon: Github, label: "Quill AI on GitHub" },
  { icon: Linkedin, label: "Quill AI on LinkedIn" },
];

const preventInertNavigation = (event) => {
  if (event.currentTarget.getAttribute("href") === "#") event.preventDefault();
};

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-base">
      <div className="container-page py-12 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-md grad-brand">
                <Feather size={18} className="text-white" aria-hidden="true" />
              </span>
              <span className="font-display text-[20px] font-semibold text-text-primary">
                Quill
              </span>
            </div>
            <p className="type-body-sm mt-3 max-w-xs text-text-secondary">
              Publish-ready copy from a two-line brief.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={preventInertNavigation}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border-subtle text-text-secondary transition-colors duration-[var(--dur-fast)] hover:text-text-primary"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12"
          >
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h2 className="type-caption text-text-tertiary">{column.heading}</h2>
                <ul className="mt-2 flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={preventInertNavigation}
                        className="type-body-sm inline-flex min-h-11 items-center font-medium text-text-secondary transition-colors duration-[var(--dur-fast)] hover:text-text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body-sm text-text-tertiary">
            © 2026 Quill AI, Inc. All rights reserved.
          </p>
          <p className="type-body-sm text-text-tertiary">Made with Quill, obviously.</p>
        </div>
      </div>
    </footer>
  );
}

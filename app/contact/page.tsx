import type { Metadata } from "next";
import type { ReactElement } from "react";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Adoness",
  description:
    "Get in touch with Adoness Design for bespoke fabric-art commissions, collaborations, and enquiries.",
};

export default function ContactPage(): ReactElement {
  return <ContactSection />;
}

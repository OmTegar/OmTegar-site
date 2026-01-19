import { Metadata } from 'next';
import ContactForm from "@/features/contact/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Me | Om.Tegar",
  description: "Get in touch with Om Tegar for collaborations, projects, or just to say hi.",
};

export default function ContactMe() {
  return (
    <ContactForm />
  );
}

import { Metadata } from 'next';
import CertificateList from "@/features/certificate/components/CertificateList";

export const metadata: Metadata = {
  title: "Certificates | Om.Tegar",
  description: "View Om Tegar's certifications and achievements in software development and networking.",
};

export default function Certificates() {
  return (
    <CertificateList />
  );
}

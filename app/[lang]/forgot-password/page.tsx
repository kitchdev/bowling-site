import ForgotPassword from "@/app/[lang]/components/ForgotPassword";

export default function page({ params: { lang } }: { params: { lang: Locale } }) {
  return <ForgotPassword />;
}

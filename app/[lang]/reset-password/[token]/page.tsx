import React from "react";
import ResetPassword from "@/app/[lang]/components/ResetPassword";

function page({ params: { lang } }: { params: { lang: Locale } }) {
  return <ResetPassword />;
}

export default page;

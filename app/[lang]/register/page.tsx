import React from "react";
import Register from "@/app/[lang]/components/Register";

const RegisterPage: React.FC = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  return (
    <>
      <Register />
    </>
  );
};

export default RegisterPage;

import * as React from "react";

interface EmailTemplateProps {
  name: string;
  activateToken: string;
  type: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  activateToken,
  type,
}) => {
  return (
    <>
      {type === "resigister" && (
        <div>
          <h3>Welcome, {name}!</h3>
          <p>
            Please activate your account at Valois Bowling by clicking this
            link:
            {process.env.HOMEPAGE_URL}api/activate/{activateToken}
          </p>
        </div>
      )}
      {type === "forgotpassword" && (
        <div>
          <h3>Welcome, {name}!</h3>
          <p>
            Please reset your password at Valois Bowling by clicking this link:
            {process.env.HOMEPAGE_URL}reset-password/{activateToken}
          </p>
        </div>
      )}
    </>
  );
};

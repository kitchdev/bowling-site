import * as React from "react";

interface EmailTemplateProps {
  name: string;
  activateToken: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  activateToken,
}) => (
  <div>
    <h3>Welcome, {name}!</h3>
    <p>
      Please activate your account at Valois Bowling by clicking this link:
      {process.env.HOMEPAGE_URL}api/activate/{activateToken}
    </p>
  </div>
);

"use client";

import { Box, Typography, List, ListItem, Card } from "@mui/material";
import { getServerSession } from "next-auth";

const mockUserData = {
  name: "Mat Kitching",
  email: "gdsm.kitching",
  phone: "514 502 1796",
};

export default function Profile({
  lang,
  session,
}: {
  lang: Locale;
  session?: any;
}) {
  return (
    <>
      <Card height={200} width={200}>
        <Typography>User Profile:</Typography>
        <List>
          {Object.entries(session.user).map(([key, value], i) => (
            <ListItem key={i}>
              {key}: {value}
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}

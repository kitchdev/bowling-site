"use client";

import React from "react";
import { Box, Typography, List, ListItem, Card } from "@mui/material";

const mockUserData = {
  name: "Mat Kitching",
  email: "gdsm.kitching",
  phone: "514 502 1796",
};

// TODO write a client component that will be fed with smaller server
// components the user details such as their basic info, a list of their
//  past reservations, and future reservations

export default function Profile() {
  return (
    <>
      <Card height={200} width={200}>
        <Typography>User Profile:</Typography>
        <List>
          {Object.entries(mockUserData).map(([key, value], i) => (
            <ListItem key={i}>
              {key}: {value}
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}

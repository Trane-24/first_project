import React from "react";
// Components
import ContactUsForm from "components/ContactUsForm";
// MUI
import { Box } from "@mui/material";

const SendMessage: React.FC = () => {
  return (
    <Box sx={{
      padding: '10px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      '@media (width > 600px)': {
        padding: '30px 0',
      }
    }}
    >
      <ContactUsForm />
    </Box>
  );
};

export default SendMessage;

import React from "react";
// Components
import ContactUsForm from "components/ContactUsForm";
// MUI
import { Box } from "@mui/material";

const SendMessage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#eee', pt: 5, pb: 5 }}>
      <div className="container">
        <ContactUsForm />
      </div>
    </Box>
  );
};

export default SendMessage;

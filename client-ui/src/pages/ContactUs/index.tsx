import React, { useEffect } from "react";
// Components
import ContactUsForm from "components/ContactUsForm";
// MUI
import { Box} from "@mui/material";
// images
import background from '../../images/contactUsBackground.jpg';
// utilites
import { toTop } from 'utilites/utilites';

const ContactUs: React.FC = () => {

  useEffect(() => {
    toTop();
  }, []);

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 148.5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="container">
        <ContactUsForm />
      </div>
    </Box>

  );
};

export default ContactUs;
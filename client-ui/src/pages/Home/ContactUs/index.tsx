import React from "react";
// Hooks
import { Controller, useForm } from "react-hook-form";
// Components
import Title from "components/Title";
// MUI
import { Box, Button, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// Styles
import classes from './styles.module.scss';
// Ultils
import axios from "axios";
import { isCountLetters, isEmail, isRequired } from "utilites/validation";
import useDialog from "hooks/useDialog";

interface IForm {
  name: string;
  email: string;
  message: string;
}

const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

const token = '5665706078:AAGoBXqR8z5TZfVJDIiVwTtLh9atgiKP8YI';
const chatId = '-898556886';

const ContactUs: React.FC = () => {
  const {Dialog, openDialog, closeDialog} = useDialog();

  const { handleSubmit, control, formState: { errors }, reset} = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    }
  });

  const sangmessage = async (text: string) => {
    await axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}?parse_node=HTML&text=${text}`);
  };

  const onSubmit = handleSubmit((data: IForm) => {
    const text = `Name: ${data.name},
    Email: ${data.email},
    Message: ${data.message}`;

    sangmessage(text)
      .then(() => {
        reset();
        openDialog();
      })
  });

  return (
    <React.Fragment>
      <Dialog>
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Title>Your message has been sent</Title>
          <Typography>We will contact you as soon as possible</Typography>
          <Button
            onClick={closeDialog}
            variant="contained"
          >Close</Button>
        </Box>
      </Dialog>

      <Box className={classes.contactUs}>
        <Box className="container">
          <Title>Contact us</Title>

          <Box className={classes.contactUsContent}>
            <Title>Send us a message</Title>
            <form onSubmit={onSubmit} noValidate className={classes.form}>
              <Grid container spacing={ {xs: 2, sm: 4}}>
                {/* name */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control} name='name'
                    rules={{ required: isRequired }}
                    render={({ field }) => (
                      <TextField
                        { ...field }
                        fullWidth
                        type="text"
                        label="Your name"
                        required
                        inputProps={{ style: inputStyle }}
                        error={Boolean(errors.name)}
                        helperText={errors.name ? `${errors.name.message}` : ''}
                      />
                    )}
                  />
                </Grid>

                {/* email */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control} name='email'
                    rules={{ required: isRequired, pattern: isEmail }}
                    render={({ field }) => (
                      <TextField
                        { ...field }
                        fullWidth
                        type="text"
                        required
                        label="Your e-mail"
                        inputProps={{ style: inputStyle }}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? `${errors.email.message}` : ''}
                      />
                    )}
                  />
                </Grid>

                {/* message */}
                <Grid item xs={12}>
                  <Controller
                    control={control} name='message'
                    rules={{
                      required: isRequired,
                      validate: (val: string) => isCountLetters(val, 30),
                    }}
                    render={({ field }) => (
                      <TextField
                        { ...field }
                        fullWidth
                        type="text"
                        label="Your message"
                        multiline
                        rows={3}
                        required
                        error={Boolean(errors.message)}
                        helperText={errors.message ? `${errors.message.message}` : ''}
                      />
                    )}
                  />
                </Grid>

                <Button
                  type="submit"
                  className={classes.btn}
                  variant="contained"
                >
                  Send message
                </Button>
              </Grid>
            </form>

            <Divider sx={{pt: 4, pb: 3}}>
              <Chip label="OR" />
            </Divider>
          
            <Box className={classes.getBtns}>
              <Title>Get in touch</Title>

              <Button
                variant="contained"
                href={'mailto:test@test.com'}
              >
                <EmailOutlinedIcon />
                <Typography>test@test.com</Typography>
              </Button>

              <Button
                variant="contained"
                href={'tel:+380999999999'}
              >
                <EmailOutlinedIcon />
                <Typography>+380999999999</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ContactUs;
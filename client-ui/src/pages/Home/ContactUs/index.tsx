import React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
// Hooks
import useDialog from "hooks/useDialog";
// Components
import Title from "components/Title";
import Phone from "components/Phone";
// MUI
import { Box, Button, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// Utilites
import { isCountLetters, isRequired } from "utilites/validation";
// Styles
import classes from './styles.module.scss';

interface IForm {
  subject: string;
  phone: string;
  firstName: string;
  lastName: string;
  message: string;
}

const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

const token = '5665706078:AAGoBXqR8z5TZfVJDIiVwTtLh9atgiKP8YI';
const chatId = '-898556886';

const ContactUs: React.FC = () => {
  const {Dialog, openDialog, closeDialog} = useDialog();

  const { handleSubmit, control, formState: { errors }, reset} = useForm({
    defaultValues: {
      subject: '',
      phone: '',
      firstName: '',
      lastName: '',
      message: '',
    }
  });

  const onSubmit = handleSubmit((data: IForm) => {
    const { firstName, lastName, subject, phone, message } = data;
    const text = `Name: ${firstName} ${lastName}\nPhone: +${phone}\nSubject: ${subject}\n\nMessage:\n${message}`;
    axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(text)}`);
    openDialog();
    reset();
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
          <Box sx={{ textAlign: 'center' }}>
            <Title>Contact us</Title>
          </Box>

          <Box className={classes.contactUsContent}>
            <Title>Send us a message</Title>
            <form onSubmit={onSubmit} noValidate className={classes.form}>
              <Grid container spacing={ {xs: 2, sm: 4}}>
                {/* Subject */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control} name="subject"
                    rules={{ required: isRequired }}
                    render={({ field }) => (
                      <TextField
                        { ...field }
                        fullWidth
                        type="text"
                        required
                        label="Subject"
                        inputProps={{ style: inputStyle }}
                        error={Boolean(errors.subject)}
                        helperText={errors.subject ? `${errors.subject.message}` : ''}
                      />
                    )}
                  />
                </Grid>


                {/* Phone */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control} name="phone"
                    rules={{ required: isRequired }}
                    render={({ field: { onChange, value } }) => (
                      <Phone
                        value={value || ''}
                        onChange={onChange}
                        label="Phone"
                        margin="none"
                        required
                        error={Boolean(errors.phone)}
                        helperText={errors.phone ? `${errors.phone.message}` : ''}
                      />
                    )}
                  />
                </Grid>

                {/* firstName */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control} name='firstName'
                    rules={{ required: isRequired }}
                    render={({ field }) => (
                      <TextField
                        { ...field }
                        fullWidth
                        type="text"
                        label="First name"
                        required
                        inputProps={{ style: inputStyle }}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName ? `${errors.firstName.message}` : ''}
                      />
                    )}
                  />
                </Grid>

                {/* lastName */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control} name='lastName'
                    rules={{ required: isRequired }}
                    render={({ field }) => (
                      <TextField
                        { ...field }
                        fullWidth
                        type="text"
                        label="Last name"
                        required
                        inputProps={{ style: inputStyle }}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName ? `${errors.lastName.message}` : ''}
                      />
                    )}
                  />
                </Grid>

                {/* message */}
                <Grid item xs={12}>
                  <Controller
                    control={control} name="message"
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
                        rows={5}
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
                  Send
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
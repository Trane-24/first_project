import React, { useEffect } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// Hooks
import useDialog from "hooks/useDialog";
// Components
import Title from "components/Title";
import Phone from "components/Phone";
// Selectors
import { selectCurrentUser } from "store/users/usersSelectors";
// MUI
import { Box, Button, Chip, Divider, Grid, TextField, Typography } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
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

const ContactUsForm: React.FC = () => {
  const {Dialog, openDialog, closeDialog} = useDialog();
  const { pathname } = useLocation();
  // Selectors
  const currentUser = useSelector(selectCurrentUser);

  const isContactUs = pathname === '/contact-us';

  const { handleSubmit, control, formState: { errors }, reset} = useForm({
    defaultValues: {
      subject: '',
      phone: currentUser?.phone || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
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

  useEffect(() => {
    reset({
      phone: currentUser?.phone ? currentUser.phone : '',
      firstName: currentUser ? currentUser.firstName : '',
      lastName: currentUser ? currentUser.lastName : '',
    });
    // eslint-disable-next-line
  }, [currentUser])

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
          <Box className={classes.contactUsContent}>
            <Title>Send us a message</Title>
            <form onSubmit={onSubmit} noValidate className={classes.form}>
              <Grid container rowSpacing={ {xs: 1.5, sm: 2}} columnSpacing={{ xs: 0, sm: 2}}>
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

            {isContactUs && (
              <React.Fragment>
                <Divider sx={{pt: 4, pb: 3}}>
                  <Chip label="OR" />
                </Divider>
          
                <Box className={classes.getInTouch}>
                  <Title>Get in touch</Title>

                  <a
                    className={classes.link}
                    href={'mailto:test@test.com'}
                  >
                    <EmailOutlinedIcon />
                    <Typography>test@test.com</Typography>
                  </a>

                  <a
                    className={classes.link}
                    href={'tel:+380999999999'}
                  >
                    <LocalPhoneOutlinedIcon />
                    <Typography>+380999999999</Typography>
                  </a>
                </Box>
              </React.Fragment>
            )}
            
        </Box>
      </Box>
  </React.Fragment>
);
};

export default ContactUsForm;
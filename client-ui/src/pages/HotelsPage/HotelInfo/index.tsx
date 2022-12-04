import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Hooks
import { useAppDispatch } from "hooks/useAppDispatch";
import useDialog from "hooks/useDialog";
// Async
import { fetchHotel } from "store/hotels/hotelsAsync";
// Components
import ReservationForm from "components/ReservationsForm";
// MUI
import { Box, Button, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

// Styles
import classes from './styles.module.scss';
import { useSelector } from "react-redux";
import { selectHotel } from "store/hotels/hotelsSelectors";
import config from "config";
import PhotoSwiper from "./PhotoSwiper";

const HotelInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hotelId = '' } = useParams();
  // Selectors
  const hotel = useSelector(selectHotel);

  const imgUrl = hotel?.images?.length !== 0 ? `${config.serverURL}/${hotel?.images[0].path}` : '/img/hotel-no-available.png';
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeImgUrl, setActiveImgUrl] = useState(imgUrl);

  const changeActiveImgUrl = (url: string) => {
    setActiveImgUrl(url);
  }

  // Dialogs
  const {
    Dialog: DialogForm,
    openDialog: openDialogForm,
    closeDialog: closeDialogForm,
  } = useDialog();

  const {
    Dialog: DialogSwiper,
    openDialog: openDialogSwiper,
    closeDialog: closeDialogSwiper,
  } = useDialog();

  useEffect(() => {
    setIsLoading(true)

    dispatch(fetchHotel(hotelId))
      .unwrap()
      .finally(() => setIsLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId])

  useEffect(() => {
    setActiveImgUrl(imgUrl)
  }, [hotel, imgUrl])

  if (isLoading) {
    return (
      <Box sx={{width: '100%'}}>
        <LinearProgress />
      </Box>
    )
  }

  if (!hotel) {
    return null;
  }

  const { name, country, city, hotelType, description } = hotel;

  return (
    <React.Fragment>
      <DialogForm>
        <ReservationForm onClose={closeDialogForm} hotel={hotel} />
      </DialogForm>

      <DialogSwiper maxWidth="lg">
        <PhotoSwiper images={hotel.images} onClose={closeDialogSwiper} />
      </DialogSwiper>

      <section className={classes.hotelInfo}>
        <Box className="container">
          <Box className={classes.header}>
            <h2 className={classes.title}>{name}</h2>

            <Button
              className={classes.btn}
              variant="contained"
              onClick={openDialogForm}
            >
              <LibraryAddCheckIcon />
              Reserve
            </Button>
          </Box>


          <Box className={classes.hotelInfoContent}>
            <Box className={classes.img_box}>
              {hotel.images.length > 1 && (
                <Button
                  className={classes.swiper_btn}
                  variant="contained"
                  color="secondary"
                  onClick={openDialogSwiper}
                >
                  <ImageIcon />
                  View All Photos
                </Button>
              )}

              <img src={activeImgUrl} alt={name} className={classes.img} />

              {hotel.images.length > 1 && (
                <Box className={classes.images_select}>
                  {hotel.images.map((image, ind) => {
                    const url = `${config.serverURL}/${image.path}`;

                    if (ind <= 3) {
                      return (
                        <div className={classes.img_select_box}>
                          <img
                            className={ url === activeImgUrl
                              ? [classes.img_select, classes.img_select_act].join(' ')
                              : classes.img_select
                            }
                            src={url}
                            alt={hotel.name}
                            key={image.path}
                            onClick={() => changeActiveImgUrl(url)}
                          />
                        </div>
                      )
                    } else {
                      return null;
                    }
                  })}
                </Box>
              )}
            </Box>

            <Box className={classes.info}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} className={classes.info_item}>
                  <Typography className={classes.subtitle}>Country</Typography>
                  <Typography>{country}</Typography>
                </Grid>

                <Grid item xs={12} sm={4} className={classes.info_item}>
                  <Typography className={classes.subtitle}>City</Typography>
                  <Typography>{city}</Typography>
                </Grid>

                <Grid item xs={12} sm={4} className={classes.info_item}>
                  <Typography className={classes.subtitle}>Hotel type</Typography>
                  <Typography>{hotelType.name}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ mb: 2, mt: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography className={classes.subtitle}>Description</Typography>
                  <Typography>{description}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

      </section>
    </React.Fragment>
  );
};

export default HotelInfo;
import React, { useState, useMemo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Hooks
import { useWindowDimensions } from "hooks/useWindowDimensions";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.scss";
// MUI
import { Box, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import config from "config";

interface Props {
  images: any;
  onClose: () => void;
}

const PhotoSwiper: React.FC<Props> = ({ images, onClose }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  // hooks
  const { width } = useWindowDimensions();

  const slidesPerViewCount = useMemo(() => {
    return width < 500 ? 2.2 : width < 800 ? 3.2 : width < 1280 ? 3.2 : 4;
  }, [width]);

  return (
    <Box className="swiper_content">
      <MenuItem className="close_btn" onClick={onClose}>
        <CloseIcon />
      </MenuItem>

      <Swiper
        style={{
          // "--swiper-navigation-color": "#fff",
          // "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={5}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="generalSwiper"
        // class="swiper-button-prev swiper-button-white"
      >
        {images.map((image: any) => (
          <SwiperSlide>
            <img
              src={`${config.serverURL}/${image.path}`}
              alt={image.path}
              key={image.path}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={slidesPerViewCount}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="scrollSwiper"
      >
        {images.map((image: any) => (
          <SwiperSlide>
            <img
              src={`${config.serverURL}/${image.path}`}
              alt={image.path}
              key={image.path}
             />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PhotoSwiper;

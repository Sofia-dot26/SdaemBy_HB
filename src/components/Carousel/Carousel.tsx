import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { TiledCards } from "../../components/cards/TiledCards/TiledCards";
import { Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";
import "./swiper.scss"
import { IResponseData } from '../../Interfaces/IResponseData';

interface IPropsCarousel {
  data: IResponseData[]
}

export const Carousel: FC<IPropsCarousel> = ({ data }) => {
  return (
    <Swiper
      modules={[Navigation]}
      simulateTouch={false}
      slidesPerView={3}
      spaceBetween={30}
      navigation
    >
      {
        data?.map((flat: any) =>
          <SwiperSlide key={flat.id}>
            <TiledCards data={flat} />
          </SwiperSlide>
        )
      }
    </Swiper>
  )
}

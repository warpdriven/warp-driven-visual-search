import { styled } from "@mui/material";
import React from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "@/assets/scss/recs.scss";

export function RecsList(props: RecsListProps) {
  const { title, children, ...restProps } = props;

  const swiperRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);
  const prevRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation],
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,

      navigation: {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
      },
    });

    return () => {
      swiper.destroy();
    };
  }, [swiperRef, nextRef, prevRef]);

  return (
    <>
      <StyledDiv {...restProps}>
        <div
          // data-recommend-type="2"
          // data-col-num="4"
          // data-__tracker-total-view-time="0"
          // data-__tracker-last-view-started="0"
          // data-__tracker-selector='[data-__tracker-id="vs93ek8uqig"]'
          // data-__tracker-id="vs93ek8uqig"
          // data-__tracker-viewed="1"
          // data-__tracker-view-once="1"
          // data-__tracker-view-success-once="1"
          className="product-list product-recommend-seed product-recommend __sl-custom-track-product-recommend-plugin"
        >
          <div className="product-list-title product-section-title title5">
            {title}
          </div>
          <div className="product-item-swiper-list">
            <div className="swiper-box ">
              <div
                ref={swiperRef}
                className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
              >
                <div className="swiper-wrapper">{children}</div>
              </div>
              <div ref={nextRef} className="swiper-button-next"></div>
              <div ref={prevRef} className="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled("div")(({ theme }) => {
  return {
    backgroundImage: "none",
    "& .swiper-button-next": {
      backgroundImage: "none",
    },
    "& .product-list-title": {
      color: theme.palette.text.primary,
      fontSize: "1.375rem",
    },
    "& *": {
      userSelect: "none",
    },
  };
});

export interface RecsListProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

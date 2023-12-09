// Swiper Imports
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/scss";

// Styles Imports
import "@/assets/scss/recs.scss";

// React Imports
import React from "react";

export function RecsList(props: RecsListProps) {
  // ** Props
  const { title, children } = props;

  const swiperRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);
  const prevRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const isWithoutFalsy = [
      swiperRef.current,
      nextRef.current,
      prevRef.current,
    ].every(Boolean);
    if (!isWithoutFalsy) return;

    const swiper = new Swiper(swiperRef.current!, {
      modules: [Navigation],
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,

      navigation: {
        nextEl: nextRef.current!,
        prevEl: prevRef.current!,
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <>
      {/* <div
        className="recommed-section-page-width recommend-collected recommend-inited"
        data-ssr-product-recommend-bottom=""
      > */}
      <div id="recs" data-warpdriven-recs>
        <div
          className="product-list product-recommend-seed product-recommend __sl-custom-track-product-recommend-plugin"
          data-recommend-type="2"
          data-col-num="4"
          data-__tracker-total-view-time="0"
          data-__tracker-last-view-started="0"
          data-__tracker-selector='[data-__tracker-id="vs93ek8uqig"]'
          data-__tracker-id="vs93ek8uqig"
          data-__tracker-viewed="1"
          data-__tracker-view-once="1"
          data-__tracker-view-success-once="1"
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
      </div>
      {/* </div> */}
    </>
  );
}

export interface RecsListProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

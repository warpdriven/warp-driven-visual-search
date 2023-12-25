// React Imports
import React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      id="_图层_1"
      data-name="图层 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 256 256"
    >
      <defs>
        <style>
          {`.cls-1 {
            fill: #fff;
          }
    
          .cls-2 {
            fill: url(#_未命名的渐变_17);
          }
    
          .cls-3 {
            fill: url(#_未命名的渐变_12);
            filter: url(#drop-shadow-2);
          }
    
          .cls-4 {
            fill: url(#_未命名的渐变_6);
            filter: url(#drop-shadow-3);
          }
    
          .cls-5 {
            filter: url(#outer-glow-4);
          }`}
        </style>
        <linearGradient
          id="_未命名的渐变_17"
          data-name="未命名的渐变 17"
          x1="1412.7"
          y1="-322.59"
          x2="1460.33"
          y2="-322.59"
          gradientTransform="translate(1494.48 -194.59) rotate(-180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ff2656" />
          <stop offset="1" stopColor="#ed8e2e" />
        </linearGradient>
        <linearGradient
          id="_未命名的渐变_12"
          data-name="未命名的渐变 12"
          x1="1367.9"
          y1="-322.59"
          x2="1412.93"
          y2="-322.59"
          gradientTransform="translate(1494.48 -194.59) rotate(-180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8235eb" />
          <stop offset="1" stopColor="#df4ddf" />
        </linearGradient>
        <filter id="drop-shadow-2" filterUnits="userSpaceOnUse">
          <feOffset dx="-13.62" dy="0" />
          <feGaussianBlur result="blur" stdDeviation="13.62" />
          <feFlood floodColor="#000" floodOpacity=".1" />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <linearGradient
          id="_未命名的渐变_6"
          data-name="未命名的渐变 6"
          x1="1269.52"
          y1="-322.59"
          x2="1362.33"
          y2="-322.59"
          gradientTransform="translate(1494.48 -194.59) rotate(-180)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2e44df" />
          <stop offset="1" stopColor="#4b80ec" />
        </linearGradient>
        <filter id="drop-shadow-3" filterUnits="userSpaceOnUse">
          <feOffset dx="-13.62" dy="0" />
          <feGaussianBlur result="blur-2" stdDeviation="13.62" />
          <feFlood floodColor="#000" floodOpacity=".1" />
          <feComposite in2="blur-2" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter id="outer-glow-4" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="0" />
          <feGaussianBlur result="blur-3" stdDeviation="13.62" />
          <feFlood floodColor="#000" floodOpacity=".2" />
          <feComposite in2="blur-3" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g>
        <polygon
          className="cls-2"
          points="32.74 51.45 223.26 62.22 223.26 193.78 32.74 204.55 32.74 51.45"
        />
        <polygon
          className="cls-3"
          points="80.37 43.25 223.26 62.22 223.26 193.78 80.37 212.75 80.37 43.25"
        />
        <polygon
          className="cls-4"
          points="128 35.06 223.26 62.22 223.26 193.78 128 220.94 128 35.06"
        />
      </g>
      <g className="cls-5">
        <path
          className="cls-1"
          d="M185.31,179.77c2.29-3.33,1.44-7.9-1.89-10.19l-5.74-3.95c-8.07-5.55-11.57-15.68-8.49-24.66,3.04-8.86,3.57-18.53,1.55-27.93-4.07-18.95-19.51-34.49-38.41-38.69-16.91-3.77-33.78,.7-46.31,12.2-12.34,11.32-18.38,28.07-16.15,44.8,2.93,21.92,20.14,39.81,41.87,43.51,11.92,2,23.7,.03,34.06-5.8,3.53-1.99,4.78-6.45,2.8-9.98-1.98-3.52-6.45-4.78-9.98-2.8-7.4,4.16-15.84,5.57-24.43,4.12-15.46-2.62-27.72-15.38-29.8-30.99-1.62-12.17,2.59-23.87,11.54-32.08,8.95-8.21,21.07-11.37,33.22-8.69,13.41,2.97,24.37,14.01,27.27,27.47,1.47,6.81,1.1,13.76-1.08,20.1-5.19,15.16,.59,32.22,14.06,41.48l5.74,3.95c1.26,.87,2.71,1.29,4.14,1.29,2.33,0,4.62-1.11,6.04-3.18Z"
        />
        <circle className="cls-1" cx="120.61" cy="124.25" r="21.95" />
      </g>
    </svg>
  );
}

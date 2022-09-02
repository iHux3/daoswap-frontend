import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<React.PropsWithChildren<LogoProps>> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <svg width="204" height="54" xmlns="http://www.w3.org/2000/svg">
 <g id="Layer_1">
  <title>Layer 1</title>
  <g stroke="null" id="svg_4">
   <path stroke="null" fill="url(#svg_3)" d="m8.46672,46.22098l15.82225,-31.0035l13.9524,-6.50316l-15.82227,31.00348l-13.95237,6.50318z" id="svg_13"/>
   <path stroke="null" fill="url(#svg_2)" d="m24.24804,39.13434l12.02086,-23.54966l6.82202,7.08648l-11.85643,23.61456l-6.98645,-7.15137z" id="svg_14"/>
   <path stroke="null" fill="url(#svg_1)" d="m44.42643,23.38441l8.89741,3.41362l-4.43845,8.5989l-10.78786,0.38886l6.32891,-12.40138z" id="svg_15"/>
  </g>
  <text fontWeight="bold" textAnchor="start" fontFamily="'Inter'" fontSize="23" id="svg_17" y="36.85174" x="63.22908" fill={textColor}>DAO Swap</text>
 </g>
 <defs>
  <linearGradient y2="-0.00981" x2="1.53441" y1="0.99939" x1="0.00108" id="svg_3">
   <stop stopColor="#48D5FF"/>
   <stop stopColor="#1FA5FF" offset="1"/>
  </linearGradient>
  <linearGradient y2="-0.23615" x2="1.70918" y1="1.00055" x1="-0.81471" id="svg_2">
   <stop stopColor="#48D5FF"/>
   <stop stopColor="#1FA5FF" offset="1"/>
  </linearGradient>
  <linearGradient y2="-1.15134" x2="1.09802" y1="1.83543" x1="-1.93086" id="svg_1">
   <stop stopColor="#48D5FF"/>
   <stop stopColor="#1FA5FF" offset="1"/>
  </linearGradient>
 </defs>
</svg>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);

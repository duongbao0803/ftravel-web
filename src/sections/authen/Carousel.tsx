/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "antd";
import slide_1 from "@/assets/images/slides/FTravel_1.png";
import slide_2 from "@/assets/images/slides/FTravel_2.jpg";
import slide_3 from "@/assets/images/slides/FTravel_3.png";

const CarouselDemo: React.FC = () => (
  <Carousel autoplay className="box-border m-5 rounded-xl">
    <div>
      <img
        src={slide_1}
        alt=""
        className="h-[650px] w-full object-cover rounded-[10px]"
        width={1000}
        height={1000}
      />
    </div>
    <div>
      <img
        src={slide_2}
        alt=""
        className="h-[650px] w-full object-cover rounded-[10px]"
        width={1000}
        height={1000}
      />
    </div>
    <div>
      <img
        src={slide_3}
        alt=""
        className="h-[650px] w-full object-cover rounded-[10px]"
        width={1000}
        height={1000}
      />
    </div>
  </Carousel>
);

export default CarouselDemo;

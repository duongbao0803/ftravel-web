import React from "react";
import Signin from "../Signin";
import CarouselDemo from "../Carousel";

const AuthenView: React.FC = React.memo(() => {
  return (
    <>
      <div className="grid min-h-screen w-full place-items-center bg-[hsl(0,0%,97%)]">
        <div className=" mx-5 grid min-h-[650px] grid-cols-1 overflow-hidden rounded-[30px] border bg-[#fff] shadow-2xl md:grid md:max-w-[1024px] md:grid-cols-2">
          <div className="order-2 my-auto items-center px-16">
            <Signin />
          </div>
          <div className="order-1 hidden rounded-lg md:block">
            <CarouselDemo />
          </div>
        </div>
      </div>
    </>
  );
});

export default AuthenView;

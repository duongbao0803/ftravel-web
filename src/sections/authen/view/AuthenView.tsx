import React from "react";
import Signin from "../Signin";
import CarouselDemo from "../Carousel";

const AuthenView: React.FC = () => {
  return (
    <>
      <div className="bg-[hsl(0,0%,97%)] w-full min-h-screen grid place-items-center">
        <div className=" md:max-w-[1024px] min-h-[650px] mx-5 bg-[#fff] shadow-2xl grid grid-cols-1 md:grid md:grid-cols-2 rounded-[30px] overflow-hidden border">
          <div className="px-16 my-auto items-center order-2">
            <Signin />
          </div>
          <div className="hidden md:block order-1 rounded-lg">
            <CarouselDemo />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenView;

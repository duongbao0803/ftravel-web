import React from "react";
import CountUp from "react-countup";

const TotalField: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
        <div className="bold flex items-center gap-5 rounded-lg px-6 py-10 text-white shadow-xl">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_bag.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={2653} duration={2} />m
            </p>
            <p className="font-semibold text-[#bdbdbd]">Doanh thu</p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-lg px-6 py-10 text-white shadow-lg">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_users.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={500} duration={2} />
            </p>
            <p className="font-semibold text-[#bdbdbd]">Người dùng</p>
          </div>
        </div>
        <div className="bold flex items-center gap-5 rounded-lg px-6 py-10 text-white shadow-xl">
          <div>
            <img
              src="https://fservices-admin.vercel.app/assets/icons/glass/ic_glass_buy.png"
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-bold text-[black]">
              <CountUp end={100} duration={2} />
            </p>
            <p className="font-semibold text-[#bdbdbd]">Đơn hàng</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalField;

import React from "react";

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
            <p className="text-3xl font-bold text-[black]">26.53m</p>
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
            <p className="text-3xl font-bold text-[black]">500</p>
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
            <p className="text-3xl font-bold text-[black]">100</p>
            <p className="font-semibold text-[#bdbdbd]">Đơn hàng</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalField;

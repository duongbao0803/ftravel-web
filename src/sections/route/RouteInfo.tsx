import useRouteService from "@/services/routeService";
import React from "react";


export interface RouteInfoProps {
  routeId: number;
}

const RouteInfo: React.FC<RouteInfoProps> = (props) => {

  // const [companyDetail, setCompanyDetail] = useState<CompanyInfo>();

  const {fetchRouteDetail} = useRouteService();

  return (
    <>
      <div>
        <p className="text-[1.2rem] font-bold">TP.HCM - Cần Thơ</p>
      </div>
      <div>
        <table>
          <tr>
            <td>Nhà xe quản lí:</td>
            <td>Phương Trang</td>
          </tr>
          <tr>
            <td>Điểm đi:</td>
            <td>TP.HCM</td>
          </tr>
          <tr>
            <td>Điểm đến:</td>
            <td>Cần Thơ</td>
          </tr>
          <tr>
            <td>Ngày tạo:</td>
            <td>18:53 19/06/2024</td>
          </tr>
          <tr>
            <td>Ngày chỉnh sửa:</td>
            <td>18:53 19/06/2024</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default RouteInfo;

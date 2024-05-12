import React, { Suspense, lazy } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import AuthenPage from "@/pages/AuthenPage";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import { Error, Loading, ScrollToTop } from "@/components";
import CustomerList from "@/sections/customer/CustomerList";
import StaffList from "@/sections/user/StaffList";

export const AdminPage = lazy(() => import("@/pages/AdminPage"));
export const ChartPage = lazy(() => import("@/pages/ChartPage"));

const Router: React.FC = () => {
  useAnimation();
  const routes = useRoutes([
    {
      path: "/",
      element: <AuthenPage />,
    },

    {
      element: (
        <DashboardLayout>
          <ScrollToTop>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </DashboardLayout>
      ),
      children: [
        {
          element: <ChartPage />,
          path: "/chart",
        },
        {
          element: <AdminPage />,
          path: "/admin",
        },
        {
          element: <CustomerList />,
          path: "/customer",
        },
        {
          element: <StaffList />,
          path: "/staff",
        },
        { element: <Error />, path: "*" },
      ],
    },
  ]);

  return routes;
};

export default Router;

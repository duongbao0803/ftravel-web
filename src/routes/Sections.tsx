import React, { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { Error, Loading, ScrollToTop } from "@/components";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import CustomerList from "@/sections/customer/CustomerList";
import AuthenPage from "@/pages/AuthenPage";
import useAuth from "@/hooks/useAuth";

export const AdminPage = lazy(() => import("@/pages/AdminPage"));
export const ChartPage = lazy(() => import("@/pages/ChartPage"));
export const CityManagementPage = lazy(
  () => import("@/pages/CityManagementPage"),
);

const Router: React.FC = () => {
  useAnimation();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/chart" /> : <AuthenPage />,
    },
    {
      element: isAuthenticated ? (
        <DashboardLayout>
          <ScrollToTop>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </DashboardLayout>
      ) : (
        <Navigate to="/" />
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
          element: <CityManagementPage />,
          path: "/city",
        },
        {
          element: <CustomerList />,
          path: "/customer",
        },

        { element: <Error />, path: "*" },
      ],
    },
  ]);

  return routes;
};

export default Router;

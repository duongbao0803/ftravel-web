import React, { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { Error, ForBidden, Loading, ScrollToTop } from "@/components";
import DashboardLayout from "@/layout";
import { useAnimation } from "@/hooks/useAnimation";
import AuthenPage from "@/pages/AuthenPage";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants";

export const ChartPage = lazy(() => import("@/pages/ChartPage"));
export const CityManagementPage = lazy(
  () => import("@/pages/CityManagementPage"),
);
export const UserManagementPage = lazy(
  () => import("@/pages/UserManagementPage"),
);
export const CompanyManagementPage = lazy(
  () => import("@/pages/CompanyManagementPage"),
);
export const ServiceManagementPage = lazy(
  () => import("@/pages/ServiceManagementPage"),
);
export const RouteManagementPage = lazy(
  () => import("@/pages/RouteManagementPage"),
);
export const PersonalInformationPage = lazy(
  () => import("@/pages/PersonalInformationPage"),
);

const checkAccessAdmin = (role: string) => {
  return role === ROLE.ADMIN;
};

const checkAccessBusCompany = (role: string) => {
  return role === ROLE.BUSCOMPANY;
};

const Router: React.FC = () => {
  useAnimation();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const role = useAuth((state) => state.role);
  let hasAccessAdmin = false;
  let hasAccessBusCompany = false;

  if (role !== null) {
    hasAccessAdmin = checkAccessAdmin(role);
    hasAccessBusCompany = checkAccessBusCompany(role);
  }

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
          element: hasAccessAdmin ? <ChartPage /> : <ForBidden />,
          path: "/chart",
        },
        {
          element:
            hasAccessBusCompany || hasAccessAdmin ? (
              <CityManagementPage />
            ) : (
              <ForBidden />
            ),
          path: "/city",
        },
        {
          element: hasAccessAdmin ? <UserManagementPage /> : <ForBidden />,
          path: "/user",
        },
        {
          element: hasAccessAdmin ? <CompanyManagementPage /> : <ForBidden />,
          path: "/company",
        },
        {
          element:
            hasAccessBusCompany || hasAccessAdmin ? (
              <ServiceManagementPage />
            ) : (
              <ForBidden />
            ),
          path: "/service",
        },
        {
          element:
            hasAccessBusCompany || hasAccessAdmin ? (
              <RouteManagementPage />
            ) : (
              <ForBidden />
            ),
          path: "/route",
        },
        {
          element:
            hasAccessBusCompany || hasAccessAdmin ? (
              <PersonalInformationPage />
            ) : (
              <ForBidden />
            ),
          path: "/personal",
        },

        { element: <Error />, path: "*" },
      ],
    },
  ]);

  return routes;
};

export default Router;

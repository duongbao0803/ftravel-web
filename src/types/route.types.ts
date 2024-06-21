import { CompanyInfo } from "./company.types";

export interface RouteInfo {
  id: number;
  "unsign-name": string;
  name: string;
  "start-point": string;
  "end-point": string;
  "bus-company-name": string;
  "create-date": string | Date;
  "update-date"?: string | Date;
  status: string;
  "is-deleted"?: boolean;
}

export interface CreateRoute {
  name: string;
  "start-point": number;
  "end-point": number;
  "bus-company-id": number;
}

export interface RouteStore {
  startName: string;
  endName: string;
  setStartName: (name: string) => void;
  setEndName: (name: string) => void;
  setRouteName: (name: string) => void;
  routeName: string;
}

 export interface RouteDetailInfo extends RouteInfo{
  "bus-company": CompanyInfo
 }
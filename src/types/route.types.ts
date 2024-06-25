import { CompanyInfo } from "./company.types";
import { StationInfo } from "./station.types";

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

export interface RouteDetailInfo extends RouteInfo {
  "bus-company": CompanyInfo;
  "route-stations"?: [RouteStation];
}

export interface RouteStation {
  id: number;
  "route-id": number;
  "station-id": number;
  "station-index": number;
  station: StationInfo;
  "create-date": string | Date;
  "update-date"?: string | Date;
  "is-deleted": boolean;
}

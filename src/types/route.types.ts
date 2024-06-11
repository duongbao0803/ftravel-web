export interface RouteInfo {
  id: number;
  name: string;
  "start-point": string;
  "end-point": string;
  "bus-company-name": string;
  "create-date": string | Date;
  "update-date"?: string | Date;
  status: string;
  "is-deleted"?: boolean;
}
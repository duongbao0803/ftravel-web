export interface StationInfo {
  id: number;
  name: string;
  "bus-company-name": string;
  status: string;
  "create-date": string | Date;
  "update-date": string | Date;
  "is-deleted": boolean;
}

export interface StationDetailInfo {
  id: number;
  name: string;
  "bus-company-id": number;
  status: string;
  "create-date": string | Date;
  "update-date": string | Date;
  "is-deleted": boolean;
  "bus-company": {
    id: number;
    name: string;
    "img-url": string;
    "short-description": string;
    "full-description": string;
    "manager-email": string;
  };
}

export interface CreateStationInfo {
  name: string;
  "bus-company-id": number;
}
export interface ServiceDetail {
  id: number;
  "route-id": number;
  "station-id": number;
  name: string;
  "default-price": number;
  "img-url": string;
  "route-name"?: string;
  "station-name"?: string;
  "short-description": string;
  "full-description": string;
}

export interface CreateService {
  "route-id": number;
  "station-id": number;
  name: string;
  "default-price": number;
  "img-url": string;
  "short-description": string;
  "full-description": string;
}

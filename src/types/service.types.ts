export interface ServiceDetail {
  routeId: number;
  stationId: number;
  name: string;
  defaultPrice: number;
  imgUrl: string;
  shortDescription: string;
  fullDescription: string;
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

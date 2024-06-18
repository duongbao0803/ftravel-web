export interface CityInfo {
  id: number;
  name: string;
  code: number;
  "is-deleted": boolean;
}

export interface CreateCity extends CityInfo{
  code: number;
  name: string;
}

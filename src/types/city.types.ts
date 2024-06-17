export interface CityInfo {
  id: number;
  name: string;
  "is-deleted": boolean;
}

export interface CreateCity extends CityInfo{
  code: number;
  name: string;
}

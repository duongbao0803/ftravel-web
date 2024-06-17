export interface CompanyInfo {
  id: number;
  name: string;
  "img-url": string;
  "short-description": string;
  "full-description": string;
  "manager-email": string;
  "create-date": string | Date;
  "update-date"?: string | Date;
  "is-deleted"?: boolean;
}

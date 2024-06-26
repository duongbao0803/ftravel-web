export interface TripInfo {
    key: string;
    id: number;
    name: string;
    "route-name": string;
    "open-ticket-date": string | Date;
    "estimated-start-date": string | Date;
    "estimated-end-date": string | Date;
    "actual-start-date"?: string | Date;
    "actual-end-date"?: string | Date;
    "is-template": boolean;
    "driver-id": number;
    "create-date"?: string | Date;
    "update-date"?: string | Date;
    "is-deleted"?: boolean;
    status: string;
}
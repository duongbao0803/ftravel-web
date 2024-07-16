export interface OrderInfo {
    "order-id": number;
    code: string;
    "payment-date": Date | string;
    "payment-order-status": null,
    "customer-name": string;
    "total-price": number;
    "create-date": Date | string;
    "update-date": Date | string;
    "is-deleted": boolean
    "trip-name"?: string;
    "bus-company-name"?: string;
    // "order-detail-model": [],
}
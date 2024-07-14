export interface OrderInfo {
    code: string;
    "payment-date": Date | string;
    "payment-order-status": null,
    "customer-name": string;
    "total-price": number;
    "id": number;
    "create-date": Date | string;
    "update-date": Date | string;
    "is-deleted": boolean
    // "order-detail-model": [],
}
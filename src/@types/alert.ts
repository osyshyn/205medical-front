export interface IAlert {
  id: number;
  user_id: number;
  status: number;
  type: number;
  type_id: number;
  created_at: string; // ISO 8601 формат даты
}

export enum IAlertType {
  OREDR = "1",
  SHIPMENT = "2",
}

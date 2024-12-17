export interface IAlert {
  id: number;
  user_id: number;
  status: number;
  type: number;
  type_id: number;
  created_at: string;
}

export enum IAlertType {
  ORDER = "1",
  SHIPMENT = "2",
}

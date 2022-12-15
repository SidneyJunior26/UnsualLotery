export interface Raffle {
  id: string;
  value: number;
  availableQuantity: number;
  totalQuantity: number;
  active: boolean;
  createdOn: Date;
}

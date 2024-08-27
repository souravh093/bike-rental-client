export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

interface BikeId {
  image: string;
  name: string;
  _id: string;
}

export interface TBooking {
  _id: string;
  bikeId: BikeId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  paidStatus: string;
}
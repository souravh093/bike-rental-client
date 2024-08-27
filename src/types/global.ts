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
  bikeId: BikeId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  paidStatus: string;
}
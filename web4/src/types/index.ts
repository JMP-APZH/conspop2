export interface MartiniqueCity {
  id: string;
  name: string;
  postalCode: string;
  agglomeration: string;
  population: number;
}

export interface CitiesResponse {
  cities: MartiniqueCity[];
  totalCount: number;
}
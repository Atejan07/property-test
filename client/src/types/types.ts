export interface Property {
  id: string;
  houseNumber: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  propertyType:
    | 'Detached'
    | 'Semi-detached'
    | 'Terraced'
    | 'Flat'
    | 'Bungalow'
    | 'Farm/land'
    | 'Park home'
    | string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  photo: string;
  price: string;
}

export interface Error {
  houseNumber?: string;
  streetName?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  bedrooms?: string;
  bathrooms?: string;
  description?: string;
  photo?: string;
  price?: string;
}

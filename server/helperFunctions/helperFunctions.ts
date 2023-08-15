import { properties } from '../db/db';
import { Property } from '../types/types';

export function checkDuplicateProperty(property: Property) {
  return properties.some((prop) => {
    return (
      prop.houseNumber === property.houseNumber &&
      prop.streetName === property.streetName &&
      prop.city === property.city &&
      prop.country === property.country &&
      prop.postalCode === property.postalCode &&
      prop.propertyType === property.propertyType
    );
  });
}

export function checkEmptyProperty(property: Property): boolean {
  return (
    !property.houseNumber ||
    !property.streetName ||
    !property.city ||
    !property.country ||
    !property.postalCode ||
    !property.propertyType
  );
}

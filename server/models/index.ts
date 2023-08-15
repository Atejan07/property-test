import { checkDuplicateProperty } from '../helperFunctions/helperFunctions';
import { properties } from '../db/db';
import { Property } from '../types/types';

export async function getPropertiesModel() {
  try {
    return properties;
  } catch (error) {
    throw new Error('Failed to fetch properties from the database.');
  }
}

export async function addPropertyModel(property: Property) {
  try {
    const isDuplicate = checkDuplicateProperty(property);
    if (isDuplicate) {
      return 'Duplicate address';
    } else {
      properties.push(property);
      return properties;
    }
  } catch (error) {
    throw new Error('Failed to add property to the database.');
  }
}

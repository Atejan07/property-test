import { Error, Property } from '../types/types';

export function validatePostalCodeUK(postalCode: string) {
  const ukPostalCodeRegex =
    /^(([A-Z][0-9]{1,2})|(([A-Z][A-HJ-Y][0-9]{1,2})|(([A-Z][0-9][A-Z])|([A-Z][A-HJ-Y][0-9]?[A-Z])))) [0-9][A-Z]{2}$/i;

  if (!ukPostalCodeRegex.test(postalCode)) {
    return 'Please provide a valid UK postal code format (e.g. EC4V 4BE).';
  }
  return undefined;
}

export function validateForm(values: Property) {
  const errors: Error = {};

  // Required field validation
  const requiredFields = {
    houseNumber: 'house number',
    streetName: 'street name',
    city: 'city',
    country: 'country',
    postalCode: 'postal code',
    description: 'description',
    photo: 'property photo',
    price: 'price',
  };
  Object.entries(requiredFields).forEach((field) => {
    if (!values[field[0] as keyof Property]) {
      errors[field[0] as keyof Error] = `Please, provide a ${field[1]}.`;
    }
  });

  // Numeric field validation
  const alphanumericRegex = /^[a-zA-Z0-9\s-]+$/;

  if (
    !values.houseNumber ||
    isNaN(parseFloat(values.houseNumber)) ||
    !alphanumericRegex.test(values.houseNumber)
  ) {
    errors.houseNumber = 'Please provide a valid house number (e.g. 22).';
  }

  if (
    !values.price ||
    isNaN(parseFloat(values.price)) ||
    !/^\d{5,}$/.test(values.price)
  ) {
    errors.price =
      'Please ensure that the price consists of a minimum of 5 digits and contains only numerical values (e.g. 150000).';
  }

  if (values.bedrooms <= 0) {
    errors.bedrooms =
      'Please provide a valid number of bedrooms (should be at least 1).';
  }
  if (values.bathrooms <= 0) {
    errors.bathrooms =
      'Please provide a valid number of bathrooms (should be at least 1).';
  }

  // Alphabetic field validation
  const alphabeticRegex = /^[a-zA-Z\s-]+$/;
  if (!alphabeticRegex.test(values.streetName)) {
    errors.streetName =
      'Please provide a valid street name (e.g. Oxford Street).';
  }

  if (!alphabeticRegex.test(values.city)) {
    errors.city = 'Please provide a valid city name (e.g. London).';
  }

  if (!alphabeticRegex.test(values.country)) {
    errors.country =
      'Please provide a valid country name (e.g. United Kingdom).';
  }

  // Postal code validation
  if (values.country || values.postalCode) {
    if (values.country === 'United Kingdom') {
      const ukPostalCodeError = validatePostalCodeUK(values.postalCode);
      if (ukPostalCodeError) {
        errors.postalCode = ukPostalCodeError;
      }
    }
  }
  return errors;
}

export function formatPrice(price: string) {
  const formattedPrice = parseFloat(price).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });
  return formattedPrice;
}

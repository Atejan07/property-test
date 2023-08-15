import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProperty from '../components/AddProperty';
import { formatPrice, validateForm } from '../helperFunctions/helperFunctions';
import { Property } from '../types/types';

test('renders correctly', () => {
  const { container } = render(<AddProperty updateProperties={() => {}} />);
  expect(container).toMatchSnapshot();
});

test('has the correct heading', () => {
  render(<AddProperty updateProperties={() => {}} />);
  expect(
    screen.getByRole('heading', { name: 'Add your property' })
  ).toBeInTheDocument();
});

test('has properties labels', () => {
  render(<AddProperty updateProperties={() => {}} />);
  expect(screen.getByText('House Number')).toBeInTheDocument();
  expect(screen.getByText('Street Name')).toBeInTheDocument();
  expect(screen.getByText('City')).toBeInTheDocument();
  expect(screen.getByText('Country')).toBeInTheDocument();
  expect(screen.getByText('Postal Code')).toBeInTheDocument();
  expect(screen.getByText('Property Type')).toBeInTheDocument();
  expect(screen.getByText('Bedrooms')).toBeInTheDocument();
  expect(screen.getByText('Bathrooms')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
  expect(screen.getByText('Price')).toBeInTheDocument();
  expect(screen.getByText('Photo')).toBeInTheDocument();
});

test('has properties inputs', () => {
  render(<AddProperty updateProperties={() => {}} />);
  const inputNames = [
    'House Number',
    'Street Name',
    'City',
    'Country',
    'Postal Code',
    'Description',
    'Price',
  ];
  for (const inputName of inputNames) {
    const inputElement = screen.getByRole('textbox', { name: inputName });
    const selectElement = screen.getByRole('combobox', {
      name: 'Property Type',
    });
    const optionElement = screen.getByRole('option', { name: 'Flat' });
    const spinButtons = screen.getByRole('spinbutton', { name: 'Bedrooms' });
    expect(inputElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    expect(optionElement).toBeInTheDocument();
    expect(spinButtons).toBeInTheDocument();
  }
});

test('it should update house number field correctly', () => {
  render(<AddProperty updateProperties={() => {}} />);
  const houseNumberInput = screen.getByLabelText('House Number');
  userEvent.type(houseNumberInput, '123');
  expect(houseNumberInput).toHaveValue('123');
});

test('it should update description field correctly', () => {
  render(<AddProperty updateProperties={() => {}} />);
  const descriptionInput = screen.getByLabelText('Description');
  userEvent.type(descriptionInput, 'Lovely house with garden.');
  expect(descriptionInput).toHaveValue('Lovely house with garden.');
});

test('it should select property type option correctly', () => {
  render(<AddProperty updateProperties={() => {}} />);
  const propertyTypeSelect = screen.getByLabelText('Property Type');
  userEvent.selectOptions(propertyTypeSelect, 'Flat');
  expect(propertyTypeSelect).toHaveValue('Flat');
});

test('has button to add property', () => {
  render(<AddProperty updateProperties={() => {}} />);
  const button = screen.getByRole('button', { name: 'Add property' });
  expect(button).toBeInTheDocument();
});

test('button add the property', () => {
  render(<AddProperty updateProperties={() => {}} />);
  userEvent.type(screen.getByLabelText('House Number'), '123');
  userEvent.type(screen.getByLabelText('Street Name'), 'Main St');
  userEvent.type(screen.getByLabelText('City'), 'Cityville');
  userEvent.type(screen.getByLabelText('Country'), 'Countryland');
  userEvent.type(screen.getByLabelText('Postal Code'), '12345');
  userEvent.selectOptions(screen.getByLabelText('Property Type'), 'Detached');
  userEvent.type(screen.getByLabelText('Bedrooms'), '3');
  userEvent.type(screen.getByLabelText('Bathrooms'), '2');
  userEvent.type(
    screen.getByLabelText('Description'),
    'This is a test description'
  );
  userEvent.type(screen.getByLabelText('Price'), '100000');
  userEvent.type(
    screen.getByLabelText('Photo'),
    'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  );
  userEvent.click(screen.getByText('Add property'));

  expect(screen.getByText('This is a test description')).toBeInTheDocument();
});

test('it should format price correctly', () => {
  const priceInput = '500000';
  const formatedPrice = formatPrice(priceInput);
  expect(formatedPrice).toBe('£500,000.00');
});

test('it should return an error if some field is empty', () => {
  const propertyWithoutCity: Property = {
    id: '2c15c4c1-1dd3-4ca0-8f78-0324c32eb25d',
    houseNumber: '456',
    streetName: 'Oak Avenue',
    city: '',
    country: 'Countryland',
    postalCode: '67890',
    propertyType: 'Flat',
    bedrooms: 2,
    bathrooms: 1,
    description:
      'Step into a beautifully maintained family residence, showcasing elegant design and thoughtful features.',
    photo:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: '450000',
  };
  const resultForCity = validateForm(propertyWithoutCity);
  expect(resultForCity).toEqual({
    city: 'Please provide a valid city name (e.g. London).',
  });

  const propertyWithoutCountry: Property = {
    id: '2c15c4c1-1dd3-4ca0-8f78-0324c32eb25d',
    houseNumber: '456',
    streetName: 'Oak Avenue',
    city: 'City',
    country: '',
    postalCode: '67890',
    propertyType: 'Flat',
    bedrooms: 2,
    bathrooms: 1,
    description:
      'Step into a beautifully maintained family residence, showcasing elegant design and thoughtful features.',
    photo:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: '450000',
  };
  const resultForCountry = validateForm(propertyWithoutCountry);
  expect(resultForCountry).toEqual({
    country: 'Please provide a valid country name (e.g. United Kingdom).',
  });
});

test('it should return an error if the Postal Code is incorrect for United Kingdom', () => {
  const property: Property = {
    id: '2c15c4c1-1dd3-4ca0-8f78-0324c32eb25d',
    houseNumber: '456',
    streetName: 'Oak Avenue',
    city: 'City',
    country: 'United Kingdom',
    postalCode: '67890',
    propertyType: 'Flat',
    bedrooms: 2,
    bathrooms: 1,
    description:
      'Step into a beautifully maintained family residence, showcasing elegant design and thoughtful features.',
    photo:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: '450000',
  };
  const result = validateForm(property);
  expect(result).toEqual({
    postalCode: 'Please provide a valid UK postal code format (e.g. EC4V 4BE).',
  });
});

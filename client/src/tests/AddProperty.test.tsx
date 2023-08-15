import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProperty from '../components/AddProperty';

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

it('updates house number field correctly', () => {
  render(<AddProperty updateProperties={() => {}} />);
  const houseNumberInput = screen.getByLabelText('House Number');
  userEvent.type(houseNumberInput, '123');
  expect(houseNumberInput).toHaveValue('123');
});

it('updates description field correctly', () => {
  render(<AddProperty updateProperties={() => {}} />);
  const descriptionInput = screen.getByLabelText('Description');
  userEvent.type(descriptionInput, 'Lovely house with garden.');
  expect(descriptionInput).toHaveValue('Lovely house with garden.');
});

it('selects property type option correctly', () => {
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

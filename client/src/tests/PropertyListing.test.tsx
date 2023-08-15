import { render, waitFor, screen } from '@testing-library/react';
import PropertyListing from '../components/PropertyListing';
import { mockProperties } from './mocks';
import { formatPrice } from '../helperFunctions/helperFunctions';

test('renders correctly', () => {
  const { container } = render(<PropertyListing properties={[]} />);
  expect(container).toMatchSnapshot();
});

test('has the correct heading', () => {
  render(<PropertyListing properties={[]} />);
  expect(
    screen.getByRole('heading', { name: 'Properties for sale' })
  ).toBeInTheDocument();
});

test('renders propertyType, description and price', async () => {
  render(<PropertyListing properties={mockProperties} />);
  await waitFor(() => {
    for (const property of mockProperties) {
      expect(screen.getByText(property.propertyType)).toBeInTheDocument();
      expect(screen.getByText(property.description)).toBeInTheDocument();
      expect(screen.getByText(formatPrice(property.price))).toBeInTheDocument();
    }
  });
});

test('renders a message if there is no properties', async () => {
  render(<PropertyListing properties={[]} />);
  expect(
    screen.getByText('Sorry, there are no properties today.')
  ).toBeInTheDocument();
});

test('doesnt render houseNumber and streetName', async () => {
  render(<PropertyListing properties={[]} />);
  await waitFor(() => {
    for (const property of mockProperties) {
      expect(screen.queryByText(property.houseNumber)).not.toBeInTheDocument();
      expect(screen.queryByText(property.streetName)).not.toBeInTheDocument();
    }
  });
});

test('displays correct number of property items', () => {
  render(<PropertyListing properties={mockProperties} />);
  const propertyItems = screen.getAllByTestId('propertyItem');
  expect(propertyItems).toHaveLength(mockProperties.length);
});

test('renders single property correctly', () => {
  const singleProperty = [mockProperties[0]];
  render(<PropertyListing properties={singleProperty} />);

  const propertyElement = screen.getByTestId('propertyItem');
  expect(propertyElement).toBeInTheDocument();
});

import { Property } from '../types/types';

export const mockProperties: Property[] = [
  {
    id: '839346f3-6b49-46a8-b3c5-1085d0c7a939',
    houseNumber: '123',
    streetName: 'Main Street',
    city: 'Cityville',
    country: 'Countryland',
    postalCode: '12345',
    propertyType: 'Detached',
    bedrooms: 3,
    bathrooms: 2,
    description:
      'Discover this meticulously maintained family home, showcasing elegant design and thoughtful features throughout. The inviting entrance leads to a charming dining room and extended living area, seamlessly connecting to a secluded rear garden. The extended kitchen boasts integral appliances and a breakfast bar, while three bedrooms on the upper floors provide comfort. A principle bedroom with an ensuite awaits on the second floor. Outdoors, an expansive garden and storage unit offer convenience. With off-road parking, this home is nestled near Pinner Village, providing easy access to shopping, transport links, and quality schools. Experience exceptional living – book a viewing today.',
    photo:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: '250000',
  },
  {
    id: '2c15c4c1-1dd3-4ca0-8f78-0324c32eb25d',
    houseNumber: '456',
    streetName: 'Oak Avenue',
    city: 'Townsville',
    country: 'Countryland',
    postalCode: '67890',
    propertyType: 'Flat',
    bedrooms: 2,
    bathrooms: 1,
    description:
      'Step into a beautifully maintained family residence, showcasing elegant design and thoughtful features. The welcoming entrance leads to a charming dining room and extended living area that seamlessly connects to a private rear garden. The well-designed kitchen, extended to perfection, boasts integral appliances and a breakfast bar. Upstairs, three spacious bedrooms include a master bedroom with fitted wardrobes, while a well-appointed bathroom suite ensures relaxation. The second floor reveals a luxurious principle bedroom with an ensuite. Outside, an expansive garden and convenient storage unit await. With off-road parking, this home is conveniently situated near Pinner Village, offering access to shopping, transport links, and quality schools. Elevate your living experience – arrange a viewing today.',
    photo:
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: '150000',
  },
];

export const mockNewProperty: Property = {
  id: 'uuidv4()',
  houseNumber: '1000',
  streetName: 'Flowers Road',
  city: 'Villagetown',
  country: 'Countryland',
  postalCode: '54321',
  propertyType: 'Semi-detached',
  bedrooms: 4,
  bathrooms: 2,
  description: 'Charming house with a garden.',
  photo:
    'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  price: '480000',
};

import { v4 as uuidv4 } from 'uuid';
import { Property } from '../types/types';

export const properties: Property[] = [
  {
    id: uuidv4(),
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
    id: uuidv4(),
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
      'https://media.istockphoto.com/id/1436217023/photo/exterior-of-a-blue-suburban-home.jpg?s=170667a&w=0&k=20&c=nCVY3g1t4Iz17Zs1PU46LDbp7IGEPjXUbMI8RTKsSrc=',
    price: '150000',
  },
  {
    id: uuidv4(),
    houseNumber: '789',
    streetName: 'Maple Lane',
    city: 'Villagetown',
    country: 'Countryland',
    postalCode: '54321',
    propertyType: 'Terraced',
    bedrooms: 4,
    bathrooms: 3,
    description:
      "Explore this charming terraced house that offers a perfect blend of modern living and traditional elegance. The welcoming entrance leads to a spacious living room and a stylishly designed kitchen with top-of-the-line appliances. Upstairs, four well-proportioned bedrooms provide comfort and versatility, and the master bedroom boasts an ensuite bathroom. A beautifully landscaped backyard provides a serene escape, and off-road parking adds convenience. Situated in the heart of Villagetown, this home offers easy access to local amenities, schools, and transportation. Don't miss the opportunity to make this your new home!",
    photo:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    price: '300000',
  },
];

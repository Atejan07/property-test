import { formatPrice } from '../helperFunctions/helperFunctions';
import { Property } from '../types/types';
import './PropertyListing.css';

const defaultPhoto =
  'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

interface PropertyListingProps {
  properties: Property[];
}

function PropertyListing({ properties }: PropertyListingProps) {
  return (
    <>
      <h1>Properties for sale</h1>
      <div className='listingContainer'>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property.id}
              className='propertyItem'
              data-testid='propertyItem'
            >
              <div className='photoContainer'>
                <img
                  src={property.photo || defaultPhoto}
                  alt={property.photo}
                />
              </div>
              <div className='propertyDetails'>
                <h3>{property.bedrooms} bedrooms for sale</h3>
                <p>{property.propertyType}</p>
                <h2>{formatPrice(property.price)}</h2>
                <p>{property.description}</p>
                <p id='address'>
                  {property.streetName}, {property.city}, {property.postalCode}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='listingContainer'>
            <h2>Sorry, there are no properties today.</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default PropertyListing;

import { ChangeEvent, FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { validateForm } from '../helperFunctions/helperFunctions';
import apiService from '../API/apiServices';
import { Error, Property, PropertyTypes, propertyTypes } from '../types/types';
import 'react-toastify/dist/ReactToastify.css';
import './AddProperty.css';

interface AddPropertyProps {
  updateProperties: (newProperty: Property) => void;
}

const initialState: Property = {
  id: '',
  houseNumber: '',
  streetName: '',
  city: '',
  country: '',
  postalCode: '',
  propertyType: 'Detached',
  bedrooms: 1,
  bathrooms: 1,
  description: '',
  photo: '',
  price: '',
};

const initialErrorState: Error = {
  houseNumber: '',
  streetName: '',
  city: '',
  country: '',
  postalCode: '',
  bedrooms: '',
  bathrooms: '',
  description: '',
  photo: '',
  price: '',
};

function AddProperty({ updateProperties }: AddPropertyProps) {
  const [newProperty, setNewProperty] = useState<Property>(initialState);
  const [propertyType, setPropertyType] = useState<PropertyTypes>('Detached');

  const [errors, setErrors] = useState(initialErrorState);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setNewProperty((prevProperties) => ({
      ...prevProperties,
      [name as string]: value,
    }));
  }

  async function handleImage(fileInput: HTMLInputElement) {
    try {
      if (!fileInput || !fileInput.files || fileInput.files.length === 0)
        return;
      const file = fileInput.files[0];
      const data = new FormData();
      data.append('my_file', file);
      const res = await apiService.saveImage(data);
      return res.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement>
  ) {
    try {
      e.preventDefault();

      // Validate form:
      const errors = validateForm(newProperty);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        notifyError('Please complete all the fields correctly.');
        return;
      }

      // Handle image upload:
      const fileInput = e.currentTarget.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      newProperty.photo = await handleImage(fileInput);

      newProperty.propertyType = propertyType;
      const addPropertyResponse = await apiService.addProperty(newProperty);
      const { message, response } = addPropertyResponse;

      // Clear inputs:
      setNewProperty(initialState);

      if (response) {
        // Handle error:
        const errorMessage = response.data.message;
        notifyError(errorMessage);
      } else {
        notifySuccess(message);
        updateProperties(newProperty);
        setErrors(initialErrorState);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='addProperty'>
      <ToastContainer
        position='top-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <h1>Add your property</h1>
      <div className='formContainer'>
        <form className='formContainer' onSubmit={handleSubmit}>
          <div className='formFields'>
            <div className='columnField'>
              <div className='formField'>
                <h2>Address</h2>
                <label htmlFor='houseNumber'>House Number</label>
                <input
                  id='houseNumber'
                  type='text'
                  name='houseNumber'
                  value={newProperty.houseNumber}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.houseNumber}</div>
              <div className='formField'>
                <label htmlFor='streetName'>Street Name</label>
                <input
                  id='streetName'
                  type='text'
                  name='streetName'
                  value={newProperty.streetName}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.streetName}</div>
              <div className='formField'>
                <label htmlFor='city'>City</label>
                <input
                  id='city'
                  type='text'
                  name='city'
                  value={newProperty.city}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.city}</div>
              <div className='formField'>
                <label htmlFor='country'>Country</label>
                <input
                  id='country'
                  type='text'
                  name='country'
                  value={newProperty.country}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.country}</div>
              <div className='formField'>
                <label htmlFor='postalCode'>Postal Code</label>
                <input
                  id='postalCode'
                  type='text'
                  name='postalCode'
                  value={newProperty.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.postalCode}</div>
            </div>
            <div className='columnField'>
              <h2>Details</h2>
              <div className='formField'>
                <label htmlFor='propertyType'>Property Type</label>
                <select
                  id='propertyType'
                  name='propertyType'
                  onChange={(e) =>
                    setPropertyType(e.target.value as PropertyTypes)
                  }
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className='formField'>
                <label htmlFor='bedrooms'>Bedrooms</label>
                <input
                  id='bedrooms'
                  type='number'
                  name='bedrooms'
                  value={newProperty.bedrooms}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.bedrooms}</div>
              <div className='formField'>
                <label htmlFor='bathrooms'>Bathrooms</label>
                <input
                  id='bathrooms'
                  type='number'
                  name='bathrooms'
                  value={newProperty.bathrooms}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.bathrooms}</div>
              <div className='formField'>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  name='description'
                  rows={5}
                  value={newProperty.description}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.description}</div>
              <div className='formField'>
                <label htmlFor='price'>Price</label>
                <input
                  id='price'
                  type='text'
                  name='price'
                  value={newProperty.price}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.price}</div>
              <div className='formField'>
                <label htmlFor='photo'>Photo</label>
                <input
                  id='photo'
                  type='file'
                  name='photo'
                  accept='image/*'
                  value={newProperty.photo}
                  onChange={handleChange}
                />
              </div>
              <div className='errorMessage'>{errors && errors.photo}</div>
            </div>
          </div>
          <div className='buttonContainer'>
            <button type='submit'>Add property</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;

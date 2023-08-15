import axios, { AxiosResponse } from 'axios';
import { Property } from '../types/types';

const PORT = process.env.PORT || 'http://localhost:3001';

async function getProperties() {
  return axios
    .get(PORT + '/properties', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

async function addProperty(propertyObj: Property) {
  return axios
    .post(PORT + '/properties', JSON.stringify(propertyObj), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((res: AxiosResponse) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      console.log('here');
      return error;
    });
}

async function saveImage(imageData: {}) {
  console.log({ imageData });
  return axios
    .post(PORT + '/upload', imageData)
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
}

const apiService = {
  getProperties,
  addProperty,
  saveImage,
};

export default apiService;

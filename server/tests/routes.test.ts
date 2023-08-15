import request from 'supertest';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../index';
import { mockNewProperty, mockProperties } from './mockDb';
import { Property } from '../types/types';

let server;

beforeAll(() => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
});

describe('Get properties listing', () => {
  test('GET /properties response should have status code of 200', async () => {
    const response = await request(server).get('/properties');
    expect(response.statusCode).toBe(200);
  });

  test('GET /properties should return an array of objects', async () => {
    const response = await request(server).get('/properties');
    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((item: Property) =>
      expect(typeof item).toBe('object')
    );
  });

  test('GET /properties should return a list of properties with address, photo and price', async () => {
    const response = await request(server).get('/properties');
    const result = response.body[0];
    expect(result.streetName).toEqual(mockProperties[0].streetName);
    expect(result.propertyType).toEqual(mockProperties[0].propertyType);
    expect(result.photo).toEqual(mockProperties[0].photo);
    expect(result.price).toEqual(mockProperties[0].price);
  });
});

describe('Add property to properties listing', () => {
  test('POST /properties response should have status code of 200', async () => {
    const property = mockNewProperty;
    const response = await request(server)
      .post('/properties')
      .send(property)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(201);
  });

  test('POST /properties should return a message when property is addedd successfully', async () => {
    const property = mockNewProperty;
    const response = await request(server)
      .post('/properties')
      .send(property)
      .set('Accept', 'application/json');

    expect(response.body.message).toBe(
      'Property added to the list successfully.'
    );
  });

  test('POST /properties should return a message when property address already exists', async () => {
    const property = mockNewProperty;
    const response = await request(server)
      .post('/properties')
      .send(property)
      .set('Accept', 'application/json');

    expect(response.body.message).toBe(
      'There is already a property with this address.'
    );
  });

  test('POST /properties should return a list of updated properties with address, photo and price', async () => {
    const property = mockNewProperty;
    const response = await request(server)
      .post('/properties')
      .send(property)
      .set('Accept', 'application/json');

    const firstProperty = response.body.result[0];
    const addedProperty = response.body.result[response.body.result.length - 1];

    expect(firstProperty.streetName).toEqual(mockProperties[0].streetName);
    expect(firstProperty.propertyType).toEqual(mockProperties[0].propertyType);
    expect(firstProperty.photo).toEqual(mockProperties[0].photo);
    expect(firstProperty.price).toEqual(mockProperties[0].price);

    expect(addedProperty.streetName).toEqual('Garden Road');
    expect(addedProperty.propertyType).toEqual('Semi-detached');
    expect(addedProperty.photo).toEqual(property.photo);
    expect(addedProperty.price).toEqual(property.price);
  });
});

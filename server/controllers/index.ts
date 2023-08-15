import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { handleUpload } from '../cloudinary/cloudinary';
import { checkEmptyProperty } from '../helperFunctions/helperFunctions';
import { addPropertyModel, getPropertiesModel } from '../models';
import { Property } from '../types/types';

export async function getAllProperties(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const propertiesListing = await getPropertiesModel();
    // Return a list of all properties:
    res.status(200).send(propertiesListing);
  } catch (error) {
    next(error);
  }
}

export async function addProperty(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      houseNumber,
      streetName,
      city,
      country,
      postalCode,
      propertyType,
      bedrooms,
      bathrooms,
      description,
      photo,
      price,
    } = req.body;

    // Handle empty fields:
    if (checkEmptyProperty(req.body))
      return res.status(400).json({ error: 'All fields are required' });

    const newProperty: Property = {
      id: uuidv4(),
      houseNumber,
      streetName,
      city,
      country,
      postalCode,
      propertyType,
      bedrooms,
      bathrooms,
      description,
      photo,
      price,
    };

    // Add the property object to the listing:
    const propertiesListing = await addPropertyModel(newProperty as Property);

    // Handle duplicate addresses:
    if (propertiesListing === 'Duplicate address') {
      res.status(400).json({
        message: 'There is already a property with this address.',
      });
    } else {
      // Return the updated list of properties:
      res.status(201).json({
        message: 'Property added to the list successfully.',
        result: propertiesListing,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) {
      throw new Error('No file uploaded.');
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error: any) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProperty = exports.getAllProperties = void 0;
const models_1 = require("../models");
const uuid_1 = require("uuid");
function getAllProperties(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const properties = yield (0, models_1.getPropertiesModel)();
            res.status(200).send(properties);
            // return a list of all properties
        }
        catch (error) {
            // res.status(400).json({ error: 'Failed to get the list of properties' });
            next(error);
        }
    });
}
exports.getAllProperties = getAllProperties;
function addProperty(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // accept property object
            const { houseNumber, streetName, city, country, postalCode, propertyType, bedrooms, bathrooms, description, photo, price, } = req.body;
            // handle errors:
            if (!houseNumber ||
                !streetName ||
                !city ||
                !country ||
                !postalCode ||
                !propertyType ||
                !bedrooms ||
                !bathrooms ||
                !description ||
                !photo ||
                !price) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            const newProperty = {
                id: (0, uuid_1.v4)(),
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
            // add the property to the listing
            const createProperty = yield (0, models_1.addPropertyModel)(newProperty);
            if (createProperty === 'Duplicate address') {
                res.status(401).json({
                    message: 'There is already a property with this address',
                });
            }
            else {
                // return the updated list of properties
                res.status(201).json({
                    message: 'Property added to the list successfully',
                    result: createProperty,
                });
            }
        }
        catch (error) {
            // res.status(400).json({ error: 'Failed to add the property to the list' });
            next(error);
        }
    });
}
exports.addProperty = addProperty;

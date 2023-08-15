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
exports.addPropertyModel = exports.getPropertiesModel = void 0;
const db_1 = require("../db/db");
function getPropertiesModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return db_1.properties;
        }
        catch (error) {
            throw new Error('Failed to fetch properties from the database');
        }
    });
}
exports.getPropertiesModel = getPropertiesModel;
function addPropertyModel(property) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validate = checkDuplicateProperty(property);
            if (validate) {
                return 'Duplicate address';
            }
            else {
                db_1.properties.push(property);
                return db_1.properties;
            }
        }
        catch (error) {
            throw new Error('Failed to add property to the database');
        }
    });
}
exports.addPropertyModel = addPropertyModel;
function checkDuplicateProperty(property) {
    return db_1.properties.some((prop) => {
        return (prop.houseNumber === property.houseNumber &&
            prop.streetName === property.streetName &&
            prop.city === property.city &&
            prop.country === property.country &&
            prop.postalCode === property.postalCode &&
            prop.propertyType === property.propertyType);
    });
}

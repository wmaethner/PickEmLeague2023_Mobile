/* tslint:disable */
/* eslint-disable */
/**
 * Pick Em League Swagger
 * Welcome to the Swagger UI documentation site!
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { MiscSchema } from './MiscSchema';
import {
    MiscSchemaFromJSON,
    MiscSchemaFromJSONTyped,
    MiscSchemaToJSON,
} from './MiscSchema';

/**
 * 
 * @export
 * @interface MiscModel
 */
export interface MiscModel {
    /**
     * 
     * @type {boolean}
     * @memberof MiscModel
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof MiscModel
     */
    message?: string;
    /**
     * 
     * @type {MiscSchema}
     * @memberof MiscModel
     */
    data?: MiscSchema;
}

/**
 * Check if a given object implements the MiscModel interface.
 */
export function instanceOfMiscModel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MiscModelFromJSON(json: any): MiscModel {
    return MiscModelFromJSONTyped(json, false);
}

export function MiscModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): MiscModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'success': !exists(json, 'success') ? undefined : json['success'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : MiscSchemaFromJSON(json['data']),
    };
}

export function MiscModelToJSON(value?: MiscModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'success': value.success,
        'message': value.message,
        'data': MiscSchemaToJSON(value.data),
    };
}


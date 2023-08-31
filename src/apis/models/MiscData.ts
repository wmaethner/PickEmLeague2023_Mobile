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
/**
 * 
 * @export
 * @interface MiscData
 */
export interface MiscData {
    /**
     * 
     * @type {boolean}
     * @memberof MiscData
     */
    started?: boolean;
}

/**
 * Check if a given object implements the MiscData interface.
 */
export function instanceOfMiscData(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MiscDataFromJSON(json: any): MiscData {
    return MiscDataFromJSONTyped(json, false);
}

export function MiscDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): MiscData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'started': !exists(json, 'started') ? undefined : json['started'],
    };
}

export function MiscDataToJSON(value?: MiscData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'started': value.started,
    };
}

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
import type { MiscData } from './MiscData';
import {
    MiscDataFromJSON,
    MiscDataFromJSONTyped,
    MiscDataToJSON,
} from './MiscData';

/**
 * 
 * @export
 * @interface MiscResult
 */
export interface MiscResult {
    /**
     * 
     * @type {boolean}
     * @memberof MiscResult
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof MiscResult
     */
    message?: string;
    /**
     * 
     * @type {MiscData}
     * @memberof MiscResult
     */
    data?: MiscData;
}

/**
 * Check if a given object implements the MiscResult interface.
 */
export function instanceOfMiscResult(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MiscResultFromJSON(json: any): MiscResult {
    return MiscResultFromJSONTyped(json, false);
}

export function MiscResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): MiscResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'success': !exists(json, 'success') ? undefined : json['success'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : MiscDataFromJSON(json['data']),
    };
}

export function MiscResultToJSON(value?: MiscResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'success': value.success,
        'message': value.message,
        'data': MiscDataToJSON(value.data),
    };
}

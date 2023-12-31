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
import type { GamePickSchema } from './GamePickSchema';
import {
    GamePickSchemaFromJSON,
    GamePickSchemaFromJSONTyped,
    GamePickSchemaToJSON,
} from './GamePickSchema';

/**
 * 
 * @export
 * @interface GamePickListModel
 */
export interface GamePickListModel {
    /**
     * 
     * @type {boolean}
     * @memberof GamePickListModel
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof GamePickListModel
     */
    message?: string;
    /**
     * 
     * @type {Array<GamePickSchema>}
     * @memberof GamePickListModel
     */
    data?: Array<GamePickSchema>;
}

/**
 * Check if a given object implements the GamePickListModel interface.
 */
export function instanceOfGamePickListModel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GamePickListModelFromJSON(json: any): GamePickListModel {
    return GamePickListModelFromJSONTyped(json, false);
}

export function GamePickListModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GamePickListModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'success': !exists(json, 'success') ? undefined : json['success'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(GamePickSchemaFromJSON)),
    };
}

export function GamePickListModelToJSON(value?: GamePickListModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'success': value.success,
        'message': value.message,
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(GamePickSchemaToJSON)),
    };
}


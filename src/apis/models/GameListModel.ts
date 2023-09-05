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
import type { GameSchema } from './GameSchema';
import {
    GameSchemaFromJSON,
    GameSchemaFromJSONTyped,
    GameSchemaToJSON,
} from './GameSchema';

/**
 * 
 * @export
 * @interface GameListModel
 */
export interface GameListModel {
    /**
     * 
     * @type {boolean}
     * @memberof GameListModel
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof GameListModel
     */
    message?: string;
    /**
     * 
     * @type {Array<GameSchema>}
     * @memberof GameListModel
     */
    data?: Array<GameSchema>;
}

/**
 * Check if a given object implements the GameListModel interface.
 */
export function instanceOfGameListModel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GameListModelFromJSON(json: any): GameListModel {
    return GameListModelFromJSONTyped(json, false);
}

export function GameListModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameListModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'success': !exists(json, 'success') ? undefined : json['success'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(GameSchemaFromJSON)),
    };
}

export function GameListModelToJSON(value?: GameListModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'success': value.success,
        'message': value.message,
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(GameSchemaToJSON)),
    };
}


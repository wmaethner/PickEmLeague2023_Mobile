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
import type { TeamSchema } from './TeamSchema';
import {
    TeamSchemaFromJSON,
    TeamSchemaFromJSONTyped,
    TeamSchemaToJSON,
} from './TeamSchema';

/**
 * 
 * @export
 * @interface TeamListModel
 */
export interface TeamListModel {
    /**
     * 
     * @type {boolean}
     * @memberof TeamListModel
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof TeamListModel
     */
    message?: string;
    /**
     * 
     * @type {Array<TeamSchema>}
     * @memberof TeamListModel
     */
    data?: Array<TeamSchema>;
}

/**
 * Check if a given object implements the TeamListModel interface.
 */
export function instanceOfTeamListModel(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TeamListModelFromJSON(json: any): TeamListModel {
    return TeamListModelFromJSONTyped(json, false);
}

export function TeamListModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): TeamListModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'success': !exists(json, 'success') ? undefined : json['success'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(TeamSchemaFromJSON)),
    };
}

export function TeamListModelToJSON(value?: TeamListModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'success': value.success,
        'message': value.message,
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(TeamSchemaToJSON)),
    };
}


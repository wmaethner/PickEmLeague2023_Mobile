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
import type { UserSchema } from './UserSchema';
import {
    UserSchemaFromJSON,
    UserSchemaFromJSONTyped,
    UserSchemaToJSON,
} from './UserSchema';

/**
 * 
 * @export
 * @interface MessageSchema
 */
export interface MessageSchema {
    /**
     * 
     * @type {number}
     * @memberof MessageSchema
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof MessageSchema
     */
    text?: string;
    /**
     * 
     * @type {UserSchema}
     * @memberof MessageSchema
     */
    user?: UserSchema;
    /**
     * 
     * @type {string}
     * @memberof MessageSchema
     */
    createdAt?: string;
}

/**
 * Check if a given object implements the MessageSchema interface.
 */
export function instanceOfMessageSchema(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MessageSchemaFromJSON(json: any): MessageSchema {
    return MessageSchemaFromJSONTyped(json, false);
}

export function MessageSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): MessageSchema {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'text': !exists(json, 'text') ? undefined : json['text'],
        'user': !exists(json, 'user') ? undefined : UserSchemaFromJSON(json['user']),
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
    };
}

export function MessageSchemaToJSON(value?: MessageSchema | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'text': value.text,
        'user': UserSchemaToJSON(value.user),
        'created_at': value.createdAt,
    };
}


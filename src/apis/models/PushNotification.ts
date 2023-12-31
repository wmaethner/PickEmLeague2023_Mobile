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
 * @interface PushNotification
 */
export interface PushNotification {
    /**
     * 
     * @type {number}
     * @memberof PushNotification
     */
    userId?: number;
    /**
     * 
     * @type {string}
     * @memberof PushNotification
     */
    message?: string;
}

/**
 * Check if a given object implements the PushNotification interface.
 */
export function instanceOfPushNotification(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PushNotificationFromJSON(json: any): PushNotification {
    return PushNotificationFromJSONTyped(json, false);
}

export function PushNotificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): PushNotification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function PushNotificationToJSON(value?: PushNotification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userId': value.userId,
        'message': value.message,
    };
}


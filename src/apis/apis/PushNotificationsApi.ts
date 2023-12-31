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


import * as runtime from '../runtime';
import type {
  PushNotification,
  PushNotificationToken,
} from '../models';
import {
    PushNotificationFromJSON,
    PushNotificationToJSON,
    PushNotificationTokenFromJSON,
    PushNotificationTokenToJSON,
} from '../models';

export interface PostNotificationsRequest {
    payload: PushNotification;
}

export interface PutNotificationsRequest {
    payload: PushNotificationToken;
}

/**
 * 
 */
export class PushNotificationsApi extends runtime.BaseAPI {

    /**
     */
    async postNotificationsRaw(requestParameters: PostNotificationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.payload === null || requestParameters.payload === undefined) {
            throw new runtime.RequiredError('payload','Required parameter requestParameters.payload was null or undefined when calling postNotifications.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/push_notifications/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PushNotificationToJSON(requestParameters.payload),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async postNotifications(requestParameters: PostNotificationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postNotificationsRaw(requestParameters, initOverrides);
    }

    /**
     */
    async putNotificationsRaw(requestParameters: PutNotificationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.payload === null || requestParameters.payload === undefined) {
            throw new runtime.RequiredError('payload','Required parameter requestParameters.payload was null or undefined when calling putNotifications.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/push_notifications/`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PushNotificationTokenToJSON(requestParameters.payload),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async putNotifications(requestParameters: PutNotificationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.putNotificationsRaw(requestParameters, initOverrides);
    }

}

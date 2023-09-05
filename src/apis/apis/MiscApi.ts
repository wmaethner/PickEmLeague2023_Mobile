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
  MiscModel,
} from '../models';
import {
    MiscModelFromJSON,
    MiscModelToJSON,
} from '../models';

/**
 * 
 */
export class MiscApi extends runtime.BaseAPI {

    /**
     */
    async getMiscInfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MiscModel>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/misc`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MiscModelFromJSON(jsonValue));
    }

    /**
     */
    async getMiscInfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MiscModel> {
        const response = await this.getMiscInfoRaw(initOverrides);
        return await response.value();
    }

}

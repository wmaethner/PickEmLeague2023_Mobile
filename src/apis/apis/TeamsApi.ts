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
  TeamListModel,
} from '../models';
import {
    TeamListModelFromJSON,
    TeamListModelToJSON,
} from '../models';

export interface PostTeamListRequest {
    teamFile: Blob;
}

/**
 * 
 */
export class TeamsApi extends runtime.BaseAPI {

    /**
     */
    async getTeamListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TeamListModel>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/teams`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TeamListModelFromJSON(jsonValue));
    }

    /**
     */
    async getTeamList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TeamListModel> {
        const response = await this.getTeamListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async postTeamListRaw(requestParameters: PostTeamListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.teamFile === null || requestParameters.teamFile === undefined) {
            throw new runtime.RequiredError('teamFile','Required parameter requestParameters.teamFile was null or undefined when calling postTeamList.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = canConsumeForm;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.teamFile !== undefined) {
            formParams.append('team-file', requestParameters.teamFile as any);
        }

        const response = await this.request({
            path: `/teams`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async postTeamList(requestParameters: PostTeamListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postTeamListRaw(requestParameters, initOverrides);
    }

}

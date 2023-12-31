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
  GameListModel,
  GameModel,
  GameSchema,
} from '../models';
import {
    GameListModelFromJSON,
    GameListModelToJSON,
    GameModelFromJSON,
    GameModelToJSON,
    GameSchemaFromJSON,
    GameSchemaToJSON,
} from '../models';

export interface GetGameByIdRequest {
    id: number;
}

export interface GetGameByWeekAndTeamRequest {
    abbr: string;
    week: string;
}

export interface GetGamesByWeekRequest {
    week: number;
}

export interface PostGameListRequest {
    gameFile: Blob;
}

export interface PutGameByIdRequest {
    id: number;
    payload: GameSchema;
}

/**
 * 
 */
export class GamesApi extends runtime.BaseAPI {

    /**
     */
    async getGameByIdRaw(requestParameters: GetGameByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GameModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getGameById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/games/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GameModelFromJSON(jsonValue));
    }

    /**
     */
    async getGameById(requestParameters: GetGameByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GameModel> {
        const response = await this.getGameByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getGameByWeekAndTeamRaw(requestParameters: GetGameByWeekAndTeamRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GameModel>> {
        if (requestParameters.abbr === null || requestParameters.abbr === undefined) {
            throw new runtime.RequiredError('abbr','Required parameter requestParameters.abbr was null or undefined when calling getGameByWeekAndTeam.');
        }

        if (requestParameters.week === null || requestParameters.week === undefined) {
            throw new runtime.RequiredError('week','Required parameter requestParameters.week was null or undefined when calling getGameByWeekAndTeam.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/games/{week}/{abbr}`.replace(`{${"abbr"}}`, encodeURIComponent(String(requestParameters.abbr))).replace(`{${"week"}}`, encodeURIComponent(String(requestParameters.week))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GameModelFromJSON(jsonValue));
    }

    /**
     */
    async getGameByWeekAndTeam(requestParameters: GetGameByWeekAndTeamRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GameModel> {
        const response = await this.getGameByWeekAndTeamRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve a list of games
     */
    async getGameListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GameListModel>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/games`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GameListModelFromJSON(jsonValue));
    }

    /**
     * Retrieve a list of games
     */
    async getGameList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GameListModel> {
        const response = await this.getGameListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getGamesByWeekRaw(requestParameters: GetGamesByWeekRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GameListModel>> {
        if (requestParameters.week === null || requestParameters.week === undefined) {
            throw new runtime.RequiredError('week','Required parameter requestParameters.week was null or undefined when calling getGamesByWeek.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/games/by_week/{week}`.replace(`{${"week"}}`, encodeURIComponent(String(requestParameters.week))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GameListModelFromJSON(jsonValue));
    }

    /**
     */
    async getGamesByWeek(requestParameters: GetGamesByWeekRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GameListModel> {
        const response = await this.getGamesByWeekRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async postGameListRaw(requestParameters: PostGameListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.gameFile === null || requestParameters.gameFile === undefined) {
            throw new runtime.RequiredError('gameFile','Required parameter requestParameters.gameFile was null or undefined when calling postGameList.');
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

        if (requestParameters.gameFile !== undefined) {
            formParams.append('game-file', requestParameters.gameFile as any);
        }

        const response = await this.request({
            path: `/games`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async postGameList(requestParameters: PostGameListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postGameListRaw(requestParameters, initOverrides);
    }

    /**
     */
    async putGameByIdRaw(requestParameters: PutGameByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling putGameById.');
        }

        if (requestParameters.payload === null || requestParameters.payload === undefined) {
            throw new runtime.RequiredError('payload','Required parameter requestParameters.payload was null or undefined when calling putGameById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/games/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: GameSchemaToJSON(requestParameters.payload),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async putGameById(requestParameters: PutGameByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.putGameByIdRaw(requestParameters, initOverrides);
    }

}

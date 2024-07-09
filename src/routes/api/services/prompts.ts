import { BOT_CONTENT_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createPrompts = async (
    sessionId: string,
    name: string,
    description: string,
    useCaseType: string,
    group: string,
    model: string,
    prompt: string,
    variable: string,
    temperature: string,
    frequencyPenalty: string,
    topP: string,
    presencePenalty: string,
    createdByUserId: string,
    isActive: boolean = true
) => {
    const body = {
        Name: name,
        Description: description ? description : null,
        UseCaseType: useCaseType ? useCaseType : null,
        Group: group ? group : null,
        Model: model ? model : null,
        Prompt: prompt ? prompt : null,
        Variables: variable ? variable : null,
        Temperature: temperature ? temperature : null,
        FrequencyPenalty: frequencyPenalty ? frequencyPenalty : null,
        TopP: topP ? topP : null,
        PresencePenalty: presencePenalty ? presencePenalty : null,
        CreatedByUserId: createdByUserId ? createdByUserId : null,
        IsActive: isActive
    };
    const url = BOT_CONTENT_API_URL + '/llm-prompts';
    return await post_(sessionId, url, body, true);
};

export const getPromptsById = async (sessionId: string, promptId: string) => {
    const url = BOT_CONTENT_API_URL + `/llm-prompts/${promptId}`;
    return await get_(sessionId, url, true);
};

export const searchPrompts = async (sessionId: string, searchParams?: any) => {
    let searchString = '';
    if (searchParams) {
        const keys = Object.keys(searchParams);
        if (keys.length > 0) {
            searchString = '?';
            const params = [];
            for (const key of keys) {
                if (searchParams[key]) {
                    const param = `${key}=${searchParams[key]}`;
                    params.push(param);
                }
            }
            searchString += params.join('&');
        }
    }
    const url = BOT_CONTENT_API_URL + `/llm-prompts/search${searchString}`;
    return await get_(sessionId, url, true);
};

export const updatePrompts = async (
    sessionId: string,
    promptId: string,
    name: string,
    description: string,
    useCaseType: string,
    group: string,
    model: string,
    prompt: string,
    variables: string,
    temperature: string,
    frequencyPenalty: string,
    topP: string,
    presencePenalty: string,
    createdByUserId: string,
    isActive: boolean = true
) => {
    const body = {
        Name: name,
        Description: description,
        UseCaseType: useCaseType,
        Group: group,
        Model: model,
        Prompt: prompt,
        Variables: variables ? variables : null,
        Temperature: temperature ? temperature : null,
        FrequencyPenalty: frequencyPenalty ? frequencyPenalty : null,
        TopP: topP ? topP : null,
        PresencePenalty: presencePenalty ? presencePenalty : null,
        CreatedByUserId: createdByUserId ? createdByUserId : null,
        IsActive: isActive
    };
    const url = BOT_CONTENT_API_URL + `/llm-prompts/${promptId}`;
    return await put_(sessionId, url, body, true);
};

export const deletePrompts = async (sessionId: string, promptId: string) => {
    const url = BOT_CONTENT_API_URL + `/llm-prompts/${promptId}`;
    return await delete_(sessionId, url, true);
};

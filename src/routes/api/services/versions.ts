import { BOT_CONTENT_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createVersions = async (
    sessionId: string,
    name: string,
    score: number = 12,
    description: string,
    useCaseType: string,
    group: string,
    model: string,
    prompt: string,
    variable: string,
    temperature: string,
    frequencyPenalty: string,
    topP: string,
    presencePenalty: string
    // createdByUserId: string,
    // isActive: boolean = true
) => {
    const body = {
        Name: name,
        Score: score ? score : null,
        Description: description ? description : null,
        UseCaseType: useCaseType ? useCaseType : null,
        Group: group ? group : null,
        Model: model ? model : null,
        Prompt: prompt ? prompt : null,
        Variables: variable ? variable : null,
        Temperature: temperature ? temperature : null,
        FrequencyPenalty: frequencyPenalty ? frequencyPenalty : null,
        TopP: topP ? topP : null,
        PresencePenalty: presencePenalty ? presencePenalty : null
        // CreatedByUserId: createdByUserId ? createdByUserId : null,
        // IsActive: isActive
    };
    const url = BOT_CONTENT_API_URL + '/llm-prompt-versions';
    return await post_(sessionId, url, body, true);
};

export const getVersionsById = async (sessionId: string, versionId: string) => {
    const url = BOT_CONTENT_API_URL + `/llm-prompt-versions/${versionId}`;
    return await get_(sessionId, url, true);
};

export const searchVersions = async (sessionId: string, searchParams?: any) => {
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
    const url = BOT_CONTENT_API_URL + `/llm-prompt-versions/search${searchString}`;
    return await get_(sessionId, url, true);
};

export const updateVersions = async (
    sessionId: string,
    versionId: string,
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
    presencePenalty: string
    // createdByUserId: string,
    // isActive: boolean = true
    
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
        PresencePenalty: presencePenalty ? presencePenalty : null
        // CreatedByUserId: createdByUserId ? createdByUserId : null,
        // IsActive: isActive
    };
   
    console.log('body',body);
    
    const url = BOT_CONTENT_API_URL + `/llm-prompt-versions/${versionId}`;
    return await put_(sessionId, url, body, true);
};

export const deleteVersions = async (sessionId: string, versionId: string) => {
    const url = BOT_CONTENT_API_URL + `/llm-prompt-versions/${versionId}`;
    return await delete_(sessionId, url, true);
};

import { BOT_CONTENT_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createGroups = async (
    sessionId: string,
    name: string,
    description: string,
   
) => {
    const body = {
        Name: name,
        Description: description ? description : null,
    };
    const url = BOT_CONTENT_API_URL + '/llm-prompt-groups';
    return await post_(sessionId, url, body, true);
};

export const getGroupsById = async (sessionId: string, groupId: string) => {
    const url = BOT_CONTENT_API_URL + `/llm-prompt-groups/${groupId}`;
    return await get_(sessionId, url, true);
};

export const searchGroups = async (sessionId: string, searchParams?: any) => {
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
    const url = BOT_CONTENT_API_URL + `/llm-prompt-groups/search${searchString}`;
    return await get_(sessionId, url, true);
};

export const updateGroups = async (
    sessionId: string,
    groupId: string,
    name: string,
    description: string   
) => {
    const body = {
        Name: name,
        Description: description,

    };
    const url = BOT_CONTENT_API_URL + `/llm-prompt-groups/${groupId}`;
    return await put_(sessionId, url, body, true);
};

export const deleteGroups = async (sessionId: string, groupId: string) => {
    const url = BOT_CONTENT_API_URL + `/llm-prompt-groups/${groupId}`;
    return await delete_(sessionId, url, true);
};

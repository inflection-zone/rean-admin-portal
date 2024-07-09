import { BOT_CONTENT_API_URL } from '$env/static/private'; // Importing backend API URL from environment
import { delete_, get_, post_, put_ } from './common'; // Importing CRUD operations from a common module

/////////////////////////////////////////////////////////////////////////

export const createDocuments = async (
    sessionId: string,
    name: string,
    description: string,
    fileName: string,
    source: string,
    parentDocument: string,
    parentDocumentVersion: string,
    chunkingStrategy: string,
    chunkingLenght: number,
    chunkOverlap: number,
    splitter: string,
    isActive: boolean,
    createdBy: string
) => {

    const body = {
        Name: name,
        Description: description ? description : null,
        FileName: fileName ? fileName : null,
        Source: source ? source : null,
        ParentDocument: parentDocument ? parentDocument : null,
        ParentDocumentVersion: parentDocumentVersion ? parentDocumentVersion : null,
        ChunkingStrategy: chunkingStrategy ? chunkingStrategy : null,
        ChunkingLenght: chunkingLenght ? chunkingLenght : null,
        ChunkOverlap: chunkOverlap ? chunkOverlap : null,
        Splitter: splitter ? splitter : null,
        IsActive: isActive ? isActive : false,
        CreatedBy: createdBy ? createdBy : null
    };

    const url = BOT_CONTENT_API_URL + '/documents';

    return await post_(sessionId, url, body, true);
};

export const getDocumentsById = async (sessionId: string, documentsId: string) => {
    const url = BOT_CONTENT_API_URL + `/documents/${documentsId}`;

    return await get_(sessionId, url, true);
};

export const searchDocuments = async (sessionId: string, searchParams?: any) => {
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

    const url = BOT_CONTENT_API_URL + `/documents/search${searchString}`;

    return await get_(sessionId, url, true);
};

export const updateDocuments = async (
    sessionId: string,
    documentsId: string,
    name: string,
    description: string,
    fileName: string,
    source: string,
    parentDocument: string,
    parentDocumentVersion: string,
    chunkingStrategy: string,
    chunkingLength: number,
    chunkOverlap: number,
    splitter: string,
    isActive: boolean,
    createdBy: string
) => {
    const body = {
        Name: name,
        Description: description ? description : null,
        FileName: fileName ? fileName : null,
        Source: source ? source : null,
        ParentDocument: parentDocument ? parentDocument : null,
        ParentDocumentVersion: parentDocumentVersion ? parentDocumentVersion : null,
        ChunkingStrategy: chunkingStrategy ? chunkingStrategy : null,
        ChunkingLength: chunkingLength ? chunkingLength : null,
        ChunkOverlap: chunkOverlap ? chunkOverlap : null,
        Splitter: splitter ? splitter : null,
        IsActive: isActive ? isActive : false,
        CreatedBy: createdBy ? createdBy : null
    };

    const url = BOT_CONTENT_API_URL + `/documents/${documentsId}`;

    return await put_(sessionId, url, body, true);
};

export const deleteDocuments = async (sessionId: string, documentsId: string) => {
    const url = BOT_CONTENT_API_URL + `/documents/${documentsId}`;

    return await delete_(sessionId, url, true);
};

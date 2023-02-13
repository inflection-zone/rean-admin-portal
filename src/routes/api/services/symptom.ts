import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createSymptom = async (
  sessionId: string,
  symptom: string,
  description: string,
  tags: string[],
  language: string,
  imageResourceId: string
) => {
  const body = {
    Symptom: symptom,
    Description: description,
    Tags: tags,
    Language: language,
    ImageResourceId: imageResourceId
  };

  const url = BACKEND_API_URL + '/admin-panel/symptom';
  return await post_(sessionId, url, body, true);
};

export const getSymptomById = async (sessionId: string, symptonId: string) => {
  const url = BACKEND_API_URL + `/admin-panel/symptom/${symptonId}`;
  return await get_(sessionId, url, true);
};

export const searchAssets = async (sessionId: string, selectAsset: string, searchParams = '') => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';
    for (var key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = BACKEND_API_URL + `/admin-panel/${selectAsset}/search${searchString}/`;
  return await get_(sessionId, url, true);
};

export const updateSymptom = async (
  sessionId: string,
  symptonId: string,
  symptom: string,
  description: string,
  tags: string[],
  language: string,
  imageResourceId: string
) => {
  const body = {
    Symptom: symptom,
    Description: description,
    Tags: tags,
    Language: language,
    ImageResourceId: imageResourceId
  };
  const url = BACKEND_API_URL + `/admin-panel/symptom/${symptonId}`;
  return await put_(sessionId, url, body, true);
};

export const deleteSymptom = async (sessionId: string, symptonId: string) => {
  const url = BACKEND_API_URL + `/admin-panel/symptom/${symptonId}`;
  return await delete_(sessionId, url, true);
};

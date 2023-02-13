import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createNewsfeed = async (
  sessionId: string,
  type: string,
  title: string,
  description: String,
  date: Date
) => {
  const body = {
    Type: type,
    Title: title,
    Description: description,
    Date: date
  };

  const url = BACKEND_API_URL + '/admin-panel/newsfeed';
  return await post_(sessionId, url, body, true);
};

export const getNewsfeedById = async (sessionId: string, newsfeedId: string) => {
  const url = BACKEND_API_URL + `/admin-panel/newsfeed/${newsfeedId}`;
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

export const updateNewsfeed = async (
  sessionId: string,
  newsfeedId: string,
  type: string,
  title: string,
  description: String,
  date: Date
) => {
  const body = {
    Type: type,
    Title: title,
    Description: description,
    Date: date
  };
  const url = BACKEND_API_URL + `/admin-panel/newsfeed/${newsfeedId}`;
  return await put_(sessionId, url, body, true);
};

export const deleteNewsfeed = async (sessionId: string, newsfeedId: string) => {
  const url = BACKEND_API_URL + `/admin-panel/newsfeed/${newsfeedId}`;
  return await delete_(sessionId, url, true);
};

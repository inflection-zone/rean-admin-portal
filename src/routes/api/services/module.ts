import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createModule = async (
  sessionId: string,
  title: string,
  description: String,
  learningJourney: String,
  course: String,
  contentType: String,
  resourceLink: String
) => {
  const body = {
    Title: title,
    Description: description,
    LearningJourney: learningJourney,
    Course: course,
    ContentType: contentType,
    ResourceLink: resourceLink
  };

  const url = BACKEND_API_URL + '/admin-panel/learning-journey/module';
  return await post_(sessionId, url, body, true);
};

export const getModuleById = async (sessionId: string, moduleId: string) => {
  const url = BACKEND_API_URL + `/admin-panel/learning-journey/module${moduleId}`;
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

export const updateModule = async (
  sessionId: string,
  moduleId: string,
  title: string,
  description: String,
  learningJourney: String,
  course: String,
  contentType: String,
  resourceLink: String
) => {
  const body = {
    Title: title,
    Description: description,
    LearningJourney: learningJourney,
    Course: course,
    ContentType: contentType,
    ResourceLink: resourceLink
  };
  const url = BACKEND_API_URL + `/admin-panel/learning-journey/module${moduleId}`;
  return await put_(sessionId, url, body, true);
};

export const deleteModule = async (sessionId: string, moduleId: string) => {
  const url = BACKEND_API_URL + `/admin-panel/learning-journey/module${moduleId}`;
  return await delete_(sessionId, url, true);
};

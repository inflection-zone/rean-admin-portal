import { CAREPLAN_BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../../common';

////////////////////////////////////////////////////////////////

export const createMeditation = async (
  sessionId: string,
  // assetCode: string,
  name: string,
  description: string,
  meditationtype: string,
  recommendeddurationmin: number,
  tags: string[],
  version: string
) => {
  const body = {
    // AssetCode: assetCode,
    Name: name,
    Description: description,
    MeditationType: meditationtype,
    RecommendedDurationMin: recommendeddurationmin,
    Tags: tags,
    Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };

  const url = CAREPLAN_BACKEND_API_URL + '/assets/meditations';
  return await post_(sessionId, url, body, true);
};

export const getMeditationById = async (sessionId: string, meditationId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/${meditationId}`;
  return await get_(sessionId, url, true);
};

export const searchMeditation = async (sessionId: string, searchParams: any) => {
  let searchString = '';
  const keys = Object.keys(searchParams);
  if (keys.length > 0) {
    searchString = '?';

    for (const key of keys) {
      searchString += `${key}=${searchParams[key]}`;
    }
  }
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/search${searchString}`;
  return await get_(sessionId, url, true);
};

export const updateMeditation = async (
  sessionId: string,
  meditationId: string,
  // assetCode: string,
  name: string,
  description: string,
  meditationtype: string,
  recommendeddurationmin: number,
  tags: string[],

  version: string
) => {
  const body = {
    // AssetCode: assetCode,
    Name: name,
    Description: description,
    MeditationType: meditationtype,
    RecommendedDurationMin: recommendeddurationmin,
    Tags: tags,
    Version: version
  };
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/${meditationId}`;

  return await put_(sessionId, url, body, true);
};

export const deleteMeditation = async (sessionId: string, assetId: string) => {
  const url = CAREPLAN_BACKEND_API_URL + `/assets/meditations/${assetId}`;
  return await delete_(sessionId, url, true);
};

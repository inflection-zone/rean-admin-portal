import { CAREPLAN_BACKEND_API_URL } from "$env/static/private";
import { delete_, get_, post_, put_ } from "../common";

// ////////////////////////////////////////////////////////////////

export const createCarePlanActivity = async (
  sessionId  : string,
  assetType  : string,
  assetId_    : string,
  careplanId : string,
  day        : number,
  timeSlot   : string,
  ) => {
    const url = CAREPLAN_BACKEND_API_URL + '/careplan-activities';
    const body = {
      
      AssetType : assetType,
      AssetId   : assetId_,
      CareplanId: careplanId,
      Day       : day,
      TimeSlot  : timeSlot,
    };
    console.log('body------------------->', body);
    return await post_(sessionId, url, body, true);
};

export const getCarePlanActivityById = async (sessionId: string, careplanActivityId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplan-activities/${careplanActivityId}`;
   
    return await get_(sessionId, url,true);
};

export const searchCarePlanActivities = async (sessionId: string,
    searchParams? : any, 
    ) => {
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
    const url = CAREPLAN_BACKEND_API_URL + `/careplan-activities/search${searchString}`;
    console.log('Timestamp ', new Date().toTimeString());
    console.log('url-> ', url);
    return await get_(sessionId, url, true);
};

export const updateCarePlanActivity = async (
  sessionId  : string,
  careplanActivityId: string,
  assetType  : string,
  assetId_   : string,
  careplanId : string,
  day        : number,
  timeSlot   : string,
  ) => {
    const url = CAREPLAN_BACKEND_API_URL + (`/careplan-activities/${careplanActivityId}`);
  const body = {
      AssetType : assetType,
      AssetId   : assetId_,
      CareplanId: careplanId,
      Day       : day,
      TimeSlot  : timeSlot,
  };
  console.log('url------------------->', body);
  return await put_(sessionId, url, body, true);
};

export const deleteCarePlanActivity = async (sessionId: string, careplanActivityId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplan-activities/${careplanActivityId}`;
    return await delete_(sessionId, url, true);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const searchCareplanCategories = async (sessionId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplan-categories/search`;
    return await get_(sessionId, url, true);
};

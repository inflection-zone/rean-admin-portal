import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {  searchAssets } from '../../../../api/services/careplan/assets/asset';
import { getAssetsType } from '../../../../api/services/careplan/assets/asset';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad  = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
  const assetType = event.params.assetTypes;
  try {
    const response = await searchAssets(sessionId,'action-plans');
    const assets = response.Data.Items;
    const assetTypes = await getAssetsType(sessionId);
    return {
      response,
      assets,
      assetTypes,
      sessionId
    };
  } catch (error) {
    console.error(`Error retriving assets: ${error.message}`);
  }
};

/////////////////////////////////////////////////////////////////////////


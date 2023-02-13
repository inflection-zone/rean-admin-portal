import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getapiKeyManagementById } from '../../../../api/services/admin-panel/api-key-management';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const apiKeyManagementId = event.params.id;
    console.log(apiKeyManagementId);
    const response = await getapiKeyManagementById(sessionId, apiKeyManagementId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const apiKeyManagement = response.Data;
    console.log('api key management', apiKeyManagement);
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      apiKeyManagement,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving api key management: ${error.message}`);
  }
};

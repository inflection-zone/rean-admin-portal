import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getOrganizationById } from '../../../../api/services/admin-panel/organization';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const organizationId = event.params.id;
    console.log(organizationId);
    const response = await getOrganizationById(sessionId, organizationId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const organization = response.Data;
    console.log('organization', organization);
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      organization,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving organization: ${error.message}`);
  }
};

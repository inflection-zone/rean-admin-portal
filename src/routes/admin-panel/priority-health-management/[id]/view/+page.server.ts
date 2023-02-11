import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getpriorityHealthManagementById } from '../../../../api/services/admin-panel/priority-health-management';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const priorityHealthManagementId = event.params.id;
    console.log(priorityHealthManagementId);
    const response = await getpriorityHealthManagementById(sessionId, priorityHealthManagementId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const priorityHealthManagement = response.Data;
    console.log('priorityHealthManagement', priorityHealthManagement);
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      priorityHealthManagement,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving priority health management: ${error.message}`);
  }
};

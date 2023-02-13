import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getModuleById } from '../../../../../api/services/admin-panel/module';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const moduleId = event.params.id;
    console.log(moduleId);
    const response = await getModuleById(sessionId, moduleId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const module = response.Data;
    console.log('module id', module);
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      module,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving module: ${error.message}`);
  }
};

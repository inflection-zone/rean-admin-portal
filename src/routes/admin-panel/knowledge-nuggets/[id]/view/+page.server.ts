import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getknowledgeNuggetsById } from '../../../../api/services/admin-panel/knowledge-nuggets';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const knowledgeNuggetsId = event.params.id;
    console.log(knowledgeNuggetsId);
    const response = await getknowledgeNuggetsById(sessionId, knowledgeNuggetsId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const knowledgeNuggets = response.Data;
    console.log('goal categories management', knowledgeNuggets);
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      knowledgeNuggets,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving knowledge nuggets: ${error.message}`);
  }
};

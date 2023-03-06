import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchKnowledgeNuggets } from '../../../api/services/knowledge-nuggets';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
  try {
    const response = await searchKnowledgeNuggets(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const knowledgeNuggets = response.Data.KnowledgeNuggetRecords.Items;
    console.log("knowledgeNuggets",knowledgeNuggets)
    return {
      knowledgeNuggets,
      sessionId,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving knowledge nuggets: ${error.message}`);
  }
};
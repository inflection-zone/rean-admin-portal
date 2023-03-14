import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchNewsfeeds } from '../../../api/services/newsfeeds';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
  try {
    const response = await searchNewsfeeds(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const newsfeeds = response.Data.RssfeedRecords.Items;
    console.log("newsfeeds",newsfeeds)
    return {
      newsfeeds,
      sessionId,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving newsfeeds: ${error.message}`);
  }
};
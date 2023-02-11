import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getItemById } from '../../../../../api/services/admin-panel/item';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const itemId = event.params.id;
    console.log(itemId);
    const response = await getItemById(sessionId, itemId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const item = response.Data;
    console.log('newsfeed', item);
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      item,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving itemId: ${error.message}`);
  }
};

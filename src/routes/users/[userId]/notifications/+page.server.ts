import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchNotifications } from '../../../api/services/notifications';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
  try {
    const response = await searchNotifications(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const notification = response.Data.NotificationRecords.Items;
    console.log(response)
    return {
      notification,
      sessionId,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving notification: ${error.message}`);
  }
};
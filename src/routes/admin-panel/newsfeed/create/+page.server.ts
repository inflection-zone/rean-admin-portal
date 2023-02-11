import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNewsfeed } from '../../../api/services/admin-panel/newsfeed';

/////////////////////////////////////////////////////////////////////////

export const actions = {
  createNewsfeed: async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.formData();
    const type = data.has('type') ? data.get('type') : null;
    const title = data.has('title') ? data.get('title') : null;
    const description = data.has('description') ? data.get('description') : null;
    const date = data.has('date') ? data.get('date') : null;

    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);

    const response = await createNewsfeed(
      sessionId,
      type.valueOf() as string,
      title.valueOf() as string,
      description.valueOf() as string,
      date.valueOf() as Date
    );
    const id = response.Data.id;
    console.log(response);
    if (response.Status === 'failure' || response.HttpCode !== 201) {
      throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/admin-panel/newsfeed/${id}/view`,
      successMessage(`newsfeed created successful!`),
      event
    );
  }
};

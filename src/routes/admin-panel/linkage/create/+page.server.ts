import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createLinkage } from 'src/routes/api/services/admin-panel/linkage';

/////////////////////////////////////////////////////////////////////////

export const actions = {
  createLinkage: async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.formData();
    const title = data.has('title') ? data.get('title') : null;
    const description = data.has('description') ? data.get('description') : null;
    const link = data.has('link') ? data.get('link') : null;
    const postDate = data.has('postDate') ? data.get('postDate') : null;
    const daysActive = data.has('daysActive') ? data.get('daysActive') : null;
    let temp = data.has('tags') ? data.get('tags') : null;
    const tags = temp ? JSON.parse(temp?.valueOf() as string) : [];
    const action = data.has('action') ? data.get('action') : null;
    const image = data.has('image') ? data.get('image') : null;

    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);

    const response = await createLinkage(
      sessionId,
      title.valueOf() as string,
      description.valueOf() as string,
      link.valueOf() as string,
      postDate.valueOf() as Date,
      daysActive.valueOf() as number,
      tags,
      action.valueOf() as string,
      image.valueOf() as File
    );
    const id = response.Data.id;
    console.log(response);
    if (response.Status === 'failure' || response.HttpCode !== 201) {
      throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/admin-panel/linkage/${id}/view`,
      successMessage(`linkage created successful!`),
      event
    );
  }
};

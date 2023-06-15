import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createActionPlan } from '$routes/api/services/careplan/assets/action-plan';

/////////////////////////////////////////////////////////////////////////

export const actions = {
  createActionPlan: async (event: RequestEvent) => {
    const request = event.request;
    const userId = event.params.userId;
    const data = await request.formData();
    // const assetCode = data.has('assetCode') ? data.get('assetCode') : null;
    const name = data.has('name') ? data.get('name') : null;
    const description = data.has('description') ? data.get('description') : null;
    const temp = data.has('tags') ? data.get('tags') : null;
    let tags = temp ? JSON.parse(temp?.valueOf() as string) : [];
    if (typeof tags == 'string' && tags.length == 0)
    {
      tags = [];
    }
    const version = data.has('version') ? data.get('version') : null;

    const sessionId = event.cookies.get('sessionId');

    console.log('temp', JSON.stringify(temp));
    console.log('tags', JSON.stringify(tags));

    const response = await createActionPlan(
      sessionId,
      // assetCode?.valueOf() as string ?? null,
      name.valueOf() as string,
      description.valueOf() as string,
      tags,
      version?.valueOf() as string
    );
    const id = response.Data.id;
    console.log(response);
    if (response.Status === 'failure' || response.HttpCode !== 201) {
      throw redirect(303, '/assets', errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/users/${userId}/assets/action-plans/${id}/view`,
      successMessage(`Action plan created successful!`),
      event
    );
  }
};

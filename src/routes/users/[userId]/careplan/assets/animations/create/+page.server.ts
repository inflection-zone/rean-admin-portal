
import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createAnimation } from '$routes/api/services/careplan/assets/animation';

/////////////////////////////////////////////////////////////////////////

export const actions = {
  createAnimation: async (event: RequestEvent) => {
    const request = event.request;
    const userId = event.params.userId;
    const data = await request.formData();
    // const assetCode = data.has('assetCode') ? data.get('assetCode') : 'ANIMATION-MT-3';
    const name = data.has('name') ? data.get('name') : null;
    const transcript = data.has('transcript') ? data.get('transcript') : null;
    const pathUrl = data.has('pathUrl') ? data.get('pathUrl') : null;
    const temp = data.has('tags') ? data.get('tags') : null;
    let tags = temp ? JSON.parse(temp?.valueOf() as string) : [];
    if (typeof tags == 'string' && tags.length == 0)
    {
      tags = [];
    }
    const version = data.has('version') ? data.get('version') : null;

    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);

    const response = await createAnimation(
      sessionId,
      // assetCode.valueOf() as string ?? null,
      name.valueOf() as string,
      transcript.valueOf() as string,
      pathUrl.valueOf() as string,
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
      `/users/${userId}/assets/animations/${id}/view`,
      successMessage(`Animation created successful!`),
      event
    );
  }
};

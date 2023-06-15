import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getAnimationById, updateAnimation } from '$routes/api/services/careplan/assets/animation';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const animationId = event.params.id;
    console.log(animationId);
    const response = await getAnimationById(sessionId, animationId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const animation = response.Data;

    return {
      animation
    };
  } catch (error) {
    console.error(`Error retriving animation: ${error.message}`);
  }
};

export const actions = {
  updateAnimation: async (event: RequestEvent) => {
    const request = event.request;
    const userId= event.params.userId;
    const data = await request.formData();
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
    console.log('session', sessionId);
    const animationId = event.params.id;
    console.log('animation  id', animationId);

    const response = await updateAnimation(
      sessionId,
      animationId,
      name.valueOf() as string,
      transcript.valueOf() as string,
      pathUrl.valueOf() as string,
      tags,
      version?.valueOf() as string
    );
    console.log(response);
    const id = response.Data.id;
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw redirect(303, '/assets', errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/users/${userId}/assets/animations/${id}/view`,
      successMessage(`Animation updated successful!`),
      event
    );
  }
};

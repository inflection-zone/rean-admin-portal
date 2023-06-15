import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getActionPlanById, updateActionPlan } from '$routes/api/services/careplan/assets/action-plan';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);

  try {
    const actionPlanId = event.params.id;
    console.log(actionPlanId);
    const response = await getActionPlanById(sessionId, actionPlanId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const actionPlan = response.Data;
    console.log('Action plan', actionPlan);
    return {
      actionPlan
    };
  } catch (error) {
    console.error(`Error retriving action plan: ${error.message}`);
  }
};

export const actions = {

  updateActionPlan: async (event: RequestEvent) => {

    const request = event.request;
    const userId = event.params.userId;
    const data = await request.formData();
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
    console.log('sessionId', sessionId);
    const actionPlanId = event.params.id;
    console.log('action plan id', actionPlanId);

    const response = await updateActionPlan(
      sessionId,
      actionPlanId,
      name.valueOf() as string,
      description.valueOf() as string,
      tags,
      version?.valueOf() as string
    );
    const id = response.Data.id;

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw redirect(303, '/assets', errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/users/${userId}/assets/action-plans/${id}/view`,
      successMessage(`Action plan updated successful!`),
      event
    );
  }
};









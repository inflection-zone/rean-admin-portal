import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createdrugManagement } from '../../../api/services/admin-panel/drug-management';

/////////////////////////////////////////////////////////////////////////

export const actions = {
  createdrugManagement: async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.formData();
    const name = data.has('name') ? data.get('name') : null;
    const genericName = data.has('genericName') ? data.get('genericName') : null;
    const ingredients = data.has('ingredients') ? data.get('ingredients') : null;
    const strength = data.has('strength') ? data.get('strength') : null;
    const commercialName = data.has('commercialName') ? data.get('commercialName') : null;
    const manufacture = data.has('manufacture') ? data.get('manufacture') : null;
    const otherInformation = data.has('otherInformation') ? data.get('otherInformation') : null;

    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);

    const response = await createdrugManagement(
      sessionId,
      name.valueOf() as string,
      genericName.valueOf() as string,
      ingredients.valueOf() as string,
      strength.valueOf() as string,
      commercialName.valueOf() as string,
      manufacture.valueOf() as string,
      otherInformation.valueOf() as string
    );
    const id = response.Data.id;
    console.log(response);
    if (response.Status === 'failure' || response.HttpCode !== 201) {
      throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/admin-panel/drug-management/${id}/view`,
      successMessage(`drug management created successful!`),
      event
    );
  }
};

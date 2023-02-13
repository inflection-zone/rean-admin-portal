import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createpriorityHealthManagement } from '../../../api/services/admin-panel/priority-health-management';

/////////////////////////////////////////////////////////////////////////

export const actions = {
  createpriorityHealthManagement: async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.formData();
    const patientUserId = data.has('patientUserId') ? data.get('patientUserId') : null;
    const provider = data.has('provider') ? data.get('provider') : null;
    const source = data.has('source') ? data.get('source') : null;
    const enrollmentId = data.has('enrollmentId') ? data.get('enrollmentId') : null;
    const careplanCode = data.has('careplanCode') ? data.get('careplanCode') : null;
    const careplanName = data.has('careplanName') ? data.get('careplanName') : null;
    const healthPriorityType = data.has('healthPriorityType')
      ? data.get('healthPriorityType')
      : null;
    const isPrimary = data.has('isPrimary') ? data.get('isPrimary') : null;

    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);

    const response = await createpriorityHealthManagement(
      sessionId,
      patientUserId.valueOf() as string,
      provider.valueOf() as string,
      source.valueOf() as string,
      enrollmentId.valueOf() as string,
      careplanCode.valueOf() as string,
      careplanName.valueOf() as string,
      healthPriorityType.valueOf() as string,
      isPrimary.valueOf() as boolean
    );
    const id = response.Data.id;
    console.log(response);
    if (response.Status === 'failure' || response.HttpCode !== 201) {
      throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/admin-panel/priority-health-management/${id}/view`,
      successMessage(`priority health management created successful!`),
      event
    );
  }
};

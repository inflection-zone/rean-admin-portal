import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getPriorityHealthManagementById,
	updatePriorityHealthManagement
} from '../../../../../api/services/priority-health-management';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const priorityHealthManagementId = event.params.id;
		console.log(priorityHealthManagementId);
		const response = await getPriorityHealthManagementById(sessionId, priorityHealthManagementId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const priorityHealthManagement = response.Data;
		console.log('priority health management', priorityHealthManagement);
		return {
			priorityHealthManagement
		};
	} catch (error) {
		console.error(`Error retriving priority health management: ${error.message}`);
	}
};

export const actions = {
	updatePriorityHealthManagement: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
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
		const priorityHealthManagementId = event.params.id;
		console.log('priority health management id', priorityHealthManagementId);

		const response = await updatePriorityHealthManagement(
			sessionId,
			priorityHealthManagementId,
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

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/priority-health-management', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/priority-health-management/${id}/view`,
			successMessage(`priority health management updated successful!`),
			event
		);
	}
};

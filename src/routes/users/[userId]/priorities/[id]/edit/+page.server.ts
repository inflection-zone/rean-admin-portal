import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import { getPriorityById, updatePriority } from '../../../../../api/services/priorities';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const priorityId = event.params.id;
		const response = await getPriorityById(sessionId, priorityId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const priority = response.Data;
		return {
			priority
		};
	} catch (error) {
		console.error(`Error retriving priority: ${error.message}`);
	}
};

export const actions = {
	updatePriorityAction: async (event: RequestEvent) => {
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
		const priorityId = event.params.id;

		const response = await updatePriority(
			sessionId,
			priorityId,
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
			throw redirect(303, '/priorities', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/priorities/${id}/view`,
			successMessage(`priority updated successful!`),
			event
		);
	}
};

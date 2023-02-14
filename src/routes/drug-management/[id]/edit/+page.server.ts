import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getdrugManagementById, updatedrugManagement } from '../../../api/services/drug-management';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const drugManagementId = event.params.id;
		console.log(drugManagementId);
		const response = await getdrugManagementById(sessionId, drugManagementId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const drugManagement = response.Data;
		console.log('drug management', drugManagement);
		return {
			drugManagement
		};
	} catch (error) {
		console.error(`Error retriving drug management: ${error.message}`);
	}
};

export const actions = {
	updatedrugManagement: async (event: RequestEvent) => {
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
		const drugManagementId = event.params.id;
		console.log('drug management id', drugManagementId);

		const response = await updatedrugManagement(
			sessionId,
			drugManagementId,
			name.valueOf() as string,
			genericName.valueOf() as string,
			ingredients.valueOf() as string,
			strength.valueOf() as string,
			commercialName.valueOf() as string,
			manufacture.valueOf() as string,
			otherInformation.valueOf() as string
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/drug-management/${id}/view`,
			successMessage(`drug management updated successful!`),
			event
		);
	}
};

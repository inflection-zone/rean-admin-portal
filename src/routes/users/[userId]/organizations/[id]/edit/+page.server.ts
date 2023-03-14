import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import { getOrganizationById, updateOrganization } from '../../../../../api/services/organizations';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const organizationId = event.params.id;
		const response = await getOrganizationById(sessionId, organizationId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const organization = response.Data.Organization;
		return {
			organization
		};
	} catch (error) {
		console.error(`Error retriving organization: ${error.message}`);
	}
};

export const actions = {
	updateOrganizationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		console.log("data",data);

		// const type = data.has('type') ? data.get('type') : null;
		const name = data.has('name') ? data.get('name') : null;
		const contactNumber = data.has('contactNumber') ? data.get('contactNumber') : null;
		const email = data.has('email') ? data.get('email') : null;
		const about = data.has('about') ? data.get('about') : null;
		const operationalSince = data.has('operationalSince') ? data.get('operationalSince') : null;
		const address = data.has('address') ? data.get('address') : null;
		const imageResource = data.has('imageResource') ? data.get('imageResource') : null;
		const isHealthFacility = data.has('isHealthFacility') ? data.get('isHealthFacility') : null;
		const sessionId = event.cookies.get('sessionId');
		const organizationId = event.params.id;

		const response = await updateOrganization(
			sessionId,
			organizationId,
			// type.valueOf() as string,
			name.valueOf() as string,
			contactNumber.valueOf() as number,
			email.valueOf() as string,
			about.valueOf() as string,
			operationalSince.valueOf() as Date,
			address.valueOf() as string,
			imageResource.valueOf() as string,
			isHealthFacility.valueOf() as boolean
		);
		 console.log("response",response);
		const id = response.Data.Organization.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/organizations', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/organizations/${id}/view`,
			successMessage(`organization updated successful!`),
			event
		);
	}
};

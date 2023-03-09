import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createOrganization } from '../../../../api/services/organizations';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createOrganizationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		 console.log("data////////",data);
		const type = data.has('type') ? data.get('type') : null;
		const name = data.has('name') ? data.get('name') : null;
		const contactPhone = data.has('contactPhone') ? data.get('contactPhone') : null;
		const contactEmail = data.has('contactEmail') ? data.get('contactEmail') : null;
		const about = data.has('about') ? data.get('about') : null;
		const operationalSince = data.has('operationalSince') ? data.get('operationalSince') : null;
		const address = data.has('address') ? data.get('address') : [];
		//const imageResource = data.has('imageResource') ? data.get('imageResource') : null;
		const isHealthFacility = data.has('isHealthFacility') ? data.get('isHealthFacility') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createOrganization(
			sessionId,
			type.valueOf() as string,
			name.valueOf() as string,
			contactPhone.valueOf() as number,
			contactEmail.valueOf() as string,
			about.valueOf() as string,
			operationalSince.valueOf() as Date,
			address.valueOf() as string[],
			//imageResource.valueOf() as string,
			isHealthFacility.valueOf() as boolean
		);
		  console.log("response====????", response);
		const id = response.Data.Organization.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/organizations', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/organizations/${id}/view`,
			successMessage(`organization created successful!`),
			event
		);
	}
};

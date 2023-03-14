import { redirect } from 'sveltekit-flash-message/server';
import type {  error, type RequestEvent  } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createOrganization } from '../../../../api/services/organizations';
import { createAddress } from '../../../../api/services/addresses';
import type { OrganizationTypes } from '$lib/types/domain.models';
import type { PageServerLoad } from './$types';
import { getOrganizationTypes } from '../../../../api/services/types';
/////////////////////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	try {
		const types: OrganizationTypes[] = await getOrganizationTypes();
		return {
			message: 'Common data successfully retrieved!',
		   types
		};
	} catch (error) {
		console.error(`Error retieving data : ${error.message}`);
		throw redirect(400, '/');
	}
};

export const actions = {
	createOrganizationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
     
		const addressType = data.has('addressType') ? data.get('addressType') : null;
		const addressLine = data.has('AddressLine') ? data.get('AddressLine') : null;
		const city = data.has('city') ? data.get('city') : null;
		const district = data.has('district') ? data.get('district') : null;
		const state = data.has('state') ? data.get('state') : null;
		const country = data.has('country') ? data.get('country') : null;
		const postalCode = data.has('postalCode') ? data.get('postalCode') : null;
		const type = data.has('type') ? data.get('type') : null;
		const name = data.has('name') ? data.get('name') : null;
		const contactPhone = data.has('contactPhone') ? data.get('contactPhone') : null;
		const contactEmail = data.has('contactEmail') ? data.get('contactEmail') : null;
		const about = data.has('about') ? data.get('about') : null;
		const operationalSince = data.has('operationalSince') ? data.get('operationalSince') : null;
		//const imageResource = data.has('imageResource') ? data.get('imageResource') : null;
		const isHealthFacility = data.has('isHealthFacility') ? data.get('isHealthFacility') : false;

		const sessionId = event.cookies.get('sessionId');
		const addressResponse = await createAddress(
			sessionId,
			addressType.valueOf() as string,
			addressLine.valueOf() as string,
			city.valueOf() as string,
			district.valueOf() as string,
			state.valueOf() as string,
			country.valueOf() as string,
			postalCode.valueOf() as number
		);
		
		const addressesId_ = addressResponse.Data.Address.id;
    		const addressesId = addressesId_.split(',');
		
		if (addressResponse.Status === 'failure' || addressResponse.HttpCode !== 201) {
			throw redirect(303, '/organizations', errorMessage(addressResponse.Message), event);
		}

		const response = await createOrganization(
			sessionId,
			type.valueOf() as string,
			name.valueOf() as string,
			contactPhone.valueOf() as number,
			contactEmail.valueOf() as string,
			about.valueOf() as string,
			operationalSince.valueOf() as Date,
			addressesId,
			//imageResource.valueOf() as string,
			isHealthFacility.valueOf() as boolean
		);
		
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

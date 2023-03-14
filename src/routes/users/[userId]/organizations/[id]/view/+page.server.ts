import * as cookie from 'cookie';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { getOrganizationById } from '../../../../../api/services/organizations';
import { getAddressById } from '../../../../../api/services/addresses';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const organizationId = event.params.id;
		// const addressesId = event.params.id
		const response = await getOrganizationById(sessionId, organizationId);
		// const addressResponse = await getAddressById(sessionId, response.Data.addressesId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const organization = response.Data.Organization;
		console.log("response}}}}}}}}}",response.Data);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			organization,
			
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving organization: ${error.message}`);
	}
};

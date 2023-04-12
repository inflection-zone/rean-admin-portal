import * as cookie from 'cookie';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { getOrganizationById } from '../../../../../api/services/organizations';
import { getFileResourceById } from '../../../../../api/services/file.resource';
import { BACKEND_API_URL } from '$env/static/private';
////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const organizationId = event.params.id;
		const response = await getOrganizationById(sessionId, organizationId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const organization = response.Data.Organization;

		const imageResourceId = organization.ImageResourceId;

		const id = response.Data.Organization.id;

		if (imageResourceId) {
			organization['ImageUrl'] =
				BACKEND_API_URL + `/file-resources/${imageResourceId}/download?disposition=inline`;
		} else {
			organization['ImageUrl'] = null;
		}
		return {
			location: `${id}/edit`,
			organization,

			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving organization: ${error.message}`);
	}
};

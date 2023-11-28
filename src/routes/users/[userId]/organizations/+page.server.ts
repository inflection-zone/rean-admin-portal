import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchOrganizations } from '../../../api/services/organizations';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';
////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchOrganizations(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const organization = response.Data.Organizations;
		console.log('organization', organization);

		return {
			organization,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving organization: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving organization`),event)
	}
};

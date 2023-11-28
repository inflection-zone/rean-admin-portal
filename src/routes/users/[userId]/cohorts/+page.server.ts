import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchCohorts } from '$routes/api/services/cohorts';
import { searchTenants } from '$routes/api/services/tenants';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchCohorts(sessionId);
		const tenants_ = await searchTenants(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const cohorts = response.Data.Cohorts;
		const tenants = tenants_.Data.TenantRecords.Items;
		return {
			cohorts,
			tenants,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving cohorts: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving cohorts`),event)
	}
};

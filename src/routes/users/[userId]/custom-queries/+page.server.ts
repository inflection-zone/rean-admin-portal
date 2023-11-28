import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchQueries } from '$routes/api/services/custom.query';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	console.log('sessionId', sessionId);
	try {
		const response = await searchQueries(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const queries = response.Data.Queries;
		console.log("queries", queries)
		return {
			queries,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving queries: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving queries`),event)
	}
};
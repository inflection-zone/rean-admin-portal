import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchNewsfeeds } from '../../../api/services/newsfeeds';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchNewsfeeds(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeeds = response.Data.RssfeedRecords;
		return {
			newsfeeds,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving newsfeeds: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving newsfeeds`),event)
	}
};

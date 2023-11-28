import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchBadgeCategories } from '$routes/api/services/gamification/badge.category';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchBadgeCategories(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badgeCategories = response.Data;
		return {
			badgeCategories,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving badge categories: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving badge categories`),event)
	}
};
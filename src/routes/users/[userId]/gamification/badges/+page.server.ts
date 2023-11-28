import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchBadges } from '$routes/api/services/gamification/badge';
import { searchBadgeCategories } from '$routes/api/services/gamification/badge.category';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchBadges(sessionId);
		const _badgeCategories = await searchBadgeCategories(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badges = response.Data;
		const badgeCategories = _badgeCategories.Data.Items;
		return {
			badges,
			badgeCategories,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving badges: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving badges`),event)
	}
};

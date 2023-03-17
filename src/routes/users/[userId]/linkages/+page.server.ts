import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchLinkages } from '../../../api/services/linkages';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchLinkages(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const linkage = response.Data.NoticeRecords.Items;
		return {
			linkage,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving linkage: ${error.message}`);
	}
};

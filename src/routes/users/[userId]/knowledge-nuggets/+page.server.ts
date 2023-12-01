import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchKnowledgeNuggets } from '../../../api/services/knowledge-nuggets';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchKnowledgeNuggets(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const knowledgeNuggets = response.Data.KnowledgeNuggetRecords;
		return {
			knowledgeNuggets,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving knowledge nuggets: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving knowledge nuggets`),event)
	}
};

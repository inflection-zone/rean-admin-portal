import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getKnowledgeNuggetById } from '../../../../../api/services/knowledge-nuggets';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const knowledgeNuggetsId = event.params.id;
		console.log(knowledgeNuggetsId);
		const response = await getKnowledgeNuggetById(sessionId, knowledgeNuggetsId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const knowledgeNugget = response.Data.KnowledgeNugget;
		console.log('knowledge Nuggets', knowledgeNugget);

		const id = response.Data.KnowledgeNugget.id;
		return {
			location: `${id}/edit`,
			knowledgeNugget,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving knowledge nuggets: ${error.message}`);
	}
};

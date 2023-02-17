import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getKnowledgeNuggetsById } from '../../../../../api/services/knowledge-nuggets';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const knowledgeNuggetsId = event.params.id;
		//console.log('knowid=====', knowledgeNuggetsId);
		const response = await getKnowledgeNuggetsById(sessionId, knowledgeNuggetsId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const knowledgeNuggets = response.Data.KnowledgeNugget;
		console.log('knowledge Nuggets====', knowledgeNuggets);
		//const id = response.Data.id;
		const id = response.Data.KnowledgeNugget.id;
		//console.log('id====', id);
		return {
			location: `${id}/edit`,
			knowledgeNuggets,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving knowledge nuggets: ${error.message}`);
	}
};

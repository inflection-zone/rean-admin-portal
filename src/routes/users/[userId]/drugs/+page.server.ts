import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchDrugs } from '../../../api/services/drugs';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchDrugs(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const drug = response.Data.Drugs.Items;
		return {
			drug,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving drug: ${error.message}`);
	}
};

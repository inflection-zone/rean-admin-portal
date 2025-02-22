import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchDrugs } from '../../../api/services/drugs';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:drugs')
	try {
		const response = await searchDrugs(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const drugs = response.Data.Drugs;
		return {
		 drugs,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving drug: ${error.message}`);
	}
};

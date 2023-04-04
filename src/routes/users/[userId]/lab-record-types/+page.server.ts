import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchLabRecordTypes } from '../../../api/services/lab-record-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchLabRecordTypes(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const labRecordTypes = response.Data.LabRecordTypes;
		return {
			labRecordTypes,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving Lab record types: ${error.message}`);
	}
};

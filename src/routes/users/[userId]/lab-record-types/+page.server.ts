import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchLabRecordTypes } from '../../../api/services/lab-record-types';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
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
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving Lab record types`),event)
	}
};

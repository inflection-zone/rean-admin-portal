import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchHospitals } from '../../../api/services/hospitals';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	const userId = event.params.userId;
	try {
		const response = await searchHospitals(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const hospitals = response.Data.Hospitals;
		// const hospitals = hospitals_ ? hospitals_.Items : [];
		// console.log(`Hospitals: ${JSON.stringify(hospitals, null, 2)}`);
		return {
			hospitals,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving hospitals: ${error.message}`);
		throw redirect(303,`/users/${userId}/home`,errorMessage(`Error retriving hospitals`),event)
	}
};

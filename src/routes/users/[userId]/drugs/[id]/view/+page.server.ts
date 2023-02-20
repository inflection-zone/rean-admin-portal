import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getDrugById } from '../../../../../api/services/drugs';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const drugId = event.params.id;
		console.log(drugId);
		const response = await getDrugById(sessionId, drugId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const drug = response.Data;
		console.log('drug', drug);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			drug,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving drug: ${error.message}`);
	}
};

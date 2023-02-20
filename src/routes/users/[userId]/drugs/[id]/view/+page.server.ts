import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getDrugById } from '../../../../../api/services/drugs';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const drugManagementId = event.params.id;
		console.log(drugManagementId);
		const response = await getDrugById(sessionId, drugManagementId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const drugManagement = response.Data;
		console.log('drug management', drugManagement);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			drugManagement,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving drug management: ${error.message}`);
	}
};

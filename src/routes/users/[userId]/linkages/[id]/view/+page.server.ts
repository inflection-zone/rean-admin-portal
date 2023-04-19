import * as cookie from 'cookie';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { getLinkageById } from '../../../../../api/services/linkages';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const linkageId = event.params.id;
		const response = await getLinkageById(sessionId, linkageId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const linkage = response.Data.Notice;
		const id = response.Data.Notice.id;
		return {
			location: `${id}/edit`,
			linkage,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving linkage: ${error.message}`);
	}
};

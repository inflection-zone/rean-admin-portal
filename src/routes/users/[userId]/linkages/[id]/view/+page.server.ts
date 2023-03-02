// import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getLinkageById } from '../../../../../api/services/linkages';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const linkageId = event.params.id;
		console.log(linkageId);
		const response = await getLinkageById(sessionId, linkageId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const linkage = response.Data.Notice;
		console.log('linkage', linkage);
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

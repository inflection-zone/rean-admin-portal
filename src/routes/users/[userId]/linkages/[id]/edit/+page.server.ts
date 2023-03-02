import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getLinkageById, updateLinkage } from '../../../../../api/services/linkages';

/////////////////////////////////////////////////////////////////////////

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

export const actions = {
	updateLinkageAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const link = data.has('link') ? data.get('link') : null;
		//const postDate = data.has('postDate') ? data.get('postDate') : null;
		const daysActive = data.has('daysActive') ? data.get('daysActive') : null;
		// const temp = data.has('tags') ? data.get('tags') : null;
		// const tags = temp ? JSON.parse(temp?.valueOf() as string) : [];
		const action = data.has('action') ? data.get('action') : null;
		//const image = data.has('image') ? data.get('image') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const linkageId = event.params.id;
		console.log('linkage id', linkageId);

		const response = await updateLinkage(
			sessionId,
			linkageId,
			title.valueOf() as string,
			description.valueOf() as string,
			link.valueOf() as string,
			// postDate.valueOf() as Date,
			daysActive.valueOf() as number,
			// tags,
			action.valueOf() as string,
			// image.valueOf() as File
		);
		const id = response.Data.Notice.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/linkages', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/linkages/${id}/view`,
			successMessage(`linkage updated successful!`),
			event
		);
	}
};

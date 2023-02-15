import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getNewsfeedById, updateNewsfeed } from '../../../../../api/services/newsfeed';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const newsfeedId = event.params.id;
		console.log(newsfeedId);
		const response = await getNewsfeedById(sessionId, newsfeedId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeed = response.Data;
		console.log('newsfeed', newsfeed);
		return {
			newsfeed
		};
	} catch (error) {
		console.error(`Error retriving newsfeed: ${error.message}`);
	}
};

export const actions = {
	updateNewsfeed: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		const type = data.has('type') ? data.get('type') : null;
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const date = data.has('date') ? data.get('date') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const newsfeedId = event.params.id;
		console.log('goal categories management id', newsfeedId);

		const response = await updateNewsfeed(
			sessionId,
			newsfeedId,
			type.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			date.valueOf() as Date
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/newsfeed', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeed/${id}/view`,
			successMessage(`newsfeed updated successful!`),
			event
		);
	}
};

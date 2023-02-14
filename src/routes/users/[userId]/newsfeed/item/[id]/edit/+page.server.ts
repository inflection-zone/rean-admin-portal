import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getItemById, updateItem } from '../../../../api/services/item';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const itemId = event.params.id;
		console.log(itemId);
		const response = await getItemById(sessionId, itemId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const item = response.Data;
		console.log('item', item);
		return {
			item
		};
	} catch (error) {
		console.error(`Error retriving item: ${error.message}`);
	}
};

export const actions = {
	updateItem: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const newsfeed = data.has('newsfeed') ? data.get('newsfeed') : null;
		const type = data.has('type') ? data.get('type') : null;
		const link = data.has('link') ? data.get('link') : null;
		const author = data.has('author') ? data.get('author') : null;
		const date = data.has('date') ? data.get('date') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const itemId = event.params.id;
		console.log('item id', itemId);

		const response = await updateItem(
			sessionId,
			itemId,
			title.valueOf() as string,
			description.valueOf() as string,
			newsfeed.valueOf() as string,
			type.valueOf() as string,
			link.valueOf() as string,
			author.valueOf() as string,
			date.valueOf() as Date
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/newsfeed/item${id}/view`,
			successMessage(`item updated successful!`),
			event
		);
	}
};

import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import {
	getNewsfeedItemById,
	updateNewsfeedItem
} from '../../../../../../../api/services/newsfeed-items';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const newsfeedItemId = event.params.newsfeedItemId;
		const response = await getNewsfeedItemById(sessionId, newsfeedItemId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeedItem = response.Data.RssfeedItem;
		return {
			newsfeedItem
		};
	} catch (error) {
		console.error(`Error retriving newsfeed -Items: ${error.message}`);
	}
};

export const actions = {
	updateNewsfeedItemAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const newsfeedId = event.params.newsfeedId;
		const newsfeedItemId = event.params.newsfeedItemId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const content = data.has('content') ? data.get('content') : null;
		const description = data.has('description') ? data.get('description') : null;
		const link = data.has('link') ? data.get('link') : null;
		const image = data.has('image') ? data.get('image') : null;
		const authorName = data.has('authorName') ? data.get('authorName') : null;
		const authorEmail = data.has('authorEmail') ? data.get('authorEmail') : null;
		const authorLink = data.has('authorLink') ? data.get('authorLink') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await updateNewsfeedItem(
			sessionId,
			newsfeedItemId,
			newsfeedId,
			title.valueOf() as string,
			content.valueOf() as string,
			description?.valueOf() as string,
			link?.valueOf() as string,
			image?.valueOf() as string,
			authorName?.valueOf() as string,
			authorEmail?.valueOf() as string,
			authorLink?.valueOf() as string
		);
		const id = response.Data.RssfeedItem.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/newsfeeds/newsfeed-items', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/view`,
			successMessage(`Item updated successful!`),
			event
		);
	}
};

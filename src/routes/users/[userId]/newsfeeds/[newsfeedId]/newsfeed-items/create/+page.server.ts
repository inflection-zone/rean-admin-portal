import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNewsfeedItem } from '../../../../../../api/services/newsfeed-items';
import type { RequestEvent } from './$types';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createNewsfeedItemAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const newsfeedId = event.params.newsfeedId;
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

		const response = await createNewsfeedItem(
			sessionId,
			newsfeedId,
			title.valueOf() as string,
			content.valueOf() as string,
			description.valueOf() as string,
			link.valueOf() as string,
			image.valueOf() as string,
			authorName.valueOf() as string,
			authorEmail.valueOf() as string,
			authorLink.valueOf() as string
		);
		const newsfeedItemId = response.Data.RssfeedItem.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/newsfeeds`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${newsfeedItemId}/view`,
			successMessage(`Newsfeed item created successfully !`),
			event
		);
	}
};

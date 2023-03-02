import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNewsfeed } from '../../../../api/services/newsfeeds';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createNewsfeedAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		console.log('data===', data);
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const link = data.has('link') ? data.get('link') : null;
		const language = data.has('language') ? data.get('language') : null;
		const copyright = data.has('copyright') ? data.get('copyright') : null;
		const favicon = data.has('favicon') ? data.get('favicon') : null;
		//const image = data.has('image') ? data.get('image') : null;
		//const tags = data.has('tags') ? data.get('tags') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const response = await createNewsfeed(
			sessionId,
			title.valueOf() as string,
			description.valueOf() as string,
			link.valueOf() as string,
			language.valueOf() as string,
			copyright.valueOf() as string,
			favicon.valueOf() as string,
			// image.valueOf() as File,
			//tags.valueOf() as string[],
		);
		const id = response.Data.Rssfeed.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/newsfeeds', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/${id}/view`,
			successMessage(`newsfeed created successful!`),
			event
		);
	}
};

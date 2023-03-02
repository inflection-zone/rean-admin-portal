import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getNewsfeedById } from '../../../../../api/services/newsfeeds';

////////////////////////////////////////////////////////////////////////////

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
		const newsfeed = response.Data.Rssfeed;
		console.log('newsfeed', newsfeed);
		const id = response.Data.Rssfeed.id;
		return {
			location: `${id}/edit`,
			newsfeed,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving newsfeed: ${error.message}`);
	}
};

import * as cookie from 'cookie';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { getNewsfeedItemById } from '../../../../../../api/services/newsfeed-items';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const newsfeedItemId = event.params.id;
		const response = await getNewsfeedItemById(sessionId, newsfeedItemId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeedItem = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			newsfeedItem,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving newsfeed item: ${error.message}`);
	}
};

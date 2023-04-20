import * as cookie from 'cookie';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad, Action } from './$types';
import { getNoticeById, updateNotice } from '../../../../../api/services/notices';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const linkageId = event.params.id;
		const response = await getNoticeById(sessionId, linkageId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const notice = response.Data.Notice;
		const id = response.Data.Notice.id;
		return {
			location: `${id}/edit`,
			notice,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving notice: ${error.message}`);
	}
};

export const actions = {
	updateNoticeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const link = data.has('link') ? data.get('link') : null;
		const daysActive = data.has('daysActive') ? data.get('daysActive') : null;
		const tags = data.has('tags') ? data.getAll('tags') : null;
		const action = data.has('action') ? data.get('action') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const sessionId = event.cookies.get('sessionId');
		const linkageId = event.params.id;

		const response = await updateNotice(
			sessionId,
			linkageId,
			title.valueOf() as string,
			description.valueOf() as string,
			link.valueOf() as string,
			daysActive.valueOf() as number,
			tags.valueOf() as string[],
			action.valueOf() as string,
			imageUrl.valueOf() as string
		);
		const id = response.Data.Notice.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/notices', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notices/${id}/view`,
			successMessage(`notice updated successful!`),
			event
		);
	}
};

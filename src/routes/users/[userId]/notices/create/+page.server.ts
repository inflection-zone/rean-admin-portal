import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNotice } from '../../../../api/services/notices';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createNoticeAction: async (event: RequestEvent) => {
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

		const response = await createNotice(
			sessionId,
			title.valueOf() as string,
			description.valueOf() as string,
			link.valueOf() as string,
			daysActive.valueOf() as number,
			tags?.valueOf() as string[],
			action.valueOf() as string,
			imageUrl.valueOf() as string
		);
		const id = response.Data.Notice.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/notices`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notices/${id}/view`,
			successMessage(`Notice created successfully !`),
			event
		);
	}
};

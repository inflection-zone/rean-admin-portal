import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createModule } from '../../../../../../api/services/modules';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createModuleAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const data = await request.formData();

		const name = data.has('name') ? data.get('name') : null;
		const description = data.has('description') ? data.get('description') : null;
		// const sequence = data.has('sequence') ? data.get('sequence') : null;
		const durationInMins = data.has('durationInMins') ? data.get('durationInMins') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createModule(
			sessionId,
			courseId,
			name.valueOf() as string,
			description.valueOf() as string,
			// sequence.valueOf() as number,
			durationInMins.valueOf() as number,
			imageUrl.valueOf() as string,
		);
		const id = response.Data.CourseModule.id;
		console.log('response', response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				'/users/${userId}/courses/${courseId}/modules',
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${id}/view`,
			successMessage(`Module created successful!`),
			event
		);
	}
};

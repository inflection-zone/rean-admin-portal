import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getSchemaById, updateSchema } from '$routes/api/services/gamification/schema';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const schemaId = event.params.id;
		const response = await getSchemaById(sessionId, schemaId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const schema = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			schema,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving schema : ${error.message}`);
	}
};

const updateSchemaSchema = zfd.formData({
	name: z.string().min(1).max(32),
	description: z.string().optional(),
	type: z.string().optional(),
  eventTypeIds: z.array(z.string()).optional(),
});

export const actions = {
	updateschemaAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const schemaId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type Schema = z.infer<typeof updateSchemaSchema>;

		let result: Schema = {};
    const eventTypes = result.eventTypeIds.map(x => x.split(','));
		const flattenedArray = eventTypes.flat();
		const updatedData = { "EventTypeIds": flattenedArray }
		try {
			result = updateSchemaSchema.parse(formData);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await updateSchema(
			sessionId,
			schemaId,
			result.name,
			result.description,
			result.type,
      updatedData.EventTypeIds
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/gamification/schemas`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/gamification/schemas/${id}/view`,
			successMessage(`Schema updated successfully!`),
			event
		);
	}
};

import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getPromptsById , updatePrompts } from  '../../../../../../../api/services/prompts';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const promptsId = event.params.id;
		const response = await getPromptsById(sessionId, promptsId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const prompts = response.Data;
		const id = response.Data.id;
		
		return {
			location: `${id}/edit`,
			prompts,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving prompt: ${error.message}`);
	}
};

const updatePromptsSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string(),
	useCaseType: z.string(),
	group: z.string(),
	model: z.string(),
	prompt: z.string(),
	variable: z.string().optional(),
	temperature: z.string().optional(),
	frequencyPenalty: z.string().optional(),
	topP: z.string().optional(),
	presencePenalty: z.string().optional(),
});

export const actions = {
	updatePromptsAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const promptId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type PromptsSchema = z.infer<typeof updatePromptsSchema>;

		let result: PromptsSchema = {};
		try {
			result = updatePromptsSchema.parse(formData);
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

		const response = await updatePrompts(
			sessionId,
			promptId,
			result.name,
			result.description,
			result.useCaseType,
			result.group,
			result.model,
			result.prompt,
			result.variable,
			result.temperature,
			result.frequencyPenalty,
			result.topP,
			result.presencePenalty,
			userId
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/dev/prompts/prompts`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/dev/prompts/prompts/${id}/view`,
			successMessage(`Prompt updated successfully!`),
			event
		);
	}
};

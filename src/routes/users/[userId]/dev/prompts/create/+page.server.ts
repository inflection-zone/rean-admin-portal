import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createPrompts } from '../../../../../api/services/prompts';

/////////////////////////////////////////////////////////////////////////

const createPromptsSchema = zfd.formData({
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
    createPromptsAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const sessionId = event.cookies.get('sessionId');
        const formData = Object.fromEntries(await request.formData());

        type PromptsSchema = z.infer<typeof createPromptsSchema>;

        let result: PromptsSchema = {};
        try {
            result = createPromptsSchema.parse(formData);
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

        const response = await createPrompts(
            sessionId,
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

        if (response.Status === 'failure' || response.HttpCode !== 201) {
            throw redirect(303, `/users/${userId}/dev/prompts/prompts`, errorMessage(response.Message), event);
        }
        throw redirect(
            303,
            `/users/${userId}/dev/prompts/prompts/${id}/view`,
            successMessage(`Prompt created successfully!`),
            event
        );
    }
};

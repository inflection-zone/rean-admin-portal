import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPromptsById } from '../../../../../../../api/services/prompts';

////////////////////////////////////////////////////////////////////////////

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

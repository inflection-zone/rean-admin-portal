import type { RequestEvent } from '@sveltejs/kit';
import { deletePrompts } from '../../services/prompts';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

// Endpoint for handling DELETE requests to delete a prompts
export const DELETE = async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.json();
    let response;
    try {
        response = await deletePrompts(data.sessionId, data.promptsId);
    } catch (error) {
        throw redirect(errorMessage('Error deleting Prompts.'), event);
    }
    throw redirect(successMessage(response.Message), event);
};

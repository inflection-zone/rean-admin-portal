import type { RequestEvent } from '@sveltejs/kit';
import { deleteVersions } from '../../services/versions';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

// Endpoint for handling DELETE requests to delete a prompts
export const DELETE = async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.json();
    let response;
    try {
        response = await deleteVersions(data.sessionId, data.versionsId);
    } catch (error) {
        throw redirect(errorMessage('Error deleting Versions.'), event);
    }
    throw redirect(successMessage(response.Message), event);
};

import type { RequestEvent } from '@sveltejs/kit';
import { deleteGroups } from '../../services/groups';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

// Endpoint for handling DELETE requests to delete a prompts
export const DELETE = async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.json();
    let response;
    try {
        response = await deleteGroups(data.sessionId, data.groupsId);
    } catch (error) {
        throw redirect(errorMessage('Error deleting Group.'), event);
    }
    throw redirect(successMessage(response.Message), event);
};

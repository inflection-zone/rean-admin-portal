import type { RequestEvent } from '@sveltejs/kit';
import { deleteSystems } from '../../services/systems';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

// Endpoint for handling DELETE requests to delete a system
export const DELETE = async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.json();
    console.log('Inside Qna Document system server endpoints');
    let response;
    try {
        response = await deleteSystems(data.sessionId, data.systemsId);
    } catch (error) {
        throw redirect(
            errorMessage('Error deleting Systems.'),
            event
        );
    }
    throw redirect(
        successMessage(response.Message),
        event
    );
};

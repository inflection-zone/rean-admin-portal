import type { RequestEvent } from '@sveltejs/kit';
import { deleteTenantview } from '../../services/tenantview';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

// Endpoint for handling DELETE requests to delete a system
export const DELETE = async (event: RequestEvent) => {
    const request = event.request;
    const data = await request.json();
    console.log('Inside Qna Document tenantview server endpoints');
    let response;
    try {
        response = await deleteTenantview(data.sessionId, data.systemsId);
    } catch (error) {
        throw redirect(
            errorMessage('Error deleting Tenantview.'),
            event
        );
    }
    throw redirect(
        successMessage(response.Message),
        event
    );
};

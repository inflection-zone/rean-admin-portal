// Importing necessary modules and types
import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTenantviewById } from '../../../../../../api/services/tenantview';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');

    try {
        const tenantviewId = event.params.id;

        const response = await getTenantviewById(sessionId, tenantviewId);

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }

        const tenantview = response.Data;
        const id = response.Data.id;
        console.log(response,"response got");

        return {
            location: `${id}/edit`,
            tenantview,
            message: response.Message
        };
    } catch (error) {
        // Log error message if fetching tenantview details fails
        console.error(`Error retrieving tenantview: ${error.message}`);
    }
};

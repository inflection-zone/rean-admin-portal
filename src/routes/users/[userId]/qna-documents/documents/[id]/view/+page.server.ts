// Importing necessary modules and types
import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { getSystemsById } from '../../../../../../api/services/systems';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');

    try {
        const systemId = event.params.id;

        const response = await getSystemsById(sessionId, systemId);

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }

        const system = response.Data;
        const id = response.Data.id;
        console.log(response,"response got");

        return {
            location: `${id}/edit`,
            system,
            message: response.Message
        };
    } catch (error) {
        // Log error message if fetching system details fails
        console.error(`Error retrieving systems: ${error.message}`);
    }
};

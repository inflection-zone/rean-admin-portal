import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getVersionsById } from '../../../../../../../api/services/versions';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');

    try {
        const versionId = event.params.id;
        const response = await getVersionsById(sessionId, versionId);

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const versions = response.Data;
        const id = response.Data.id;

        return {
            location: `${id}/edit`,
            versions,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving Version: ${error.message}`);
    }
};

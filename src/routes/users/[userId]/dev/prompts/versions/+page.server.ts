import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchVersions } from '../../../../../api/services/versions';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ cookies, depends }) => {
    const sessionId = cookies.get('sessionId');
    depends('app:versions');
    try {
        const response = await searchVersions(sessionId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const versions = response.Data.Items;

        return {
            versions,
            sessionId,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving Version: ${error.message}`);
    }
};

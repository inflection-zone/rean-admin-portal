import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { searchDocuments } from '../../../../api/services/documents';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ cookies, depends }) => {
    const sessionId = cookies.get('sessionId');
    depends('app:documents');
    try {
        const response = await searchDocuments(sessionId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const documents = response.Data.Items;

        return {
            documents,
            sessionId,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving Document ${error.message}`);
    }
};

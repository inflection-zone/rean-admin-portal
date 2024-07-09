import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchGroups } from '../../../../../api/services/groups';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ cookies, depends }) => {
    const sessionId = cookies.get('sessionId');
    depends('app:groups');
    try {
        const response = await searchGroups(sessionId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const groups = response.Data.Items;


        return {
            groups,
            sessionId,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving group: ${error.message}`);
    }
};

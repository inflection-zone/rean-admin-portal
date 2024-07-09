import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { searchSystems } from '../../../../api/services/systems';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ cookies, depends }) => {
    const sessionId = cookies.get('sessionId');
    depends('app:systems');
    try {
        const response = await searchSystems(sessionId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const systems = response.Data;
        console.log(response,'message');
        
        return {
            systems,
            sessionId,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving systems : ${error.message}`);
    }
};

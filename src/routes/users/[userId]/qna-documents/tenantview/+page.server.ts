import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { searchTenantview } from '../../../../api/services/tenantview';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ cookies, depends }) => {
    const sessionId = cookies.get('sessionId');
    depends('app:tenantview');
    try {
        const response = await searchTenantview(sessionId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const tenantview = response.Data;
        console.log(response,'message');
        
        return {
            tenantview,
            sessionId,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving tenantview : ${error.message}`);
    }
};

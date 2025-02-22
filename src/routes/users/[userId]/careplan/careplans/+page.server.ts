import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchCareplanCategories, searchCareplans } from '$routes/api/services/careplan/careplans';
import { errorMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad  = async (event: RequestEvent) => {
    const userId = event.params.userId;
    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);

    try {
        const response = await searchCareplans(sessionId );
        
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        console.log("response",response);
        const careplans = response.Data;
        console.log(`Careplan = ${JSON.stringify(careplans)}`);
        const _careplanCategories = await searchCareplanCategories(sessionId);
        const careplanCategories = _careplanCategories.Data.Items;
        console.log(`Careplan = ${JSON.stringify(careplans)}`);
            return {
                careplans,
                careplanCategories,
                sessionId ,
                message: response.Message
            }
    }
    catch (error) {
        console.error(`Error retriving care plan: ${error.message}`);
        throw redirect(303,`/users/${userId}/home`,errorMessage('Error retriving care plan'), event) 
    }
}


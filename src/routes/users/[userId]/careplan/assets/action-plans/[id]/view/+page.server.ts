import { getActionPlanById } from '$routes/api/services/careplan/assets/action-plan';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad =  async (event: RequestEvent) => {

    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);

    try {
        const actionPlanId = event.params.id;
        console.log(actionPlanId);
        const response = await getActionPlanById(sessionId, actionPlanId);

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const actionPlan = response.Data;
        console.log('Action plan',actionPlan);
        const id = response.Data.id;
            return {
                location :`${id}/edit`,
                actionPlan,
                message: response.Message
            }
    }
    catch (error) {
        console.error(`Error retriving action plan: ${error.message}`);

    }
}


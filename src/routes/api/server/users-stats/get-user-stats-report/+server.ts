import type { RequestEvent } from '@sveltejs/kit';
import { getDailyTenantStatistics, getDailyTenantStatsReport } from '../../../services/statistics';
import { download } from '../../../services/file.resource';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;
    const tenantId = event.locals.sessionUser.tenantId;
    let response;
	try {
		response = await getDailyTenantStatistics(sessionId, tenantId);
		const resourceId = response ? response.Data.DailyStatistics.ResourceId : null;
        if (resourceId) {
            response = await getDailyTenantStatsReport(
                sessionId,
                resourceId,
            );
        }
	} catch (error) {
		console.error(`Error downloading the stats report: ${error}`);
        throw redirect(
			errorMessage('Error in downloading.'), 
			event
			);
        }
	
    if(response===null){
		throw redirect(
			errorMessage('Summary report is not available!.'), 
			event
			);
	}
    return response;
};

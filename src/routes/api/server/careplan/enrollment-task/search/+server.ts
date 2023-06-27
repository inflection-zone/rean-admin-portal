
import { searchEnrollmentTask } from "$routes/api/services/careplan/enrollment.task";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    
    const searchParams: URLSearchParams = event.url.searchParams;
    const assetType = searchParams.get('assetType') ?? undefined;
    const scheduledDate = searchParams.get('scheduledDate') ?? undefined;
    console.log("assetType",assetType);

	try {	
        const searchParams = {
            assetType,
            scheduledDate,
        };
        console.log("Search parms--------: ", searchParams);
		const response = await searchEnrollmentTask(sessionId, searchParams);
        const items = response.Data.Items;

        return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving Enrollments-task: ${err.message}`);
		return new Response(err.message);
	}
};


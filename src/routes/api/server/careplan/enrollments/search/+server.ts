import { searchEnrollments } from "$routes/api/services/careplan/enrollment";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    
    const searchParams: URLSearchParams = event.url.searchParams;
    const careplanId = searchParams.get('carePlan') ?? undefined;
    const displayId = searchParams.get('displayId') ?? undefined;
    const startDate = searchParams.get('startDate') ?? undefined;
    const endDate = searchParams.get('endDate') ?? undefined;
    // const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
    // const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
    // const itemsPerPage_ = searchParams.get('pageIndex');
    // const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 25;
    // const pageIndex_ = searchParams.get('pageIndex');
    // const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {	
        const searchParams = {
            careplanId,
            displayId,
            startDate,
             endDate,
            // orderBy: sortBy,
            // order: sortOrder,
            // itemsPerPage,
            // pageIndex, 
        };
        console.log("Search parms--------: ", searchParams);
		const response = await searchEnrollments(sessionId, searchParams);
        const items = response.Data.Items;

        return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving Enrollments: ${err.message}`);
		return new Response(err.message);
	}
};


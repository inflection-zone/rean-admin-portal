import type { RequestEvent } from '@sveltejs/kit';
import { searchTenantview } from '../../../services/tenantview';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const name = searchParams.get('name') ?? undefined;
	const fileName= searchParams.get('fileName') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 25;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			name: name,
			fileName,
		    orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchTenantview(sessionId, searchParams);
		const items = response.Data.Tenantview.Items;
		console.log('res ==', response);

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving Tenantview: ${err.message}`);
		return new Response(err.message);
	}
};

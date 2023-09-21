import { searchSchemas } from '$routes/api/services/gamification/schema';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;
	const searchParams: URLSearchParams = event.url.searchParams;
	const name = searchParams.get('name') ?? undefined;
	try {
		const searchParams = {
			name: name,
		};
		const response = await searchSchemas(sessionId, searchParams);
		const items = response.Data.Items;
		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving schemas: ${err.message}`);
		return new Response(err.message);
	}
};

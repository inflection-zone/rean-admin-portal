import type { RequestEvent } from "@sveltejs/kit";
import { searchAssets } from '../../services/admin-panel/asset;

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {	
		const response = await searchAssets(
			data.sessionId,
             data.selectAsset,
		);
		return await response.json();
		// return response;
	} catch (err) {
		console.error(`Error retriving asset: ${err.message}`);
		return new Response(err.message);
	}
};


import type { RequestEvent } from "@sveltejs/kit";
import { deleteApiClient} from '../../services/api-clients';


//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
    console.log("request----------",request);
	const data = await request.json();
	try {
		console.log('Inside api client server endpoints');
		const response = await deleteApiClient(
            data.sessionId,
            data.apiClientId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting api-client: ${err.message}`);
		return new Response(err.message);
	}
};
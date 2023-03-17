import type { RequestEvent } from "@sveltejs/kit";
import { deleteOrganization} from '../../../services/organizations';


//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside Organizations server endpoints');
		const response = await deleteOrganization(
            data.sessionId,
            data.organizationId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting api-client: ${err.message}`);
		return new Response(err.message);
	}
};
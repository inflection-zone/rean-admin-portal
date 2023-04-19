import type { RequestEvent } from '@sveltejs/kit';
import { deletePersonRoleType } from '../../services/person-role-types';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside person role type server endpoints');
		const response = await deletePersonRoleType(data.sessionId, data.personRoleTypeId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting person role type: ${err.message}`);
		return new Response(err.message);
	}
};

import type { RequestEvent } from '@sveltejs/kit';
import { deleteLabRecordType } from '../../services/lab-record-types';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	
	try {
		console.log('Inside lab record type server endpoints');
		const response = await deleteLabRecordType(data.sessionId, data.labRecordTypeId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting lab record type: ${err.message}`);
		return new Response(err.message);
	}
};

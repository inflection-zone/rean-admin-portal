import type { RequestEvent } from '@sveltejs/kit';
import { deleteLabRecordType } from '../../services/lab-record-types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside lab record type server endpoints');
	let response;
	try{
		response = await deleteLabRecordType(data.sessionId, data.labRecordTypeId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting lab record type.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};

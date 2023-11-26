import type { RequestEvent } from '@sveltejs/kit';
import { deleteAssessmentTemplate, exportAssessmentTemplateById } from '../../services/assessment-templates';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';
//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside assessment template server endpoints');
	let response;
	try{
		response = await deleteAssessmentTemplate(
			data.sessionId, 
			data.assessmentTemplateId
			);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting assessment template.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;
	let response;
	const searchParams: URLSearchParams = event.url.searchParams;
	const assessmentTemplateId = searchParams.get('assessmentTemplateId') ?? undefined;
	try{
		response = await exportAssessmentTemplateById(sessionId, assessmentTemplateId);
	}catch(err){
		throw redirect(
			errorMessage('Error exporting assessment template.'), 
			event
			);
	}
		
	if(response===null){
		throw redirect(
			errorMessage('Cannot find assessment Template!.'), 
			event
			);
	}
		
	return new Response(JSON.stringify(response), {
			headers: {
				'Content-Type': 'application/json',
			    'Content-Disposition': `attachment; filename=assessment.json`,
			},
			});
};
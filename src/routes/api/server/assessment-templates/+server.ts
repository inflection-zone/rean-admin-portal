import type { RequestEvent } from '@sveltejs/kit';
import { deleteAssessmentTemplate } from '../../services/assessment-templates';


//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	
	try {
		console.log('Inside assessment template server endpoints');
		const response = await deleteAssessmentTemplate(data.sessionId, data.assessmentTemplateId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting assessment template: ${err.message}`);
		return new Response(err.message);
	}
};

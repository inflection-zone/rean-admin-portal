import type { RequestEvent } from '@sveltejs/kit';
import { deleteCourse } from '../../services/courses';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	
	try {
		console.log('Inside course server endpoints');
		const response = await deleteCourse(data.sessionId, data.courseId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting course: ${err.message}`);
		return new Response(err.message);
	}
};

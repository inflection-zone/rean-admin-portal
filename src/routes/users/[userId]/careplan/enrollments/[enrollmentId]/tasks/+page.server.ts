import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchEnrollmentTask } from '$routes/api/services/careplan/enrollment.task';
import { getEnrollmentById } from '$routes/api/services/careplan/enrollment';
import { searchParticipantActivities } from '$routes/api/services/careplan/participant.activity.response';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);
	try {
		const response = await searchEnrollmentTask(sessionId);
		const enrollmentId = event.params.enrollmentId;

		const enrollment_ = await getEnrollmentById(sessionId, enrollmentId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const enrollmentTask = response.Data.Items;
		const enrollment = enrollment_.Data;
		const participantId = enrollment.ParticipantId;
		const participantResponse_ = await searchParticipantActivities(sessionId, participantId);
		const participantResponse = participantResponse_.Data.Items;
		return {
			enrollmentTask,
			enrollment,
			participantResponse
		};
	} catch (error) {
		console.error(`Error retriving enrollment data: ${error.message}`);
	}
};

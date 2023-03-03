import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getCourseById } from '../../../../../../api/services/courses';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const courseId = event.params.id;
		const response = await getCourseById(sessionId, courseId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const course = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			course,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving course: ${error.message}`);
	}
};

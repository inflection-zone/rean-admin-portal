import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getGoalCategoriesManagementById } from '../../../../../api/services/goal-categories';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const goalCategoriesManagementId = event.params.id;
		console.log(goalCategoriesManagementId);
		const response = await getGoalCategoriesManagementById(sessionId, goalCategoriesManagementId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const goalCategoriesManagement = response.Data;
		console.log('goal categories management', goalCategoriesManagement);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			goalCategoriesManagement,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving goal categories management: ${error.message}`);
	}
};

import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';;
import { getPersonRoleTypeById, updatePersonRoleType } from '../../../../../api/services/person-role-types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const personRoleTypeId = event.params.id;
		const response = await getPersonRoleTypeById(sessionId, personRoleTypeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const personRoleType = response.Data.RoleType;
		const id = response.Data.RoleType.id;
		return {
			location: `${id}/edit`,
			personRoleType,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving goals: ${error.message}`);
	}
};

export const actions = {
	updatePersonRoleTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

    const roleName = data.has('roleName') ? data.get('roleName') : null;
		const description = data.has('description') ? data.get('description') : null;
		const sessionId = event.cookies.get('sessionId');
		const personRoleTypeId = event.params.id;

		const response = await updatePersonRoleType(
			sessionId,
			personRoleTypeId,
			roleName.valueOf() as string,
			description.valueOf() as string
		);
		const id = response.Data.RoleType.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/person-role-types', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/person-role-types/${id}/view`,
			successMessage(`goal updated successful!`),
			event
		);
	}
};

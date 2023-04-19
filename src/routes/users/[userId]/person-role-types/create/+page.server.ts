import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createPersonRoleType } from '../../../../api/services/person-role-types';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createPersonRoleTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const roleName = data.has('roleName') ? data.get('roleName') : null;
		const description = data.has('description') ? data.get('description') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createPersonRoleType(
			sessionId,
			roleName.valueOf() as string,
			description.valueOf() as string
		);
		const id = response.Data.RoleType.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/person-role-types', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/person-role-types/${id}/view`,
			successMessage(`person role type created successful!`),
			event
		);
	}
};

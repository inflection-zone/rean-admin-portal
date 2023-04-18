import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createLabRecordType } from '../../../../api/services/lab-record-types';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createLabRecordTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const typeName = data.has('typeName') ? data.get('typeName') : null;
		const displayName = data.has('displayName') ? data.get('displayName') : null;
		const snowmedCode = data.has('snowmedCode') ? data.get('snowmedCode') : null;
		const loincCode = data.has('loincCode') ? data.get('loincCode') : null;
		const normalRangeMin = data.has('normalRangeMin') ? data.get('normalRangeMin') : null;
		const normalRangeMax = data.has('normalRangeMax') ? data.get('normalRangeMax') : null;
		const unit = data.has('unit') ? data.get('unit') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createLabRecordType(
			sessionId,
			typeName.valueOf() as string,
			displayName.valueOf() as string,
			snowmedCode?.valueOf() as string,
			loincCode?.valueOf() as string,
			normalRangeMin?.valueOf() as number,
			normalRangeMax?.valueOf() as number,
			unit?.valueOf() as string
		);
		const id = response.Data.LabRecordType.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/person-role-types', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/lab-record-types/${id}/view`,
			successMessage(`lab record type created successful!`),
			event
		);
	}
};

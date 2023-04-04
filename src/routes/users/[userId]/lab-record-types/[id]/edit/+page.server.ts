import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getLabRecordTypeById,
	updateLabRecordType
} from '../../../../../api/services/lab-record-types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const labRecordTypeId = event.params.id;
		const response = await getLabRecordTypeById(sessionId, labRecordTypeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const labRecordType = response.Data.LabRecordType;
		const id = response.Data.LabRecordType.id;
		return {
			location: `${id}/edit`,
			labRecordType,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving goals: ${error.message}`);
	}
};

export const actions = {
	updateLabRecordTypeAction: async (event: RequestEvent) => {
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
		const labRecordTypeId = event.params.id;

		const response = await updateLabRecordType(
			sessionId,
			labRecordTypeId,
			typeName.valueOf() as string,
			displayName.valueOf() as string,
			snowmedCode.valueOf() as string,
			loincCode.valueOf() as string,
			normalRangeMin.valueOf() as number,
			normalRangeMax.valueOf() as number,
			unit.valueOf() as string
		);
		const id = response.Data.LabRecordType.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/goals', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/lab-record-types/${id}/view`,
			successMessage(`lab record type updated successful!`),
			event
		);
	}
};

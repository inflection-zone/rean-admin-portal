import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createDrug } from '../../../../api/services/drugs';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createDrugAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const drugName = data.has('drugName') ? data.get('drugName') : null;
		const genericName = data.has('genericName') ? data.get('genericName') : null;
		const ingredients = data.has('ingredients') ? data.get('ingredients') : null;
		const strength = data.has('strength') ? data.get('strength') : null;
		const otherCommercialNames = data.has('otherCommercialNames')
			? data.get('otherCommercialNames')
			: null;
		const manufacturer = data.has('manufacturer') ? data.get('manufacturer') : null;
		const otherInformation = data.has('otherInformation') ? data.get('otherInformation') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createDrug(
			sessionId,
			drugName.valueOf() as string,
			genericName?.valueOf() as string,
			ingredients?.valueOf() as string,
			strength?.valueOf() as string,
			otherCommercialNames?.valueOf() as string,
			manufacturer?.valueOf() as string,
			otherInformation?.valueOf() as string
		);
		const id = response.Data.Drug.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/drugs', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/drugs/${id}/view`,
			successMessage(`drug created successful!`),
			event
		);
	}
};

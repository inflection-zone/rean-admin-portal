import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNode } from '$routes/api/services/gamification/node';
import { getDataActionTypes, getEventActionTypes, getInputSourceTypes, getOutputSourceTypes } from '$routes/api/services/gamification/types.js';
import type { PageServerLoad } from './$types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
    const _eventActionTypes = await getEventActionTypes(sessionId)
    const _dataActionType = await getDataActionTypes(sessionId);
    const _inputSourceType = await getInputSourceTypes(sessionId);
    const _outputSourceType = await getOutputSourceTypes(sessionId);
    

		if (_eventActionTypes.Status === 'failure' || _eventActionTypes.HttpCode !== 200) {
			throw error(_eventActionTypes.HttpCode, _eventActionTypes.Message);
		}

   const eventActionTypes = _eventActionTypes.Data.Types;

		return {
      eventActionTypes
		};
	} catch (error) {
		console.error(`Error retriving data: ${error.message}`);
	}
};

const createNodeSchema = zfd.formData({
	nodeType: z.string(),
	parentNodeId: z.string().uuid(),
	title: z.string().min(8).max(256),
	description: z.string().optional(),
	actionType: z.string().optional(),
  actionName:z.string().optional()
});

export const actions = {
	createNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const schemaId = event.params.schemaId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const options = data.has('options') ? data.getAll('options') : [];
		const formData = Object.fromEntries(data);
		const formDataValue = { ...formData, options: options };

		type NodeSchema = z.infer<typeof createNodeSchema>;

		let result: NodeSchema = {};
		try {
			result = createNodeSchema.parse(formDataValue);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await createNode(
			sessionId,
			schemaId,
			result.parentNodeId,
			result.title,
			result.description,
      result.nodeType,
      result.actionType,
      result.actionName
		);

		const nodeId = response.Data.AssessmentNode.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/gamification/schemas`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/gamification/schemas/${schemaId}/nodes/${nodeId}/view`,
			successMessage(`Schema node created successfully!`),
			event
		);
	}
};

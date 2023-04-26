import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createApiClient } from '../../../../api/services/api-clients';
import { z } from 'zod';
import type { ApiClientDomainModel } from '$routes/api/domain-types/api-clients';

/////////////////////////////////////////////////////////////////////////

const createApiClientSchema = z.object({
	clientName: z
		.string({ required_error: 'Client name is required' })
		.min(3, { message: 'Client must be greater than 3 characters' })
		.max(64, { message: 'Client name must be less than 64 characters' }),
	phone: z
		.string({ required_error: 'Contact number is required' })
		.min(10, { message: 'Contact number is not valid' })
		.max(64, { message: 'Contact number must be less than 64 characters' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Enter valid email' })
		.min(10, { message: 'Email must be greater than 10 characters' })
		.max(64, { message: 'Email must be less than 64 characters' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be greater than 8 characters' })
		.max(15, { message: 'Password must be less than 15 characters' })
});

export const actions = {
	createApiClientAction: async (event) => {
		const request = event.request;
		const sessionId = event.cookies.get('sessionId');
		const userId = event.params.userId;
		const formData = Object.fromEntries(await request.formData());
    let result : ApiClientDomainModel = {};
		try {
			result = createApiClientSchema.parse(formData);
			console.log('result-----------', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}
		const countryCode = '+91';
		const phone = countryCode + '-'+ result.phone;
		const response = await createApiClient(
			sessionId,
			result.clientName,
			result.password,
			phone,
			result.email
		);
		const id = response.Data.Client.id;
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/api-clients`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/api-clients/${id}/view`,
			successMessage(`Api client created successfully !`),
			event
		);
	}
};

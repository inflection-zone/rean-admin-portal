import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getTenantviewById, updateTenantview } from '../../../../../../api/services/tenantview';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const tenantviewId = event.params.id;
		const response = await getTenantviewById(sessionId, tenantviewId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const tenantview = response.Data;
	
		
		
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			tenantview,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving Tenantview: ${error.message}`);
	}
};

const updateTenantviewSchema = zfd.formData({
	name: z.string().max(128),
    description: z.string().optional(),
    fileName: z.string(),
    source: z.string(),
	parentDocument: z.string(),
    parentDocumentVersion: z.string().optional(),
    chunkingStrategy: z.string(),
    chunkingLength: zfd.numeric(z.number()),
    chunkOverlap: zfd.numeric(z.number()),
    splitter: z.string(),
    isActive: z.boolean(),
    createdBy :  z.string()
});

export const actions = {
	editTenantviewAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const tenantviewId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type TenantviewSchema = z.infer<typeof updateTenantviewSchema>;

		let result: TenantviewSchema = {};
		try {
            // Convert isActive to boolean
            const isActive = formData.isActive === 'true';
            result = updateTenantviewSchema.parse({ ...formData, isActive }); // Include isActive in parsed data
            console.log('result', result);
        } catch (err: any) {
            const { fieldErrors: errors } = err.flatten();
            console.log(errors);
            const { isActive, ...rest } = formData; // Exclude isActive from errors
            return {
                data: rest,
                errors
            };
        }

		const response = await updateTenantview(
			sessionId,
			tenantviewId,
			result.name,
            result.description,
            result.fileName,
            result.source,
            result.parentDocument,
            result.parentDocumentVersion,
            result.chunkingStrategy,
            result.chunkingLength,
            result.chunkOverlap,
            result.splitter,
            result.isActive,
            result.createdBy   
		);
		console.log(response,"Mess");
		
		const id = response.Data.id;

	
		

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/qna-documents/tenantview`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/qna-documents/tenantview/${id}/view`,
			successMessage(`Tenantview documents updated successfully!`),
			event
		);
	}
}

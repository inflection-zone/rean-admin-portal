// Importing necessary modules and utilities
import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createSystems } from '$routes/api/services/systems';
import type { Actions } from '../$types';


/////////////////////////////////////////////////////////////////////////

const createSystemsSchema = zfd.formData({
    name: z.string().max(128),
    description: z.string().optional(),
    fileName: z.string(),
    source: z.string(),
	parentDocument: z.string(),
    parentDocumentVersion: z.string().optional(),
    chunkingStrategy: z.string(),
    chunkingLenght: zfd.numeric(z.number()),
    chunkOverlap: zfd.numeric(z.number()),
    splitter: z.string(),
    isActive: z.boolean(),
    createdBy :  z.string()
	// version: z.string().optional(),	
	// keywords: z.string().optional(),
	// storageKeyUrl: z.string().optional(),
    // type: z.string().optional(),
    // uploadFile: z.string().optional(),
});

export const actions = {
    createSystemsAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const sessionId = event.cookies.get('sessionId');
        const formData = Object.fromEntries(await request.formData());
        console.log(formData,"Message")
        type SystemsSchema = z.infer<typeof createSystemsSchema>;

        let result: SystemsSchema = {};
        try {
            // Convert isActive to boolean
            const isActive = formData.isActive === 'true';
            result = createSystemsSchema.parse({ ...formData, isActive }); // Include isActive in parsed data
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

   
   
        // Call the service to create systems
        const response = await createSystems(
            sessionId,
            result.name,
            result.description,
            result.fileName,
            result.source,
            result.parentDocument,
            result.parentDocumentVersion,
            result.chunkingStrategy,
            result.chunkingLenght,
            result.chunkOverlap,
            result.splitter,
            result.isActive,
            result.createdBy   
      
        );

        console.log(response,"Received info")

        // Extract the ID from the response
        const id = response.Data.id;

        // Redirect based on the response
        if (response.Status === 'failure' || response.HttpCode !== 201) {
            throw redirect(303, `/users/${userId}/qna-documents/systems`, errorMessage(response.Message), event);
        }
        throw redirect(
            303,
             `/users/${userId}/qna-documents/systems/${id}/view`,
            successMessage(`Systems created successfully!`),
            event
        );
    },


};



import { writeFile } from 'node:fs/promises';
import { importAssessmentTemplate } from "$routes/api/services/assessment-templates";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { Buffer } from "buffer";
import * as fs from 'fs';

export const actions = {
	importAssessment: async (event: RequestEvent) => {
		const userId = event.params.userId;
		const request = event.request;
		const sessionId = event.cookies.get('sessionId');
		const formData = await request.formData();
		const uploadedFile = formData?.get('name') as File;
		
		const fileName = uploadedFile.name;
	
		console.log(uploadedFile)
	
		await writeFile(fileName, Buffer.from(await uploadedFile?.arrayBuffer()));
	
		if (fs.existsSync(fileName)) {
			console.log(`Copied file ${uploadedFile.name}`);
			}
	
		const response = await importAssessmentTemplate(
			sessionId,
			fileName
		);

		fs.unlinkSync(fileName);

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/assessment-templates`, errorMessage(response.Message), event);
		}
		throw redirect(
		303,
		`/users/${userId}/assessment-templates`,
		successMessage(response.Message),
		event
	);	
			
	}
}

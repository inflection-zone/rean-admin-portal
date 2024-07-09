import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createGroups } from '../../../../../../api/services/groups';

/////////////////////////////////////////////////////////////////////////

const createGroupsSchema = zfd.formData({
    name: z.string().max(128),
    description: z.string(),
});

export const actions = {
    createGroupsAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const sessionId = event.cookies.get('sessionId');
        const formData = Object.fromEntries(await request.formData());

        type GroupsSchema = z.infer<typeof createGroupsSchema>;

        let result: GroupsSchema = {};
        try {
            result = createGroupsSchema.parse(formData);
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

        const response = await createGroups(
            sessionId,
            result.name,
            result.description,
            userId
        );
        console.log(response, 'message');

        const id = response.Data.id;

        if (response.Status === 'failure' || response.HttpCode !== 201) {
            throw redirect(303, `/users/${userId}/dev/prompts/groups`, errorMessage(response.Message), event);
        }
        throw redirect(
            303,
            `/users/${userId}/dev/prompts/groups/${id}/view`,
            successMessage(`Group created successfully!`),
            event
        );
    }
};

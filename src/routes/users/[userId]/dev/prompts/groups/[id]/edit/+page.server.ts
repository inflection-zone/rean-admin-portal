import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getGroupsById, updateGroups } from '../../../../../../../api/services/groups';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');

    try {
        const groupsId = event.params.id;
        const response = await getGroupsById(sessionId, groupsId);

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const groups = response.Data;
        const id = response.Data.id;

        return {
            location: `${id}/edit`,
            groups,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving group: ${error.message}`);
    }
};

const updateGroupsSchema = zfd.formData({
    name: z.string().max(128).optional(),
    description: z.string().optional()
});

export const actions = {
    updateGroupsAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const groupId = event.params.id;
        const sessionId = event.cookies.get('sessionId');
        const formData = Object.fromEntries(await request.formData());

        type GroupsSchema = z.infer<typeof updateGroupsSchema>;

        let result: GroupsSchema = {};
        try {
            result = updateGroupsSchema.parse(formData);
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

        const response = await updateGroups(sessionId, groupId, result.name, result.description);
        const id = response.Data.id;
        console.log(response,"ascsssas");
        

        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw redirect(303, `/users/${userId}/dev/prompts/groups`, errorMessage(response.Message), event);
        }
        throw redirect(
            303,
            `/users/${userId}/dev/prompts/groups/${id}/view`,
            successMessage(`group updated successfully!`),
            event
        );
    }
};

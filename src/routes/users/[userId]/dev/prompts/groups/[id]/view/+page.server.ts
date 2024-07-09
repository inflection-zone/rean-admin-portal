import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getGroupsById } from '../../../../../../../api/services/groups';

////////////////////////////////////////////////////////////////////////////

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
		console.log(response,"res");
		

        return {
            location: `${id}/edit`,
            groups,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving Group: ${error.message}`);
    }
};

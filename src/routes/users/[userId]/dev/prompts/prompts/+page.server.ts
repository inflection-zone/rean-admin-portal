import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchPrompts } from '../../../../../api/services/prompts';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ cookies, depends }) => {
    const sessionId = cookies.get('sessionId');
    depends('app:prompts');
    try {
        const response = await searchPrompts(sessionId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const prompts = response.Data.Items;
        console.log(prompts,"prom")

        return {
            prompts,
            sessionId,
            message: response.Message
        };
    } catch (error) {
        console.error(`Error retriving prompt: ${error.message}`);
    }
};

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchHospitals } from '../../../api/services/hospitals';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:hospitals')
	try {
		const response = await searchHospitals(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const hospitals = response.Data.Hospitals;
		// const hospitals = hospitals_ ? hospitals_.Items : [];
		// console.log(`Hospitals: ${JSON.stringify(hospitals, null, 2)}`);
		return {
			hospitals,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving hospitals: ${error.message}`);
	}
};

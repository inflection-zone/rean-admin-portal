import type {  RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActiveUsers, getAgeWiseUsers, getGenderWiseUsers, getTolalUsers } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
    const searchParams ={}
		const _totalUsers = await getTolalUsers(sessionId,searchParams);
    const _activeUsers = await getActiveUsers(sessionId);
    const _ageWiseUsers = await getAgeWiseUsers(sessionId);
    const _genderWiseUsers = await getGenderWiseUsers(sessionId);

    const totalUsers = _totalUsers.Data.TotalUsers;
    const activeUsers = _activeUsers.Data.ActiveUsers;
    const ageWiseUsers = _ageWiseUsers.Data.AgeWiseUsers;
    const genderWiseUsers  = _genderWiseUsers.Data.GenderWiseUsers;

    console.log("totalUsers",totalUsers);
    console.log("activeUsers",activeUsers);
    console.log("ageWiseUsers",ageWiseUsers);
    console.log("genderWiseUsers",genderWiseUsers);

		return {
      sessionId,
			totalUsers,
      activeUsers,
      ageWiseUsers,
      genderWiseUsers
		};

	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}
};

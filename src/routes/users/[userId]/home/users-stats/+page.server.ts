import type {  RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActiveUsers, getAgeWiseUsers, getGenderWiseUsers, getMaritalStatusWiseUsers, getTolalUsers } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
    const searchParams ={}
		const _totalUsers = await getTolalUsers(sessionId,searchParams);
    const _activeUsers = await getActiveUsers(sessionId);
    const _ageWiseUsers = await getAgeWiseUsers(sessionId);
    const _genderWiseUsers = await getGenderWiseUsers(sessionId);
    const _maritalStatusWiseUsers = await getMaritalStatusWiseUsers(sessionId);

    const totalUsers = _totalUsers.Data.TotalUsers;
    const activeUsers = _activeUsers.Data.ActiveUsers;
    const ageWiseUsers = _ageWiseUsers.Data.AgeWiseUsers;
    const genderWiseUsers  = _genderWiseUsers.Data.GenderWiseUsers;
    const maritalStatusWiseUsers  = _maritalStatusWiseUsers.Data.MaritalStatusWiseUsers;

    console.log("totalUsers",totalUsers);
    console.log("activeUsers",activeUsers);
    console.log("ageWiseUsers",ageWiseUsers);
    console.log("genderWiseUsers",genderWiseUsers);
    console.log("maritalStatusWiseUsers",maritalStatusWiseUsers);

		return {
      sessionId,
			totalUsers,
      activeUsers,
      ageWiseUsers,
      genderWiseUsers,
      maritalStatusWiseUsers
		};

	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}
};

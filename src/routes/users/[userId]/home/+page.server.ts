import type {  RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActiveUsers, getDeletdUsers, getDeviceDetailWiseUsers, getEnrollmetUsers, getGenderWiseUsers, getMaritalStatusWiseUsers, getTolalUsers } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
    const years = ["2020", "2021", "2022", "2023"];
    const totalUsersArray = []
    for(const y of years){
     const searchParams = {
        year: y,
      }
      const _totalUsers = await getTolalUsers(sessionId,searchParams);
      const totalUsers = _totalUsers.Data.TotalUsers.count;
      totalUsersArray.push(totalUsers);
    }

    const androidUsersArray = []
    for(const y of years){
     const searchParams = {
        year: y,
      }
      const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId,searchParams);
      const androidUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers.AndroidUsers.Count;
      androidUsersArray.push(androidUsers);
    }

    const iOSUsersArray = []
    for(const y of years){
     const searchParams = {
        year: y,
      }
      const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId,searchParams);
      const iOSUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers.IOSUsers.Count;
      iOSUsersArray.push(iOSUsers);
    }
    console.log("totalUsersArray",totalUsersArray);
    console.log("totalUsersArray",androidUsersArray);
    console.log("totalUsersArray",iOSUsersArray);

		const _totalUsers = await getTolalUsers(sessionId);
    const _activeUsers = await getActiveUsers(sessionId);
    const _deletedUsers = await getDeletdUsers(sessionId);
    const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId);
    const _enrollmentUsers = await getEnrollmetUsers(sessionId);

    const totalUsers = _totalUsers.Data.TotalUsers;
    const activeUsers = _activeUsers.Data.ActiveUsers;
    const deletedUsers = _deletedUsers.Data.DeletedUsers;
    const deviceDetailWiseUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers;
    const enrollmentUsers = _enrollmentUsers.Data.EnrollmentUsers;

    console.log("totalUsers",totalUsers);
    console.log("activeUsers",activeUsers);
    console.log("deletedUsers",deletedUsers);
    console.log("ageWisedeviceDetailWiseUsersUsers",deviceDetailWiseUsers);

		return {
      sessionId,
			totalUsers,
      activeUsers,
      deletedUsers,
      deviceDetailWiseUsers,
      androidUsersArray,
      totalUsersArray,
      iOSUsersArray,
      years,
      enrollmentUsers
		};

	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}
};

import type {  RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActiveUsers, getAgeWiseUsers, getDeletdUsers, getDeviceDetailWiseUsers, getGenderWiseUsers, getMaritalStatusWiseUsers, getTolalUsers } from '$routes/api/services/statistics';

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
    const _ageWiseUsers = await getAgeWiseUsers(sessionId);
    const _genderWiseUsers = await getGenderWiseUsers(sessionId);
    const _maritalStatusWiseUsers = await getMaritalStatusWiseUsers(sessionId);

    const totalUsers = _totalUsers.Data.TotalUsers;
    const activeUsers = _activeUsers.Data.ActiveUsers;
    const ageWiseUsers = _ageWiseUsers.Data.AgeWiseUsers;
    const deletedUsers = _deletedUsers.Data.DeletedUsers;
    const deviceDetailWiseUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers;
    const genderWiseUsers  = _genderWiseUsers.Data.GenderWiseUsers;
    const maritalStatusWiseUsers  = _maritalStatusWiseUsers.Data.MaritalStatusWiseUsers;

    console.log("totalUsers",totalUsers);
    console.log("activeUsers",activeUsers);
    console.log("ageWiseUsers",ageWiseUsers);
    console.log("genderWiseUsers",genderWiseUsers);
    console.log("maritalStatusWiseUsers",maritalStatusWiseUsers);
    console.log("deletedUsers",deletedUsers);
    console.log("ageWisedeviceDetailWiseUsersUsers",deviceDetailWiseUsers);

		return {
      sessionId,
			totalUsers,
      activeUsers,
      deletedUsers,
      deviceDetailWiseUsers,
      ageWiseUsers,
      genderWiseUsers,
      maritalStatusWiseUsers,
      androidUsersArray,
      totalUsersArray,
      iOSUsersArray,
      years
		};

	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}
};

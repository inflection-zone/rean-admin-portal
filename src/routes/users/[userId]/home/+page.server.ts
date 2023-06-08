import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	getActiveUsers,
	getAppDownloadsData,
	getDeletdUsers,
	getDeviceDetailWiseUsers,
	getEnrollmetUsers,
	getOverallUsers,
	getTolalUsers
} from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const years = ['2020', '2021', '2022', '2023'];
		const totalUsersArray = [];
		for (const y of years) {
			const searchParams = {
				year: y
			};
			const _overallUsersData = await getOverallUsers(sessionId, searchParams);
			console.log
			const totalUsers = _overallUsersData.Data.UsersCountStats.TotalUsers.Count;
			totalUsersArray.push(totalUsers);
		}

		const androidUsersArray = [];
		for (const y of years) {
			const searchParams = {
				year: y
			};
			const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId, searchParams);
			const androidUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers.AndroidUsers.Count;
			androidUsersArray.push(androidUsers);
		}

		const iOSUsersArray = [];
		for (const y of years) {
			const searchParams = {
				year: y
			};
			const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId, searchParams);
			const iOSUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers.IOSUsers.Count;
			iOSUsersArray.push(iOSUsers);
		}
		console.log('totalUsersArray', totalUsersArray);
		console.log('totalUsersArray', androidUsersArray);
		console.log('totalUsersArray', iOSUsersArray);

		const _overallUsersData = await getOverallUsers(sessionId);
		const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId);
		const _enrollmentUsers = await getEnrollmetUsers(sessionId);
		const _appDownloadsData = await getAppDownloadsData(sessionId);

		const overallUsersData = _overallUsersData.Data.UsersCountStats;
		const deviceDetailWiseUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers;
		const enrollmentUsers = _enrollmentUsers.Data.EnrollmentUsers;
		const appDownloadsData = _appDownloadsData.Data.AppDownload;

		console.log('ageWisedeviceDetailWiseUsersUsers', deviceDetailWiseUsers);
		console.log("overallUsersData--------",overallUsersData);
		console.log("enrollmentUsers--------",enrollmentUsers);

		return {
			sessionId,
			deviceDetailWiseUsers,
			androidUsersArray,
			totalUsersArray,
			iOSUsersArray,
			years,
			enrollmentUsers,
			appDownloadsData,
			overallUsersData
		};
	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}
};

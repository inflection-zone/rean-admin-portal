import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	// getActiveUsers,
	getAppDownloadsData,
	// getDeletdUsers,
	getDeviceDetailWiseUsers,
	getEnrollmetUsers,
	getOverallUsers,
	// getTolalUsers
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
			const _totalUsers = await getOverallUsers(sessionId, searchParams);
			const totalUsers = _totalUsers.Data.UsersCountStats.TotalUsers.count;
			totalUsersArray.push(totalUsers);
		}

		const androidUsersArray = [];
		
		const iOSUsersArray = [];
		for (const y of years) {
			const searchParams = {
				year: y
			};
			const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId, searchParams);

			const deviceDetails = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers;

			// console.log('iOSUsers.......................', iOSUsers);
			// iOSUsersArray.push(iOSUsers);
		}
		// console.log('totalUsersArray', totalUsersArray);
		// console.log('totalUsersArray', androidUsersArray);
		// console.log('totalUsersArray', iOSUsersArray);

		// const _totalUsers = await getTolalUsers(sessionId);
		const _overallUsersData = await getOverallUsers(sessionId);
		// const _activeUsers = await getActiveUsers(sessionId);
		// const _deletedUsers = await getDeletdUsers(sessionId);
		const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId);
		const _enrollmentUsers = await getEnrollmetUsers(sessionId);
		const _appDownloadsData = await getAppDownloadsData(sessionId);

		// const totalUsers = _totalUsers.Data.TotalUsers;
		const overallUsersData = _overallUsersData.Data.UsersCountStats;
		// const activeUsers = _activeUsers.Data.ActiveUsers;
		// const deletedUsers = _deletedUsers.Data.DeletedUsers;
		const deviceDetailWiseUsers = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers;
		const enrollmentUsers = _enrollmentUsers.Data.EnrollmentUsers;
		const appDownloadsData = _appDownloadsData.Data.AppDownload;
    const latestEntry = latestDownloadEnrty(appDownloadsData);
    const appDownloadCount = latestEntry.TotalDownloads ;

		console.log("appDownloadsData------------",appDownloadCount);
		// console.log("activeUsers",activeUsers);
		// console.log("deletedUsers",deletedUsers);
		console.log('deviceDetailWiseUsers', deviceDetailWiseUsers);
		console.log("overallUsersData--------",overallUsersData);
		console.log("enrollmentUsers--------",enrollmentUsers);

		return {
			sessionId,
			// totalUsers,
			// activeUsers,
			// deletedUsers,
			deviceDetailWiseUsers,
			androidUsersArray,
			totalUsersArray,
			iOSUsersArray,
			years,
			enrollmentUsers,
			appDownloadCount,
			overallUsersData
		};
	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}

	function latestDownloadEnrty(appDownloadsData) {
		return appDownloadsData.rows.reduce((latest, current) => {
			const latestTimestamp = latest ? new Date(latest.CreatedAt).getTime() : 0;
			const currentTimestamp = new Date(current.CreatedAt).getTime();
			return currentTimestamp > latestTimestamp ? current : latest;
		}, null);
	}
};

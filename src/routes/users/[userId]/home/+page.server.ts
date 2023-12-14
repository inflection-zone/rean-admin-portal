import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import {
    getDailyStatistics,
  } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    try {
        const response = await getDailyStatistics(sessionId);
        // const _enrollmentUsers = await getEnrollmetUsers(sessionId);
        const overallUsersData = response.Data.DailyStatistics.StatisticsData.UserStatistics.UsersCountStats;
        const deviceDetailWiseUsers_ = response.Data.DailyStatistics.StatisticsData.UserStatistics.DeviceDetailWiseUsers;
        const yearWiseUserCount = response.Data.DailyStatistics.StatisticsData.UserStatistics.YearWiseUserCount;
        const yearWiseDeviceDetails = response.Data.DailyStatistics.StatisticsData.UserStatistics.YearWiseDeviceDetails;
        const deviceDetailWiseUsers = deviceDetailWiseUsers_.map((item) => {
            if (item.OSType === 'aaa') {
                return { OSType: 'Missing device detail', count: item.count };
            }
            return item;
        });
        // const enrollmentUsers = _enrollmentUsers.Data.EnrollmentUsers;
    
        const appDownloadsData = response.Data.DailyStatistics.StatisticsData.UserStatistics.AppDownload;
        let appDownloadCount = 0;

        if (appDownloadsData.rows.length > 0) {
            const latestEntry = latestDownloadEnrty(appDownloadsData);
            appDownloadCount = latestEntry.TotalDownloads;
        }
       
        return {
            sessionId,
            deviceDetailWiseUsers,
            // enrollmentUsers,
            appDownloadCount,
            overallUsersData,
            yearWiseUserCount,
            yearWiseDeviceDetails
        };
    } catch (err) {
        console.error(`Error retriving users data: ${err.message}`);
    }

    function latestDownloadEnrty(appDownloadsData) {
        return appDownloadsData.rows.reduce((latest, current) => {
            const latestTimestamp = latest ? new Date(latest.CreatedAt).getTime() : 0;
            const currentTimestamp = new Date(current.CreatedAt).getTime();
            return currentTimestamp > latestTimestamp ? current : latest;
        }, null);
    }
};

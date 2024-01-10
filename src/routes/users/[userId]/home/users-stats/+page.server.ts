import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDailyStatistics } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const response = await getDailyStatistics(sessionId);
    if (!response) {
        throw error(404, 'Daily user statistics data not found');
    }

    const overallUsersData = response.Data.DailyStatistics.DashboardStats.UserStatistics.UsersCountStats;
    const ageWiseUsers = response.Data.DailyStatistics.DashboardStats.UserStatistics.AgeWiseUsers;
    const genderWiseUsers = response.Data.DailyStatistics.DashboardStats.UserStatistics.GenderWiseUsers;
    const maritalStatusWiseUsers = response.Data.DailyStatistics.DashboardStats.UserStatistics.MaritalStatusWiseUsers;
    const countryWiseUsers = response.Data.DailyStatistics.DashboardStats.UserStatistics.CountryWiseUsers;
    const majorAilment = response.Data.DailyStatistics.DashboardStats.UserStatistics.MajorAilmentDistribution;
    const addictionDistribution = response.Data.DailyStatistics.DashboardStats.UserStatistics.AddictionDistribution;
    const deviceDetailWiseUsers = response.Data.DailyStatistics.DashboardStats.UserStatistics.DeviceDetailWiseUsers;
    const years = [];
    const yearWiseUserCount = response.Data.DailyStatistics.DashboardStats.UserStatistics.YearWiseUserCount;
    yearWiseUserCount.forEach((value) => {
        years.push({
            year: value.Year
        });
    });
    console.log('###', years);
    console.log('overallUsersData', overallUsersData);
    console.log('ageWiseUsers', ageWiseUsers);
    console.log('genderWiseUsers', genderWiseUsers);
    console.log('maritalStatusWiseUsers', maritalStatusWiseUsers);
    console.log('addictionDistribution', addictionDistribution);
    console.log('deviceDetailWiseUsers', deviceDetailWiseUsers);

    return {
        sessionId,
        ageWiseUsers,
        genderWiseUsers,
        maritalStatusWiseUsers,
        countryWiseUsers,
        majorAilment,
        addictionDistribution,
        overallUsersData,
        deviceDetailWiseUsers,
        years
    };
};

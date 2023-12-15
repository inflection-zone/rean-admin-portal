import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
    // getActiveUsers,
    // getBiometricsDistribution,
    // getHealthPillarDistribution,
    // getObesityDistribution,
    // getRoleDistribution,
    // getTolalUsers,
    getDailyStatistics
} from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const response = await getDailyStatistics(sessionId);
    if (!response) {
        throw error(404, 'Daily user statistics data not found');
    }
    // const years = ['2020', '2021', '2022', '2023'];
    // const ageWiseUsersArray = [];
    // for (const y of years) {
    // 	const searchParams = {
    // 		year: y
    // 	};
    // 	const _ageWiseUsers = await getAgeWiseUsers(sessionId, searchParams);
    // 	const genderWiseUsers = _ageWiseUsers.Data.AgeWiseUsers;
    // 	ageWiseUsersArray.push(genderWiseUsers);
    // }

    // const _totalUsers = await getTolalUsers(sessionId);
    // const _activeUsers = await getActiveUsers(sessionId);

    // const _obesityDistribution = await getObesityDistribution(sessionId);

    // const _healthPillarDistribution = await getHealthPillarDistribution(sessionId);
    // const _healthPillarDistributionMonthly = await getHealthPillarDistribution(
    // 	sessionId,
    // 	searchParams
    // );
    // const _roleDistribution = await getRoleDistribution(sessionId);
    // const _biometricsDistribution = await getBiometricsDistribution(sessionId);
    // const _biometricsDistributionMonthly = await getBiometricsDistribution(sessionId, searchParams);
    // const totalUsers = _totalUsers.Data.TotalUsers;
    // const activeUsers = _activeUsers.Data.ActiveUsers;
    const overallUsersData = response.Data.DailyStatistics.Statistics.UserStatistics.UsersCountStats;
    const ageWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.AgeWiseUsers;
    const genderWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.GenderWiseUsers;
    const maritalStatusWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.MaritalStatusWiseUsers;
    const countryWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.CountryWiseUsers;
    const majorAilment = response.Data.DailyStatistics.Statistics.UserStatistics.MajorAilmentDistribution;
    // const obesityDistribution = _obesityDistribution.Data.ObesityDistribution;
    const addictionDistribution = response.Data.DailyStatistics.Statistics.UserStatistics.AddictionDistribution;
    // const healthPillarDistribution = _healthPillarDistribution.Data.HealthPillarDistribution;
    // const healthPillarDistributionMonthly =
    // 	_healthPillarDistributionMonthly.Data.HealthPillarDistribution;
    // const roleDistribution = _roleDistribution.Data.RoleDistribution;
    // const biometricsDistribution = _biometricsDistribution.Data.Biometrics;
    // const biometricsDistributionMonthly = _biometricsDistributionMonthly.Data.Biometrics;
    const deviceDetailWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.DeviceDetailWiseUsers;
    const years = [];
    const yearWiseUserCount = response.Data.DailyStatistics.Statistics.UserStatistics.YearWiseUserCount;
    yearWiseUserCount.forEach((value) => {
        years.push({
            year: value.Year
        });
    });
    console.log('###', years);
    console.log('overallUsersData', overallUsersData);
    // console.log('activeUsers', activeUsers);
    console.log('ageWiseUsers', ageWiseUsers);
    console.log('genderWiseUsers', genderWiseUsers);
    console.log('maritalStatusWiseUsers', maritalStatusWiseUsers);
    // console.log('obesityDistribution', obesityDistribution);
    console.log('addictionDistribution', addictionDistribution);
    // console.log('healthPillarDistributionMonthly', healthPillarDistributionMonthly);
    // console.log('roleDistribution', roleDistribution);
    console.log('deviceDetailWiseUsers', deviceDetailWiseUsers);

    return {
        sessionId,
        // totalUsers,
        // activeUsers,
        ageWiseUsers,
        genderWiseUsers,
        maritalStatusWiseUsers,
        countryWiseUsers,
        majorAilment,
        // obesityDistribution,
        addictionDistribution,
        // healthPillarDistribution,
        // healthPillarDistributionMonthly,
        // roleDistribution,
        // biometricsDistribution,
        // biometricsDistributionMonthly,
        overallUsersData,
        deviceDetailWiseUsers,
        years
    };
};

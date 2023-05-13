<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { createEventDispatcher } from 'svelte';
	import PieChart from './charts/pie-chart.svelte';
	import BarChart from './charts/bar-chart.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let totalUsers;
	export let activeUsers;
	export let genderWiseUsers;
	export let ageWiseUsers;
	export let maritalStatusWiseUsers;
	
	console.log("labelsForMaritalStatusWiseDivision-----",maritalStatusWiseUsers)

	$: ageWiseUsers;
	$: genderWiseUsers;

	let totalUsersCount = totalUsers.count;
	let activeUsersCount = activeUsers.ActiveUsers.Count;
	let activeUsersRatio = activeUsers.ActiveUsers.Ratio;
	let maleUsersRatio = genderWiseUsers.MaleUsers.Ratio;
	let maleUsersCount = genderWiseUsers.MaleUsers.Count;
	let femaleUsersRatio = genderWiseUsers.FemaleUsers.Ratio;
	let femaleUsersCount = genderWiseUsers.FemaleUsers.Count;
	let intersexUsersRatio = genderWiseUsers.IntersexUsers.Ratio;
	let intersexUsersCount = genderWiseUsers.IntersexUsers.Count;
	let genderNotSpecifiedUsersRatio = genderWiseUsers.GenderNotSpecifiedUsers.Ratio;
	let genderNotSpecifiedUsersCount = genderWiseUsers.GenderNotSpecifiedUsers.Count;
	let usersBelowThirtyfiveCount = ageWiseUsers.UsersBelowThirtyfive.Count;
	let usersBelowThirtyfiveRatio = ageWiseUsers.UsersBelowThirtyfive.Ratio;
	let usersBetweenThirtysixToSeventyCount = ageWiseUsers.UsersBetweenThirtysixToSeventy.Count;
	let usersBetweenThirtysixToSeventyRatio = ageWiseUsers.UsersBetweenThirtysixToSeventy.Ratio;
	let usersAboveSeventyCount = ageWiseUsers.UsersAboveSeventy.Count;
	let usersAboveSeventyRatio = ageWiseUsers.UsersAboveSeventy.Ratio;
	let ageNotSpecifiedUsersCount = ageWiseUsers.AgeNotSpecifiedUsers.Count;
	let ageNotSpecifiedUsersRatio = ageWiseUsers.AgeNotSpecifiedUsers.Ratio;

	let labelsForGenderWiseDivision = ['Male', 'Female', 'Intersex', 'Gender not specified'];
	let labelsForAgeWiseDivision = ['Users below 35', 'Users between 36 to 70', 'Users above 70', 'Age not specified'];

	let genderWiseDistributionOfUsers: number[] = [
		genderWiseUsers.MaleUsers.Ratio,
		genderWiseUsers.FemaleUsers.Ratio,
		genderWiseUsers.IntersexUsers.Ratio,
		genderWiseUsers.GenderNotSpecifiedUsers.Ratio
	];

	$: genderWiseDistributionOfUsers = [
		genderWiseUsers.MaleUsers.Ratio,
		genderWiseUsers.FemaleUsers.Ratio,
		genderWiseUsers.IntersexUsers.Ratio,
		genderWiseUsers.GenderNotSpecifiedUsers.Ratio
	];

	let ageWiseDistributionOfUsers = [usersBelowThirtyfiveRatio, usersBetweenThirtysixToSeventyRatio, usersAboveSeventyRatio, ageNotSpecifiedUsersRatio];
  $ : ageWiseDistributionOfUsers = [usersBelowThirtyfiveRatio, usersBetweenThirtysixToSeventyRatio, usersAboveSeventyRatio, ageNotSpecifiedUsersRatio];

	let labelsForMaritalStatusWiseDivision = 
	maritalStatusWiseUsers.map(x => x.status);
	let dataForMaritalStatusWiseDivision = maritalStatusWiseUsers.map(x => x.count);
	const usersData = [
		{ usersDetail: 'Total users', count: totalUsersCount, ratio: '-' },
		{ usersDetail: 'Active users', count: activeUsersCount, ratio: `${activeUsersRatio} %` },
		{
			usersDetail: 'Users below age of 35',
			count: usersBelowThirtyfiveCount,
			ratio: `${usersBelowThirtyfiveRatio} %`
		},
		{
			usersDetail: 'Users age between 36 to 70',
			count: usersBetweenThirtysixToSeventyCount,
			ratio: `${usersBetweenThirtysixToSeventyRatio} %`
		},
		{
			usersDetail: 'Users above age of 70',
			count: usersAboveSeventyCount,
			ratio: `${usersAboveSeventyRatio} %`
		},
		{
			usersDetail: 'Age not specified users',
			count: ageNotSpecifiedUsersCount,
			ratio: `${ageNotSpecifiedUsersRatio} %`
		},
		{ usersDetail: 'Male users', count: maleUsersCount, ratio: `${maleUsersRatio} %` },
		{ usersDetail: 'Female users', count: femaleUsersCount, ratio: `${femaleUsersRatio} %` },
		{ usersDetail: 'Intersex users', count: intersexUsersCount, ratio: `${intersexUsersRatio} %` },
		{
			usersDetail: 'Gender Not specified users',
			count: genderNotSpecifiedUsersCount,
			ratio: `${genderNotSpecifiedUsersRatio} %`
		}
	];

	const userId = $page.params.userId;
	const homeRoute = `/users/${userId}/home`;

	const breadCrumbs = [
		{
			name: 'Users',
			path: homeRoute
		}
	];

	const dispatch = createEventDispatcher();

	const handlelSelectYearForAge = (year) => {
		dispatch('selectAgeWiseUsersDividionYearly', {
			year: year
		});
	};

	const handlelSelectYearForGender = (year) => {
		dispatch('selectGenderWiseUsersDividionYearly', {
			year: year
		});
	};
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex justify-center flex-col lg:mx-14 md:mx-10 sm:mx-6 mx-4 mt-4 mb-14">
	<div class="flex flex-col gap-3">
		{#each usersData as data}
			<div
				class="flex flex-row lg:gap-16 md:gap-12 sm:gap-10 gap-6 w-full items-start justify-start"
			>
				<span class="w-80 text-primary-500">{data.usersDetail}</span>
				<span class="w-20 text-primary-500">{data.count}</span>
				<span class="w-20 text-primary-500">{data.ratio}</span>
			</div>
		{/each}
	</div>

	<div class="flex items-start mx-auto mt-10 w-full">
		<div class="w-1/2 flex flex-col items-start">
			<select name="year" id="" class="select w-2/3" on:change={handlelSelectYearForAge}>
				<option>All the years</option>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
			</select>
			<div class="w-2/3">
				<PieChart lables={labelsForGenderWiseDivision} data={genderWiseDistributionOfUsers}  title = 'Gender distribution of users'/>
			</div>	
		</div>

		<div class="w-1/2 flex flex-col items-center ">
			<select name="year" id="" class="select w-2/3 " on:change={handlelSelectYearForGender}>
				<option>All the years</option>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
			</select>
			<div class="mx-10 w-2/3 ">
				<PieChart lables={labelsForAgeWiseDivision} data={ageWiseDistributionOfUsers} title='Age distribution of users'/>
			</div>
		</div>
	</div>
	
	<div class="w-1/2 h-96 flex flex-col items-center mt-10 mb-10">
		<BarChart dataSource={dataForMaritalStatusWiseDivision} lables={labelsForMaritalStatusWiseDivision} />
		<h3 class="mt-3 text-primary-500">Marital status distribution of users</h3>
	</div>
</div>

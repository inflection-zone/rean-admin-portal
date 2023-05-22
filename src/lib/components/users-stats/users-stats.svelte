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
	export let countryWiseUsers;
	export let majorAilment;

	$: ageWiseUsers;
	$: genderWiseUsers;
	$: countryWiseUsers;

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

	let genderDistributionLabels = ['Male', 'Female', 'Intersex', 'Gender not specified'];
	let ageDistributionLabels = ['Below 35', '36-70', 'Above 70', 'Age not specified'];

	let genderDistributionData: number[] = [
		genderWiseUsers.MaleUsers.Ratio,
		genderWiseUsers.FemaleUsers.Ratio,
		genderWiseUsers.IntersexUsers.Ratio,
		genderWiseUsers.GenderNotSpecifiedUsers.Ratio
	];

	$: genderDistributionData = [
		genderWiseUsers.MaleUsers.Ratio,
		genderWiseUsers.FemaleUsers.Ratio,
		genderWiseUsers.IntersexUsers.Ratio,
		genderWiseUsers.GenderNotSpecifiedUsers.Ratio
	];

	let ageDistributionData = [
		usersBelowThirtyfiveRatio,
		usersBetweenThirtysixToSeventyRatio,
		usersAboveSeventyRatio,
		ageNotSpecifiedUsersRatio
	];
	$: ageDistributionData = [
		usersBelowThirtyfiveRatio,
		usersBetweenThirtysixToSeventyRatio,
		usersAboveSeventyRatio,
		ageNotSpecifiedUsersRatio
	];

	let maritalStatusDistributionLabels = maritalStatusWiseUsers.map((x) => x.status);
	let maritalStatusDistributionData = maritalStatusWiseUsers.map((x) => x.count);

	let cuntryDistributionData = countryWiseUsers.map((x) => x.Ratio);
	let cuntryDistributionLabels = countryWiseUsers.map((x) => x.Country);

	$: cuntryDistributionData;
	$: cuntryDistributionLabels;

	let majorAilmentDistributionData = majorAilment.map((x) => x.Count);
	let majorAilmentDistributionLabels = majorAilment.map((x) => x.MajorAilment);

	const usersData = [
		// { usersDetail: 'Total users', count: totalUsersCount, ratio: '100' },
		{ usersDetail: 'Active users', count: activeUsersCount, ratio: `${activeUsersRatio}` },
		{
			usersDetail: 'Users below age of 35',
			count: usersBelowThirtyfiveCount,
			ratio: `${usersBelowThirtyfiveRatio}`
		},
		{
			usersDetail: 'Users age between 36 to 70',
			count: usersBetweenThirtysixToSeventyCount,
			ratio: `${usersBetweenThirtysixToSeventyRatio} `
		},
		{
			usersDetail: 'Users above age of 70',
			count: usersAboveSeventyCount,
			ratio: `${usersAboveSeventyRatio}`
		},
		{
			usersDetail: 'Age not specified users',
			count: ageNotSpecifiedUsersCount,
			ratio: `${ageNotSpecifiedUsersRatio}`
		},
		{ usersDetail: 'Male users', count: maleUsersCount, ratio: `${maleUsersRatio}` },
		{ usersDetail: 'Female users', count: femaleUsersCount, ratio: `${femaleUsersRatio} ` },
		{ usersDetail: 'Intersex users', count: intersexUsersCount, ratio: `${intersexUsersRatio}` },
		{
			usersDetail: 'Gender not specified users',
			count: genderNotSpecifiedUsersCount,
			ratio: `${genderNotSpecifiedUsersRatio}`
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

	const handlelSelectYearForCountry = (year) => {
		dispatch('selectCountryDistributionYearly', {
			year: year
		});
	};
</script>

<!-- <BreadCrumbs crumbs={breadCrumbs} /> -->

<div class="flex justify-center flex-col lg:mx-14 md:mx-10 sm:mx-6 mx-4 mt-4 mb-20">
	<!-- <div class="flex flex-col gap-3"> -->
	<div
		class="flex flex-col overflow-x-auto justify-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 py-4 gap-4"
	>
	<div
				class="flex flex-row lg:gap-16 md:gap-12 sm:gap-10 gap-6 w-full items-start justify-start"
			>
				<span class="w-80 text-primary-500 font-semibold px-4">Users</span>
				<span class="w-20 text-primary-500 font-semibold px-4">Count</span>
				<div class="flex flex-col ">
					<span class="w-40 text-primary-500 mb-1 font-semibold px-4"> Percentage</span>
					<!-- <ProgressBar label="Progress Bar" value={data.ratio} max={100} /> -->
					<!-- <div class="h-2 w-full rounded-full bg-primary-200">
						<div class="h-2 rounded-full bg-primary-500" style="width:{data.ratio}%" />
					</div> -->
				</div>
			</div>
		{#each usersData as data}
			<div
				class="flex flex-row lg:gap-16 md:gap-12 sm:gap-10 gap-6 px-4 last:pb-4 w-full items-start justify-start"
			>
				<span class="w-80 text-primary-500">{data.usersDetail}</span>
				<span class="w-20 text-primary-500">{data.count}</span>
				<div class="flex flex-col ">
					<span class="w-40 text-primary-500 mb-1">{data.ratio} %</span>
					<div class="h-2 w-full rounded-full bg-primary-200">
						<div class="h-2 rounded-full bg-primary-500" style="width:{data.ratio}%" />
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-5">
		<div
			class="flex overflow-x-auto justify-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/3 h-auto"
		>
			<div class="">
				<PieChart labels={genderDistributionLabels} data={genderDistributionData} title="Gender" />
				<!-- <select name="year" id="" class="select w-2/3" on:change={handlelSelectYearForGender}>
					<option>All the years</option>
					<option value="2021">2021</option>
					<option value="2022">2022</option>
					<option value="2023">2023</option>
				</select> -->
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/3"
		>
			<div class=" ">
				<PieChart labels={ageDistributionLabels} data={ageDistributionData} title="Age" />
				<!-- <select name="year" id="" class="select w-2/3" on:change={handlelSelectYearForAge}>
					<option>All the years</option>
					<option value="2021">2021</option>
					<option value="2022">2022</option>
					<option value="2023">2023</option>
				</select> -->
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center rounded-lg bg-tertiary-200 sm:px-4 shadow-xl pb-4 w-1/3"
		>
			<div class=" ">
				<PieChart labels={cuntryDistributionLabels} data={cuntryDistributionData} title="Country" />
				<!-- <select name="year" id="" class="select w-2/3 " on:change={handlelSelectYearForCountry}>
				<option>All the years</option>
				<option value="2021">2021</option>
				<option value="2022">2022</option>
				<option value="2023">2023</option>
			</select>
			 -->
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-5">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<BarChart
					dataSource={maritalStatusDistributionData}
					labels={maritalStatusDistributionLabels}
					title="Marital Status"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full">
				<BarChart
					dataSource={majorAilmentDistributionData}
					labels={majorAilmentDistributionLabels}
					title="Major Ailments"
				/>
			</div>
		</div>
	</div>
</div>

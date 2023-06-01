<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import PieChart from './charts/pie-chart.svelte';
	import BarChart from './charts/bar-chart.svelte';
	import HorizontalBarChart from './charts/horizontal-bar-chart.svelte';
	import HealthPillarChart from './charts/health-pillar-chart.svelte';
	import BiometricsChart from './charts/biometrics-chart.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let totalUsers;
	export let activeUsers;
	export let genderWiseUsers;
	export let ageWiseUsers;
	export let maritalStatusWiseUsers;
	export let countryWiseUsers;
	export let majorAilment;
	export let obesityDistribution;
	export let addictionDistribution;
	export let healthPillarDistribution;
	export let healthPillarDistributionMonthly;
	export let roleDistribution;
	export let biometricsDistribution;
	export let biometricsDistributionMonthly;

	$: ageWiseUsers;
	$: genderWiseUsers;
	$: countryWiseUsers;

	let totalUsersCount = totalUsers.count;
	let activeUsersCount = activeUsers.Count;
	let activeUsersRatio = activeUsers.Ratio;
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

	const usersData = [
		{
			usersDetail: 'Active users',
			count: activeUsersCount,
			ratio: `${Math.ceil(activeUsersRatio)}`
		},
		{
			usersDetail: 'Users below age of 35',
			count: usersBelowThirtyfiveCount,
			ratio: `${Math.ceil(usersBelowThirtyfiveRatio)}`
		},
		{
			usersDetail: 'Users age between 36 to 70',
			count: usersBetweenThirtysixToSeventyCount,
			ratio: `${Math.ceil(usersBetweenThirtysixToSeventyRatio)} `
		},
		{
			usersDetail: 'Users above age of 70',
			count: usersAboveSeventyCount,
			ratio: `${Math.ceil(usersAboveSeventyRatio)}`
		},
		{
			usersDetail: 'Age not specified users',
			count: ageNotSpecifiedUsersCount,
			ratio: `${Math.ceil(ageNotSpecifiedUsersRatio)}`
		},
		{ usersDetail: 'Male users', count: maleUsersCount, ratio: `${Math.ceil(maleUsersRatio)}` },
		{
			usersDetail: 'Female users',
			count: femaleUsersCount,
			ratio: `${Math.ceil(femaleUsersRatio)}`
		},
		{
			usersDetail: 'Intersex users',
			count: intersexUsersCount,
			ratio: `${Math.ceil(intersexUsersRatio)}`
		},
		{
			usersDetail: 'Gender not specified users',
			count: genderNotSpecifiedUsersCount,
			ratio: `${Math.ceil(genderNotSpecifiedUsersRatio)}`
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

	let obesityDistributionData = obesityDistribution.map((x) => x.Count);
	let obesityDistributionLabels = obesityDistribution.map((x) => x.Status);

	let addictionDistributionData = addictionDistribution.map((x) => x.Count);
	let addictionDistributionLabels = addictionDistribution.map((x) => x.Status);

	let healthPillarDistributionData = healthPillarDistribution.map((x) => x.Count);
	let healthPillarDistributionLabels = healthPillarDistribution.map((x) => x.Status);

	let roleDistributionData = roleDistribution.map((x) => x.Ratio);
	let roleDistributionLabels = roleDistribution.map((x) => x.Role);

	let biometricsDistributionData = biometricsDistribution.map((x) => x.Count);
	let biometricsDistributionLabels = biometricsDistribution.map((x) => x.Biometrics);

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
	<!-- <div
		class="flex flex-col overflow-x-auto justify-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 py-2 gap-4"
	>
		<div class="flex flex-row lg:gap-16 md:gap-12 sm:gap-10 gap-6 w-full items-start justify-start">
			<span class="w-80 text-primary-500 font-semibold px-4">Users</span>
			<span class="w-20 text-primary-500 font-semibold px-4">Count</span>
			<div class="flex flex-col ">
				<span class="w-40 text-primary-500 mb-1 font-semibold px-4"> Percentage</span>
			</div>
		</div>

		<div class="flex flex-row lg:gap-16 md:gap-12 sm:gap-10 gap-6 w-full items-start justify-start">
			<span class="w-80 text-primary-500 px-4">Total Users</span>
			<span class="w-20 text-primary-500 px-4">{totalUsersCount}</span>
		</div>
		{#each usersData as data}
			<div
				class="flex flex-row lg:gap-16 md:gap-12 sm:gap-10 gap-6 px-4 last:pb-4 w-full items-start justify-start"
			>
				<span class="w-80 text-primary-500 items-center">{data.usersDetail}</span>
				<span class="w-20 text-primary-500 items-center">{data.count}</span>
				<div class="flex flex-col items-center">
					<div class="h-2 w-full rounded-full bg-primary-200 mr-2">
						<div class="h-2 rounded-full bg-primary-500" style="width:{data.ratio}%" />
					</div>
					<div class="flex">
						<span class="text-primary-500">{data.ratio}</span>
						<span class="text-primary-500 text-xs mt-1">%</span>
					</div>
				</div>
			</div>
		{/each}
	</div> -->
	<div
		class="flex flex-col overflow-x-auto justify-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 py-2 gap-3"
	>
		<div class="px-4 sm:px-6 lg:px-8">
			<div class="flow-root">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table class="min-w-full">
							<thead>
								<tr>
									<th
										scope="col"
										class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 sm:pl-3"
										>Users</th
									>
									<th
										scope="col"
										class="px-3 py-3 text-left text-lg font-semibold text-primary-500">Count</th
									>
									<th
										scope="col"
										class="px-3 py-3 text-left text-lg font-semibold text-primary-500"
										>Percentage</th
									>
								</tr>
							</thead>
							<tbody class="">
								<tr class="hover:bg-tertiary-600">
									<td
										style="width:10%;"
										class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 sm:pl-3"
										>Total Users</td
									>
									<td style="width:10%;" class="whitespace-nowrap px-3 py-2 text-sm  text-primary-500"
										>{totalUsersCount}</td
									>
									<td style="width:15%;" class="whitespace-nowrap px-3 py-2 text-sm  text-primary-500"
										>-
									</td>
								</tr>
								{#each usersData as data}
									<tr class="hover:bg-tertiary-600">
										<td
											style="width:10%;"
											class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 text-sm  sm:pl-3"
											>{data.usersDetail}</td
										>
										<td style="width:10%;" class="whitespace-nowrap text-sm px-3 py-2 text-primary-500"
											>{data.count}</td
										>
										<td style="width:15%;" class="whitespace-nowrap px-3 py-2 text-sm text-primary-500">
											<div class="flex items-center">
												<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
													<div
														class="h-2 rounded-full bg-primary-500"
														style="width:{data.ratio}%"
													/>
												</div>
												<span class="text-primary-500 ">{data.ratio}</span>
												<span class="text-primary-500 text-xs">%</span>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
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

		<!-- <div
			class="flex overflow-x-auto justify-center rounded-lg bg-tertiary-200 sm:px-4 shadow-xl pb-4 w-1/3"
		>
			<div class=" ">
				<PieChart labels={roleDistributionLabels} data={roleDistributionData} title="Role" />
			</div>
		</div> -->
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

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<BarChart
					dataSource={obesityDistributionData}
					labels={obesityDistributionLabels}
					title="Obesity"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full">
				<BarChart
					dataSource={addictionDistributionData}
					labels={addictionDistributionLabels}
					title="Addiction"
				/>
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<HorizontalBarChart
					dataSource={healthPillarDistributionData}
					labels={healthPillarDistributionLabels}
					title="Health Pillars"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full">
				<HealthPillarChart
					{healthPillarDistributionMonthly}
				/>
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<HorizontalBarChart
					dataSource={biometricsDistributionData}
					labels={biometricsDistributionLabels}
					title="Biometrics"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg bg-tertiary-200 shadow-xl sm:px-4 pb-4 w-1/2"
		>
			<div class="h-96 w-full">
				<BiometricsChart
					{biometricsDistributionMonthly}
				/>
			</div>
		
		</div>
	</div>
</div>

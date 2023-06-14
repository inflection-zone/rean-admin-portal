<script lang="ts">
	import type { PageServerData } from './$types';
	import UsersStats from '$lib/components/users-stats/users-stats.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;

	let totalUsers = data.totalUsers;
	let activeUsers = data.activeUsers;
	let maritalStatusWiseUsers = data.maritalStatusWiseUsers;
	let genderWiseUsers;
	let ageWiseUsers;
	let countryWiseUsers;
	let majorAilment = data.majorAilment;
	let obesityDistribution = data.obesityDistribution;
	let addictionDistribution = data.addictionDistribution;
	let healthPillarDistribution = data.healthPillarDistribution;
	let healthPillarDistributionMonthly = data.healthPillarDistributionMonthly;
	let roleDistribution = data.roleDistribution;
	let biometricsDistribution = data.biometricsDistribution;
	let biometricsDistributionMonthly = data.biometricsDistributionMonthly;
	let usersCount = data.overallUsersData;
	let deviceDetailWiseUsers = data.deviceDetailWiseUsers;

	$: genderWiseUsers;
	$: ageWiseUsers;
	genderWiseUsers = data.genderWiseUsers;
	ageWiseUsers = data.ageWiseUsers;
	countryWiseUsers = data.countryWiseUsers;

	$: countryWiseUsers;
	let selectedYear;

	const selectAgeWiseUsersDividionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchAgeWiseDivisionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
	};

	async function searchAgeWiseDivisionOfUsers(model) {
		let url = `/api/server/users-stats/search-users-by-age?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		ageWiseUsers = response;
		console.log('ageWiseUsers------------', ageWiseUsers);
	}

	const selectGenderWiseUsersDividionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchGenderWiseDivisionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
		// window.location.href = `/users/${userId}/home`;
	};

	async function searchGenderWiseDivisionOfUsers(model) {
		let url = `/api/server/users-stats/search-users-by-gender?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		genderWiseUsers = response;
		console.log('genderWiseUsers------------', genderWiseUsers);
	}

	const selectCounrtyDistributionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchCounrtyDistributionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
		// window.location.href = `/users/${userId}/home`;
	};

	async function searchCounrtyDistributionOfUsers(model) {
		let url = `/api/server/users-stats/search-country-users-yearly?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		countryWiseUsers = response;
		console.log('countryWiseUsers------------', countryWiseUsers);
	}
</script>

<UsersStats
	{totalUsers}
	{activeUsers}
	{ageWiseUsers}
	{genderWiseUsers}
	{maritalStatusWiseUsers}
	{countryWiseUsers}
	{majorAilment}
	{obesityDistribution}
	{addictionDistribution}
	{healthPillarDistribution}
	{healthPillarDistributionMonthly}
	{roleDistribution}
	{biometricsDistribution}
	{biometricsDistributionMonthly}
	{usersCount}
	{deviceDetailWiseUsers}
	on:selectAgeWiseUsersDividionYearly={async (e) => {
		await selectAgeWiseUsersDividionYearly(e.detail.year);
	}}
	on:selectGenderWiseUsersDividionYearly={async (e) => {
		await selectGenderWiseUsersDividionYearly(e.detail.year);
	}}
	on:selectCountryDistributionYearly={async (e) => {
		await selectCounrtyDistributionYearly(e.detail.year);
	}}
/>

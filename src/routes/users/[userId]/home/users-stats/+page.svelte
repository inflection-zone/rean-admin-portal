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
	
	$: genderWiseUsers;
	$: ageWiseUsers;
	genderWiseUsers = data.genderWiseUsers;
	ageWiseUsers = data.ageWiseUsers;

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
			headers: {
				'content-type': 'application/json'
			}
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
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();
		genderWiseUsers = response;
		console.log('genderWiseUsers------------', genderWiseUsers);
	}
</script>

<UsersStats
	{totalUsers}
	{activeUsers}
	{ageWiseUsers}
	{genderWiseUsers}
	{maritalStatusWiseUsers}
	on:selectAgeWiseUsersDividionYearly={async (e) => {
		await selectAgeWiseUsersDividionYearly(e.detail.year);
	}}
	on:selectGenderWiseUsersDividionYearly={async (e) => {
		await selectGenderWiseUsersDividionYearly(e.detail.year);
	}}
/>

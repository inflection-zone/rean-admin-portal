<script lang="ts">
	import type { PageServerData } from './$types';
	import UsersStats from '$lib/components/users-stats/users-stats.svelte';
	import { ageWiseUsersData } from '$lib/store/general.store';
	import { page } from '$app/stores';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
  const userId = $page.params.userId;
	let totalUsers = data.totalUsers;
	let activeUsers = data.activeUsers;
	let genderWiseUsers = data.genderWiseUsers;
	let ageWiseUsers = data.ageWiseUsers;
  // let ageWiseUsers ;
  $:ageWiseUsers
  $:genderWiseUsers

  ageWiseUsersData.set(ageWiseUsers);
  console.log("Initial age Wise Users....",$ageWiseUsersData)
  console.log("Initial age Wise Users",genderWiseUsers)
	let selectedYear

  // $: {
  //   agewiseUsersChanged(ageWiseUsers);
  //   }

  const selectAgeWiseUsersDividionYearly = async (e) => {
    selectedYear = e.currentTarget.value;
    console.log("selected year", selectedYear)
    await searchAgeWiseDivisionOfUsers ({
      sessionId: data.sessionId,
      year:selectedYear
    });
  };

  async function searchAgeWiseDivisionOfUsers(model) {
    let url = `/api/server/users-stats/search-users-by-age?year=${model.year}`;
    console.log(url)
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    });
    const response = await res.json();
    ageWiseUsers = response;
    ageWiseUsersData.set(ageWiseUsers);
    // agewiseUsersChanged(ageWiseUsers);
    console.log("ageWiseUsers------------",ageWiseUsers)
  }
  console.log("Store data",$ageWiseUsersData)
  // function agewiseUsersChanged(ageWiseUsers) {
  //   ageWiseUsers;
  //   console.log("ageWiseUser....", ageWiseUsers)
  //   }

    // console.log("Age wise users after change the year..",ageWiseUsers);

    const selectGenderWiseUsersDividionYearly = async (e) => {
    selectedYear = e.currentTarget.value;
    console.log("selected year", selectedYear)
    await searchGenderWiseDivisionOfUsers ({
      sessionId: data.sessionId,
      year:selectedYear
    });
    // window.location.href = `/users/${userId}/home`;
  };

  async function searchGenderWiseDivisionOfUsers(model) {
    let url = `/api/server/users-stats/search-users-by-gender?year=${model.year}`;
    console.log(url)
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    });
    const response = await res.json();
    genderWiseUsers = response;
    console.log("genderWiseUsers------------",genderWiseUsers)
  }
</script>

<UsersStats {totalUsers} {activeUsers} ageWiseUsers={$ageWiseUsersData} {genderWiseUsers} on:selectAgeWiseUsersDividionYearly = {async (e) => {
  await selectAgeWiseUsersDividionYearly(e.detail.year); 
 }}
 on:selectGenderWiseUsersDividionYearly = {async (e) => {
  await selectGenderWiseUsersDividionYearly(e.detail.year); 
 }}/>

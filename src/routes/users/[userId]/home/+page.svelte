<script lang="ts">
  import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
  import GenderWiseDivision from '$lib/components/charts/gender-wise-division.svelte';
  import AgeWiseDivision from '$lib/components/charts/age-wise-division.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
  let totalUsers = data.totalUsers;
  let activeUsers = data.activeUsers;
  let genderWiseUsers = data.genderWiseUsers;
  let ageWiseUsers = data.ageWiseUsers;
  let totalUsersCount = totalUsers.Count; 
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

  const usersData = [
  { usersDetail: 'Total users', count: totalUsersCount, ratio: '-'},
	{ usersDetail: 'Active users', count: activeUsersCount, ratio: `${activeUsersRatio} %`},
  { usersDetail: 'Users below age of 35', count: usersBelowThirtyfiveCount, ratio: `${usersBelowThirtyfiveRatio} %`},
  { usersDetail: 'Users age between 36 to 70', count: usersBetweenThirtysixToSeventyCount, ratio: `${usersBetweenThirtysixToSeventyRatio} %`},
  { usersDetail: 'Users above age of 70', count: usersAboveSeventyCount, ratio: `${usersAboveSeventyRatio} %`},
  { usersDetail: 'Age not specified users', count: ageNotSpecifiedUsersCount, ratio: `${ageNotSpecifiedUsersRatio} %`},
  { usersDetail: 'Male users', count: maleUsersCount, ratio: `${maleUsersRatio} %`},
  { usersDetail: 'Female users', count: femaleUsersCount, ratio: `${femaleUsersRatio} %`},
  { usersDetail: 'Intersex users', count: intersexUsersCount, ratio: `${intersexUsersRatio} %`},
  { usersDetail: 'Gender Not specified users', count: genderNotSpecifiedUsersCount, ratio: `${genderNotSpecifiedUsersRatio} %`},
];

const tableSimple: TableSource = {
	head: ['Users Details', 'Count', 'Ratio'],
	body: tableMapperValues(usersData, ['usersDetail', 'count', 'ratio']),

};

	const userId = $page.params.userId;
	const homeRoute = `/users/${userId}/home`;

	const breadCrumbs = [
		{
			name: 'Users',
      path: homeRoute
		}
	];


</script>

<BreadCrumbs crumbs={breadCrumbs} />
<div class="flex justify-center flex-col mx-10 mt-4 mb-10 overflow-y-auto">
<Table source={tableSimple} />

<div class="flex items-start mx-auto gap-10 mt-10 mb-12 w-full">
  <div class="w-1/2 ">
    <div class = "mx-10 w-1/2">
      <GenderWiseDivision genderWiseUsers = {genderWiseUsers}/>
    </div>
  
  </div>
  <div class="w-1/2">
    <div class = "mx-10 w-1/2">
    <AgeWiseDivision ageWiseUsers = {ageWiseUsers}/>
  </div>
  </div>
</div>
</div>
<!-- <div class="W-60 h-40"> -->

  <!-- <GenderWiseDivision genderWiseUsers = {genderWiseUsers}/> -->
  <!-- <AgeWiseDivision ageWiseUsers = {ageWiseUsers}/> -->
<!-- </div> -->

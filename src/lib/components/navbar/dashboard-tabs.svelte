<script lang="ts">
	import { dashboardMenu, type TabDefinition } from '$lib/components/navbar/navigation.tabs';
	import { page } from '$app/stores';
	import { afterUpdate, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let userId = undefined;
	const dashboardTabs: TabDefinition[] = dashboardMenu(userId);
	
	let activeTab = '';
	onMount(() => {
		activeTab = $page.url.pathname;
	});

	afterUpdate(() => {
		activeTab = $page.url.pathname;
	});

  let homeLink;
	let usersLink;
	// let rhgLink;
	// let botLink;
  
	onMount(() => {
		homeLink = `/users/${userId}/home`;
    usersLink = `/users/${userId}/home/users-stats`;
		// rhgLink = `/users/${userId}/`;
		// botLink = `/users/${userId}/`;
	});

	const gotoHome = async () => {
		await goto(homeLink);
	};

  const gotoUsers = async () => {
		await goto(usersLink);
	};

  // const gotoRhg = async () => {
	// 	await goto(rhgLink);
	// };

  // const gotoBot = async () => {
	// 	await goto(botLink);
	// };
</script>

<!-- <div> -->
	<div class=" flex flex-row justify-start mt-2 space-x-6 ml-10">
		<!-- <ul class="space-x-6">
			{#each dashboardTabs as t}
				<a
					href={t.path}
					class="hover:bg-[#6c3dc2] hover:text-surface-500 px-3 py-2 hover:no-underline rounded-md text-lg font-medium {activeTab ==
					t.path
						? 'active: bg-primary-500 text-white'
						: 'text-white bg-secondary-500'}">{t.name}</a
				> 
			 {/each}
      </ul> -->

      <button class="w-auto h-16 hover:bg-[#6c3dc2] hover:text-white text-center px-4 py-3 my-3 ml-2 hover:no-underline rounded-md text-lg font-medium {activeTab ==
        homeLink
          ? 'active: bg-primary-500 text-white'
          : 'text-primary-500'}" on:click|capture={gotoHome}>
				Overall
			</button>

      <button class="w-auto h-16 hover:bg-[#6c3dc2] hover:text-white text-center px-4 py-3 my-3 ml-2 hover:no-underline rounded-md text-lg font-medium {activeTab ==
        usersLink
          ? 'active: bg-primary-500 text-white'
          : 'text-primary-500'}" on:click|capture={gotoUsers}>
			  Distribution
			</button>
      <!-- <button class="w-auto h-16 hover:bg-[#6c3dc2] hover:text-white text-center px-4 py-3 my-3 ml-2 hover:no-underline rounded-md text-lg font-medium {activeTab ==
        rhgLink
          ? 'active: bg-primary-500 text-white'
          : 'text-primary-500'}" on:click|capture={gotoRhg}>
				RHG
			</button> -->
      <!-- <button class="w-auto h-16 hover:bg-[#6c3dc2] hover:text-white text-center px-4 py-3 my-3 ml-2 hover:no-underline rounded-md text-lg font-medium {activeTab ==
        botLink
          ? 'active: bg-primary-500 text-white'
          : 'text-primary-500'}" on:click|capture={gotoBot}>
				Bot
			</button> -->

	</div>
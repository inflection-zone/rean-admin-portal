<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faCircleUser, faSearch } from '@fortawesome/free-solid-svg-icons';
	import { navbarMenu, sidebarMenu, type TabDefinition } from './navigation.tabs';
	import SettingMenu from './setting.menus.svelte';
	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';
	import Sidebar from './sidebar.svelte';
	export let userId = undefined;
	const navbarTabs: TabDefinition[] = navbarMenu(userId);
	const sidebarTabs: TabDefinition[] = sidebarMenu(userId);

	let activeTab = '';
	onMount(() => {
		activeTab = $page.url.pathname;
	});

	afterUpdate(() => {
		activeTab = $page.url.pathname;
	});

	function drawerLeftOpen(): void {
		const settings: DrawerSettings = {
			id: 'leftSidebar',
			position: 'left',
			width: '800px',
			bgDrawer: 'bg-primary-50 text-on-primary-token',
			bgBackdrop: 'bg-primary-500/50'
		};
		drawerStore.open(settings);
	}

	function drawerRightOpen(): void {
		const settings: DrawerSettings = {
			id: 'rightSidebar',
			position: 'right',
			width: '900px',
			bgDrawer: 'bg-primary-50 text-on-primary-token',
			duration: 300,
			bgBackdrop: 'bg-primary-500/50'
		};
		drawerStore.open(settings);
	}

	function drawerRightClose(): void {
		drawerStore.close();
	}
</script>

<AppShell class="w-full">
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			background="bg-secondary-500"
			class="text-white"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<div class="flex justify-start items-center">
					<img class="block h-8 w-8 ml-2" src="/rean-logo-white.png" alt="REAN" />
					<!-- <button class="hover:bg-secondary-500 mr-4 hover:rounded-md" on:click={drawerLeftOpen}>
						<Fa icon={faBars} size="lg"/> -->
					<!-- </button> -->
					<div class="relative ml-10 w-96">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<Fa icon={faSearch} class="text-primary-300" size="md" />
						</div>
						<input
							type="text"
							class="border border-primary-300 text-md text-primary-500 rounded-lg focus:ring-primary-300 focus:border-primary-300 placeholder:text-primary-300 block w-full pl-10 p-2.5 "
							placeholder="Search"
						/>
					</div>
					<div class="flex-1 justify-start hidden lg:block">
						<!-- <ul class="space-x-4">
							{#each navbarTabs as t}
								<a
									href={t.path}
									class="hover:bg-[#6c3dc2] hover:text-white px-3 py-2 hover:no-underline rounded-md text-md font-medium {activeTab ==
									t.path
										? 'active: bg-primary-500 text-white'
										: 'text-white'}">{t.name}</a
								>
							{/each}
						</ul> -->
					</div>
				</div>
			</svelte:fragment>
			<!-- <div>
				<img class="block h-8 w-8 " src="/rean-logo-white.png" alt="REAN" />
			</div> -->
			<svelte:fragment slot="trail">
				<button class="hover:bg-secondary-500 p-2 rounded-md" on:click={drawerRightOpen}>
					<Fa icon={faCircleUser} size="lg" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar {userId} />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<p class="bg-secondary-500  text-center p-2">
			<a href="https://reanfoundation.org" class="!text-white">&#xa9; 2022 REAN Foundation</a>
		</p>
	</svelte:fragment>
</AppShell>

<Drawer>
	{#if $drawerStore.id === 'rightSidebar'}
		<SettingMenu on:click={drawerRightClose} on:logout />
	{:else if $drawerStore.id === 'leftSidebar'}
		<div class="grid justify-center w-60 space-y-4 mt-5">
			{#each sidebarTabs as t}
				<a
					href={t.path}
					class="hover:bg-surface-700 hover:text-white p-2 hover:no-underline text-start no-underline rounded-md text-md font-medium
					 {activeTab == t.path ? 'active: bg-surface-800 ' : 'text-white'}">{t.name}</a
				>
			{/each}
			{#each navbarTabs as t}
				<a
					href={t.path}
					class="hover:bg-surface-700 lg:hidden sm:first:hidden hover:text-white p-2 hover:no-underline text-start no-underline rounded-md text-md font-medium {activeTab ==
					t.path
						? 'active: bg-surface-800 '
						: 'text-white'}">{t.name}</a
				>
			{/each}
		</div>
	{:else}
		<p>(fallback contents)</p>
	{/if}
</Drawer>

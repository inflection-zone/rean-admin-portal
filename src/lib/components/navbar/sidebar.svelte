<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	export let userId = undefined;
	export let showSidebar = false;

	const navData = [
		{
			title: 'Dashboard',
			icon: 'material-symbols:dashboard-outline-rounded',
			childNav: [
				{
					icon: '/rean-logo-white.png',
					title: 'RHG App',
					link: `/users/${userId}/home`
				},
				{
					icon: '/rean-logo-white.png',
					title: 'RHG Bot',
					link: `/users/${userId}/bot-stats`
				}
			]
		},
		{
			title: 'Clinical',
			icon: 'material-symbols:medical-services-outline-rounded',
			childNav: [
				{
					icon: 'material-symbols:assignment-outline-rounded',
					title: 'Assessments',
					link: `/users/${userId}/assessment-templates`
				},
				{
					icon: 'material-symbols:lab-research-outline-rounded',
					title: 'Lab-Records',
					link: `/users/${userId}/lab-record-types`
				},
				{
					icon: 'material-symbols:symptoms-outline',
					title: 'Symptoms',
					link: `/users/${userId}/symptoms`
				},
				{
					icon: 'material-symbols:pill-outline',
					title: 'Drug',
					link: `/users/${userId}/drugs`
				}
			]
		},
		{
			title: 'Educational',
			icon: 'material-symbols:school-outline-rounded',
			childNav: [
				{
					icon: 'material-symbols:abc-rounded',
					title: 'Courses',
					link: `/users/${userId}/courses`
				},
				{
					icon: 'material-symbols:local-library-outline-rounded',
					title: 'Learning Journey',
					link: `/users/${userId}/learning-journeys`
				},
				{
					icon: 'material-symbols:assignment-add-outline-rounded',
					title: 'Knowledge Nuggets',
					link: `/users/${userId}/knowledge-nuggets`
				}
			]
		},
		{
			title: 'Types',
			icon: 'material-symbols:account-tree-outline-rounded',
			childNav: [
				{
					icon: 'material-symbols:person-search-outline-rounded',
					title: 'Person Role',
					link: `/users/${userId}/person-role-types`
				},
				{
					icon: 'material-symbols:priority-outline',
					title: 'Priorities',
					link: `/users/${userId}/priorities`
				},
				{
					icon: 'material-symbols:radar',
					title: 'Goals',
					link: `/users/${userId}/goals`
				}
			]
		},
		{
			title: 'Miscellaneous',
			icon: 'material-symbols:home-max-dots-outline',
			childNav: [
				{
					icon: 'material-symbols:frame-person-outline-rounded',
					title: 'Clients',
					link: `/users/${userId}/api-clients`
				},
				{
					icon: 'material-symbols:corporate-fare-rounded',
					title: 'Organizations',
					link: `/users/${userId}/organizations`
				},
				{
					icon: 'material-symbols:notifications-outline-rounded',
					title: 'Notifications',
					link: `/users/${userId}/notifications`
				},
				{
					icon: 'material-symbols:newsmode-outline-rounded',
					title: 'News Feed',
					link: `/users/${userId}/newsfeeds`
				},
				{
					icon: 'material-symbols:release-alert-outline-rounded',
					title: 'Notices',
					link: `/users/${userId}/notices`
				}
			]
		}
	];

	$: if ($navigating) showSidebar = false;
</script>

<div
	class="w-72 bg-secondary-50 dark:bg-surface-900 border-r border-r-surface-200 dark:border-r-surface-700 h-full pt-4 
	{showSidebar ? 'max-md:fixed z-10' : 'hidden'} md:block transition-all"
>
	<Accordion width="w-[280px]" autocollapse rounded="rounded-none">
		{#each navData as navParent, idx}
			<AccordionItem open={idx === 0}>
				<svelte:fragment slot="lead">
					<Icon icon={navParent.icon} class="text-2xl" />
				</svelte:fragment>
				<svelte:fragment slot="summary">{navParent.title}</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav space-y-1">
						{#each navParent.childNav as navItem}
							<a
								href={navItem.link}
								class:!variant-soft-secondary={$page.url.pathname === navItem.link}
							>
								{#if navItem.icon.endsWith('.png')}
									<img src={navItem.icon} alt="" class="invert dark:filter-none w-6 h-6" />
								{:else}
									<Icon
										icon={$page.url.pathname === navItem.link
											? navItem.icon.replace('-outline', '')
											: navItem.icon}
										class="text-2xl"
									/>
								{/if}
								<span>{navItem.title}</span>
							</a>
						{/each}
					</nav>
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</div>

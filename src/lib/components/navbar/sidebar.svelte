<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Icon from '../icon.svelte';

	export let userId = undefined;
	export let showSidebar = false; 

	const navData = [
		{
			title: 'Dashboard',
			icon: '/images/dashboard/dashboard.svg#icon',
			childNav: [
				{
					icon: '/images/dashboard/rean-logo.svg#icon',
					title: 'RHG App',
					link: `/users/${userId}/home`
				},
				// {
				// 	icon: '/rean-logo-white.png',
				// 	title: 'RHG Bot',
				// 	link: `/users/${userId}/bot-stats`
				// }
			]
		},
		{
			title: 'Clinical',
			icon: '/images/clinical/clinical.svg#icon',
			childNav: [
				{
					icon: '/images/clinical/assessment.svg#icon',
					title: 'Assessments',
					link: `/users/${userId}/assessment-templates`
				},
				{
					icon: '/images/clinical/lab-record.svg#icon',
					title: 'Lab-Records',
					link: `/users/${userId}/lab-record-types`
				},
				{
					icon: '/images/clinical/symptom.svg#icon',
					title: 'Symptoms',
					link: `/users/${userId}/symptoms`
				},
				{
					icon: '/images/clinical/drug.svg#icon',
					title: 'Drug',
					link: `/users/${userId}/drugs`
				},
				{
					icon: '/images/clinical/careplan/careplan.svg#icon',
					title: 'Careplan',
					children: [
						{
							icon: '/images/clinical/careplan/dashboard.svg#icon',
							title: 'Dashboard',
							link: `/users/${userId}/careplan`
						},
						{
							icon: '/images/clinical/careplan/asset.svg#icon',
							title: 'Assets',
							link: `/users/${userId}/careplan/assets`
						},
						{
							icon: '/images/clinical/careplan/careplan-menu.svg#icon',
							title: 'Careplans',
							link: `/users/${userId}/careplan/careplans`
						},
						{
							icon: '/images/clinical/careplan/enrollment.svg#icon',
							title: 'Enrollments',
							link: `/users/${userId}/careplan/enrollments`
						}
					]
				},
			]
		},
		{
			title: 'Educational',
			icon: '/images/educational/educational.svg#icon',
			childNav: [
				{
					icon: '/images/educational/course.svg#icon',
					title: 'Courses',
					link: `/users/${userId}/courses`
				},
				{
					icon: '/images/educational/learning-journey.svg#icon',
					title: 'Learning Journey',
					link: `/users/${userId}/learning-journeys`
				},
				{
					icon: '/images/educational/knowledge-nuggets.svg#icon',
					title: 'Knowledge Nuggets',
					link: `/users/${userId}/knowledge-nuggets`
				}
			]
		},
		{
			title: 'Types',
			icon: '/images/types/types.svg#icon',
			childNav: [
				{
					icon: '/images/types/person-role.svg#icon',
					title: 'Person Role',
					link: `/users/${userId}/person-role-types`
				},
				{
					icon: '/images/types/priorities.svg#icon',
					title: 'Priorities',
					link: `/users/${userId}/priorities`
				},
				{
					icon: '/images/types/goal.svg#icon',
					title: 'Goals',
					link: `/users/${userId}/goals`
				}
			]
		},
		{
			title: 'Miscellaneous',
			icon: '/images/miscellanous/miscellanous.svg#icon',
			childNav: [
				{
					icon: '/images/miscellanous/client.svg#icon',
					title: 'Clients',
					link: `/users/${userId}/api-clients`
				},
				{
					icon: '/images/miscellanous/organization.svg#icon',
					title: 'Organizations',
					link: `/users/${userId}/organizations`
				},
				{
					icon: '/images/miscellanous/notification.svg#icon',
					title: 'Notifications',
					link: `/users/${userId}/notifications`
				},
				{
					icon: '/images/miscellanous/newsfeed.svg#icon',
					title: 'News Feed',
					link: `/users/${userId}/newsfeeds`
				},
				{
					icon: '/images/miscellanous/notice.svg#icon',
					title: 'Notices',
					link: `/users/${userId}/notices`
				},
				{
					icon: '/images/miscellanous/custom-queries.svg#icon',
					title: 'Custom Queries',
					link: `/users/${userId}/custom-queries`
				},
				{
					icon: '/images/miscellanous/tenant.svg#icon',
					title: 'Tenants',
					link: `/users/${userId}/tenants`
				},
				{
					icon: '/images/miscellanous/cohort.svg#icon',
					title: 'Cohorts',
					link: `/users/${userId}/cohorts`
				},
			]
		},
		{
			title: 'Gamification',
			icon: '/images/gamification/gamification.svg#icon',
			childNav: [
				{
					icon: '/images/gamification/event-type.svg#icon',
					title: 'Event Types',
					link: `/users/${userId}/gamification/event-types`
				},
				{
					icon: '/images/gamification/badge-categories.svg#icon',
					title: 'Badge Categories',
					link: `/users/${userId}/gamification/badge-categories`
				},
				{
					icon: '/images/gamification/badge.svg#icon',
					title: 'Badges',
					link: `/users/${userId}/gamification/badges`
				},
				{
					icon: '/images/gamification/schemas.svg#icon',
					title: 'Schemas',
					link: `/users/${userId}/gamification/schemas`
				},
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
			<!-- svelte-ignore missing-declaration -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<AccordionItem open={idx === 0}>
				<svelte:fragment slot="lead">
					<Icon
					cls="stroke-slate-800 stroke-2 fill-none h-10"
					h="100%" w="100%" iconPath={navParent.icon}/>
				</svelte:fragment>
				<svelte:fragment slot="summary">{navParent.title}</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav space-y-1">
						{#each navParent.childNav as navItem}
							<!-- if no navItem.link but navItem.child -->
							{#if navItem.link}
								<a 
									href={navItem.link}
									class:!variant-soft-secondary={$page.url.pathname === navItem.link}
								>
									{#if navItem.icon.endsWith('.svg#icon')}										
										<Icon
											cls={`stroke-2 fill-none h-10 ${$page.url.pathname === navItem.link ? 'stroke-primary-600' : 'stroke-slate-500' }`}
											h="100%" w="100%" iconPath={navItem.icon}/>									
									<!-- {:else} -->
										<!-- <Icon
											icon={$page.url.pathname === navItem.link
												? navItem.icon.replace('-outline', '')
												: navItem.icon}
											class="text-2xl"
										/> -->
									{/if}
							
									<span>{navItem.title}</span>
								</a>
							{:else if navItem.children}
								<Accordion>
									<AccordionItem>
										<svelte:fragment slot="lead">
											<Icon
											cls="stroke-slate-800 stroke-2 fill-none h-10"
											h="100%" w="100%" iconPath={navParent.icon}/>
										</svelte:fragment>
										<svelte:fragment slot="summary">
											{navItem.title}
										</svelte:fragment>
										<svelte:fragment slot="content">
											<nav class="list-nav space-y-1">
												{#each navItem.children as childItem}
													<a
														href={childItem.link}
														class:!variant-soft-secondary={$page.url.pathname === childItem.link}
													>
													<Icon
													cls={`stroke-2 fill-none h-10 ${$page.url.pathname === childItem.link ? 'stroke-primary-600' : 'stroke-slate-500' }`}
														h="100%" w="100%" iconPath={childItem.icon}
														/>
														<span>{childItem.title}</span>
													</a>
												{/each}
											</nav>
										</svelte:fragment>
									</AccordionItem>
								</Accordion>
							{/if}
						{/each}
					</nav>
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</div>

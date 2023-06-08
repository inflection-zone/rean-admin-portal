<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import { navigating } from '$app/stores';

	export let userId = undefined;
	export let showSidebar = false;

	const navData = [
		{
			title: 'Dashboard',
			icon: '/sidebar/dashboard.png',
			childNav: [
				{
					icon: '/rean-logo-white.png',
					title: 'RHG App',
					link: `/users/${userId}/home`
				},
				{
					icon: '/rean-logo-white.png',
					title: 'RHG Bot',
					link: `/users/${userId}/home`
				}
			]
		},
		{
			title: 'Clinical',
			icon: '/sidebar/clinical.png',
			childNav: [
				{
					icon: '/sidebar/assessment-template.png',
					title: 'Assessments',
					link: `/users/${userId}/assessment-templates`
				},
				{
					icon: '/sidebar/lab-record.png',
					title: 'Lab-Records',
					link: `/users/${userId}/lab-record-types`
				},
				{
					icon: '/sidebar/symptom.png',
					title: 'Symptoms',
					link: `/users/${userId}/symptoms`
				},
				{
					icon: '/sidebar/drug.png',
					title: 'Drug',
					link: `/users/${userId}/drugs`
				}
			]
		},
		{
			title: 'Educational',
			icon: '/sidebar/educational.png',
			childNav: [
				{
					icon: '/sidebar/course.png',
					title: 'Courses',
					link: `/users/${userId}/courses`
				},
				{
					icon: '/sidebar/learning.png',
					title: 'Learning Journey',
					link: `/users/${userId}/learning-journeys`
				},
				{
					icon: '/sidebar/knowledge-nugget.png',
					title: 'Knowledge Nuggets',
					link: `/users/${userId}/knowledge-nuggets`
				}
			]
		},
		{
			title: 'Types',
			icon: '/sidebar/types.png',
			childNav: [
				{
					icon: '/sidebar/role.png',
					title: 'Person Role',
					link: `/users/${userId}/person-role-types`
				},
				{
					icon: '/sidebar/priority.png',
					title: 'Priorities',
					link: `/users/${userId}/priorities`
				},
				{
					icon: '/sidebar/goal.png',
					title: 'Goals',
					link: `/users/${userId}/goals`
				}
			]
		},
		{
			title: 'Miscellaneous',
			icon: '/sidebar/miscellaneous.png',
			childNav: [
				{
					icon: '/sidebar/client.png',
					title: 'Clients',
					link: `/users/${userId}/api-clients`
				},
				{
					icon: '/sidebar/organization.png',
					title: 'Organizations',
					link: `/users/${userId}/organizations`
				},
				{
					icon: '/sidebar/notification.png',
					title: 'Notifications',
					link: `/users/${userId}/notifications`
				},
				{
					icon: '/sidebar/newsfeed.png',
					title: 'News Feed',
					link: `/users/${userId}/newsfeeds`
				},
				{
					icon: '/sidebar/notice.png',
					title: 'Notices',
					link: `/users/${userId}/notices`
				}
			]
		}
	];

	$: if ($navigating) showSidebar = false;
</script>

<div
	class="w-72 bg-secondary-50 h-full pt-4 
	{showSidebar ? 'max-md:fixed z-10' : 'hidden'} md:block transition-all"
>
	<Accordion width="w-[280px]" autocollapse rounded="rounded-none">
		{#each navData as navParent, idx}
			<AccordionItem>
				<svelte:fragment slot="lead">
					<img src={navParent.icon} alt="" class="invert" />
				</svelte:fragment>
				<svelte:fragment slot="summary">{navParent.title}</svelte:fragment>
				<svelte:fragment slot="content">
					<nav class="list-nav space-y-1">
						{#each navParent.childNav as navItem}
							<a
								href={navItem.link}
								class:!variant-soft-secondary={$page.url.pathname === navItem.link}
							>
								<span>
									<img src={navItem.icon} alt="" class="invert w-6 h-6" />
								</span>
								<span>{navItem.title}</span>
							</a>
						{/each}
					</nav>
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</div>

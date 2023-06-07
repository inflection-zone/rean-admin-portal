<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faAngleDown,
		faAngleUp,
		faArrowLeft,
		faArrowRight,
		faBars,
		faClose
	} from '@fortawesome/free-solid-svg-icons';

	import { page } from '$app/stores';
	import { onMount, afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	export let userId = undefined;
	let showDashboardMenus = false;
	let showEducationalMenus = false;
	let showClinicalMenus = false;
	let showTypesMemus = false;
	let showMiscellaneousMenus = false;
	export let showSidebar = true;
	let activeTab = '';

	onMount(() => {
		activeTab = $page.url.pathname;
	});

	afterUpdate(() => {
		activeTab = $page.url.pathname;
	});

	let homeLink;
	let clientsLink;
	let assessmentTemplateLink;
	let labRecordTypeLink;
	let drugsLink;
	let symptomsLink;
	let coursesLink;
	let learningJourneyLink;
	let knowledgeNuggetsLink;
	let organizationsLink;
	let notificationsLink;
	let newsFeedLink;
	let noticesLink;
	let personRoleTypesLink;
	let priorityTypesLink;
	let goalTypesLink;
	let rhgBotLink;

	onMount(() => {
		homeLink = `/users/${userId}/home`;
		assessmentTemplateLink = `/users/${userId}/assessment-templates`;
		labRecordTypeLink = `/users/${userId}/lab-record-types`;
		drugsLink = `/users/${userId}/drugs`;
		symptomsLink = `/users/${userId}/symptoms`;
		learningJourneyLink = `/users/${userId}/learning-journeys`;
		clientsLink = `/users/${userId}/api-clients`;
		coursesLink = `/users/${userId}/courses`;
		knowledgeNuggetsLink = `/users/${userId}/knowledge-nuggets`;
		organizationsLink = `/users/${userId}/organizations`;
		notificationsLink = `/users/${userId}/notifications`;
		newsFeedLink = `/users/${userId}/newsfeeds`;
		noticesLink = `/users/${userId}/notices`;
		personRoleTypesLink = `/users/${userId}/person-role-types`;
		priorityTypesLink = `/users/${userId}/priorities`;
		goalTypesLink = `/users/${userId}/goals`;
	});

	const gotoHome = async () => {
		await goto(homeLink);
	};

	const gotoClients = async () => {
		await goto(clientsLink);
	};

	const gotoAssessmentTemplates = async () => {
		await goto(assessmentTemplateLink);
	};

	const gotoLabRecordTypes = async () => {
		await goto(labRecordTypeLink);
	};

	const gotoDrugs = async () => {
		await goto(drugsLink);
	};

	const gotoSymptoms = async () => {
		await goto(symptomsLink);
	};

	const gotoCourses = async () => {
		await goto(coursesLink);
	};

	const gotoLearningJourney = async () => {
		await goto(learningJourneyLink);
	};

	const gotoKnowledgeNuggets = async () => {
		await goto(knowledgeNuggetsLink);
	};

	const gotoOrganizations = async () => {
		await goto(organizationsLink);
	};

	const gotoNotifications = async () => {
		await goto(notificationsLink);
	};

	const gotoNewsFeed = async () => {
		await goto(newsFeedLink);
	};

	const gotoNotices = async () => {
		await goto(noticesLink);
	};

	const gotoPersonRoleTypes = async () => {
		await goto(personRoleTypesLink);
	};

	const gotoPriorityTypes = async () => {
		await goto(priorityTypesLink);
	};

	const gotoGoalTypes = async () => {
		await goto(goalTypesLink);
	};

	const onEducationalTabClick = async () => {
		showEducationalMenus = !showEducationalMenus;
	};

	const onDashbodrTabClick = async () => {
		showDashboardMenus = !showDashboardMenus;
	};

	const onClinicalTabClick = async () => {
		showClinicalMenus = !showClinicalMenus;
	};

	const onTypesTabClick = async () => {
		showTypesMemus = !showTypesMemus;
	};

	const onMiscellaneousTabClick = async () => {
		showMiscellaneousMenus = !showMiscellaneousMenus;
	};

	const toggleSidebar = () => {
		showSidebar = !showSidebar;
	};
</script>

{#if showSidebar}
	<div class="w-64 min-h-full bg-secondary-500">
		<button class=" flex justify-end w-48 text-white pt-5 ml-6" on:click={toggleSidebar}>
			<Fa icon={faArrowLeft} size="md" />
		</button>
		<div class=" flex flex-col item-center justify-center">
			<!-- <button class="flex flex-rows w-full" on:click|capture={gotoHome}>
				<img src="/sidebar/dashboard.png" alt="" class="mt-5 ml-6 mr-4 h-6 w-6" />
				<span
					class="w-40 hover:bg-[#6c3dc2] hover:text-white text-start p-2 my-3 ml-2 hover:no-underline rounded-md text-md font-medium {activeTab ==
					homeLink
						? 'active: bg-primary-500 text-white'
						: 'text-white'}">Dashboard</span
				>
			</button> -->
			<button class="flex flex-rows gap-2 w-full" on:click|capture={onDashbodrTabClick}>
				<img src="/sidebar/dashboard.png" alt="" class="mt-5 ml-6 mr-4 h-6 w-6" />
				<span
					class="mt-4 p-2 w-40 my-3 relative flex flex-rows text-white text-md hover:bg-[#6c3dc2] hover:text-white px-3 py-2 hover:no-underline rounded-md text-md font-medium "
					>Dashboard
					<button class="right-0 pr-2 absolute pt-2 ">
						{#if showDashboardMenus}
							<Fa icon={faAngleUp} size="md" />
						{:else}
							<Fa icon={faAngleDown} size="md " />
						{/if}
					</button></span
				>
			</button>

			{#if showDashboardMenus}
				<div class="flex flex-col items-center bg-secondary-600">
					<button class="flex flex-rows w-full" on:click|capture={gotoHome}>
						<img src="/rean-logo-white.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start p-2 my-3 text-white rounded-md text-md font-medium hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							homeLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">RHG App</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoHome}>
						<img src="/rean-logo-white.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							labRecordTypeLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">RHG Bot</span
						>
					</button>
				</div>
			{/if}
			
			<button class="flex flex-rows gap-2 w-full" on:click|capture={onClinicalTabClick}>
				<img src="/sidebar/clinical.png" alt="" class="mt-5 ml-6 mr-4 h-6 w-6" />
				<span
					class="mt-4 p-2 w-40 my-3 relative flex flex-rows text-white text-md hover:bg-[#6c3dc2] hover:text-white px-3 py-2 hover:no-underline rounded-md text-md font-medium "
					>Clinical
					<button class="right-0 pr-2 absolute pt-2 ">
						{#if showClinicalMenus}
							<Fa icon={faAngleUp} size="md" />
						{:else}
							<Fa icon={faAngleDown} size="md " />
						{/if}
					</button></span
				>
			</button>
			{#if showClinicalMenus}
				<div class="flex flex-col items-center bg-secondary-600">
					<button class="flex flex-rows w-full" on:click|capture={gotoAssessmentTemplates}>
						<img src="/sidebar/assessment-template.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start p-2 my-3 text-white rounded-md text-md font-medium hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							assessmentTemplateLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Assessments</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoLabRecordTypes}>
						<img src="/sidebar/lab-record.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							labRecordTypeLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Lab Records</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoSymptoms}>
						<img src="/sidebar/symptom.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							symptomsLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Symptoms</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoDrugs}>
						<img src="/sidebar/drug.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							drugsLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Drugs</span
						>
					</button>
				</div>
			{/if}
			<button class="flex flex-rows gap-2 w-full" on:click|capture={onEducationalTabClick}>
				<img src="/sidebar/educational.png" alt="" class="mt-5 ml-6 mr-4 h-6 w-6" />
				<span
					class="my-3 p-2 w-40 relative flex flex-rows text-white text-md hover:bg-[#6c3dc2] hover:text-white px-3 py-2 hover:no-underline rounded-md text-md font-medium "
					>Educational
					<button class="right-0 absolute pr-2 pt-2 ">
						{#if showEducationalMenus}
							<Fa icon={faAngleUp} size="md" />
						{:else}
							<Fa icon={faAngleDown} size="md " />
						{/if}
					</button></span
				>
			</button>
			{#if showEducationalMenus}
				<div class="flex flex-col bg-secondary-600">
					<button class="flex flex-rows gap-2 w-full m1-4" on:click|capture={gotoCourses}>
						<img src="/sidebar/course.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start p-2 my-3 text-white rounded-md text-md font-medium hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							coursesLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Courses</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoLearningJourney}>
						<img src="/sidebar/learning.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							learningJourneyLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Learning Journey</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoKnowledgeNuggets}>
						<img src="/sidebar/knowledge-nugget.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							knowledgeNuggetsLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Knowledge Nuggets</span
						>
					</button>
				</div>
			{/if}
			<button class="flex flex-rows gap-2 w-full" on:click|capture={onTypesTabClick}>
				<img src="/sidebar/types.png" alt="" class="mt-5 ml-6 mr-4 h-6 w-6" />
				<span
					class="my-3 p-2 w-40 flex flex-rows relative text-white text-md hover:bg-[#6c3dc2] hover:text-white px-3 py-2 hover:no-underline rounded-md text-md font-medium "
					>Types
					<button class="right-0 absolute pr-2 pt-2 ">
						{#if showTypesMemus}
							<Fa icon={faAngleUp} size="md" />
						{:else}
							<Fa icon={faAngleDown} size="md " />
						{/if}
					</button></span
				>
			</button>
			{#if showTypesMemus}
				<div class="flex flex-col bg-secondary-600">
					<button class="flex flex-rows gap-2 w-full m1-4" on:click|capture={gotoPersonRoleTypes}>
						<img src="/sidebar/role.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6 " />
						<span
							class="text-start p-2 my-3 text-white rounded-md text-md font-medium hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							personRoleTypesLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Person Role</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoPriorityTypes}>
						<img src="/sidebar/priority.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							priorityTypesLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Priorities</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoGoalTypes}>
						<img src="/sidebar/goal.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							goalTypesLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Goals</span
						>
					</button>
				</div>
			{/if}
			<button class="flex flex-rows gap-2 w-full" on:click|capture={onMiscellaneousTabClick}>
				<img src="/sidebar/miscellaneous.png" alt="" class="mt-5 ml-6 mr-4 h-6 w-6" />
				<span
					class="my-3 p-2 w-40 relative flex flex-rows text-white text-md hover:bg-[#6c3dc2] hover:text-white px-3 py-2 hover:no-underline rounded-md text-md font-medium "
					>Miscellaneous
					<button class="right-0 pr-2 absolute pt-2 ">
						{#if showMiscellaneousMenus}
							<Fa icon={faAngleUp} size="md" />
						{:else}
							<Fa icon={faAngleDown} size="md " />
						{/if}
					</button></span
				>
			</button>
			{#if showMiscellaneousMenus}
				<div class="flex flex-col bg-secondary-600">
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoClients}>
						<img src="/sidebar/client.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start p-2 my-3 text-white rounded-md text-md font-medium hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							clientsLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Clients</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoOrganizations}>
						<img src="/sidebar/organization.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start p-2 my-3 text-white rounded-md text-md font-medium hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							organizationsLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Organizations</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoNotifications}>
						<img src="/sidebar/notification.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							notificationsLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Notifications</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoNewsFeed}>
						<img src="/sidebar/newsfeed.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium  hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							newsFeedLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Newsfeeds</span
						>
					</button>
					<button class="flex flex-rows gap-2 w-full" on:click|capture={gotoNotices}>
						<img src="/sidebar/notice.png" alt="" class="mt-5 ml-10 mr-4 h-6 w-6" />
						<span
							class="text-start my-3 p-2 text-white rounded-md text-md font-medium mb-10 hover:bg-[#6c3dc2] hover:text-white {activeTab ==
							noticesLink
								? 'active: bg-primary-500 text-white'
								: 'text-white'}">Notices</span
						>
					</button>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="w-40 min-h-full bg-secondary-500 item-center justify-center ">
		<button class=" flex justify-end w-6 text-white pt-5 ml-6 mb-3" on:click={toggleSidebar}>
			<Fa icon={faArrowRight} size="md" />
		</button>
		<div class=" flex flex-col item-center justify-center">
			<!-- <button
				class="w-full flex flex-col item-center justify-center p-2 hover:bg-[#6c3dc2] hover:text-white {activeTab ==
				homeLink
					? 'active: bg-primary-500 text-white'
					: 'text-white'}"
				on:click|capture={gotoHome}
			>
				<img src="/sidebar/dashboard.png" alt="" class=" mx-auto h-6 w-6" />
				<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
					>Dashboard</span
				>
			</button> -->
			<button
			class="flex flex-col w-full item-center justify-center p-2 mt-3 text-white hover:bg-[#6c3dc2] hover:text-white"
			on:click|capture={onDashbodrTabClick}
		>
			<img src="/sidebar/dashboard.png" alt="" class="mx-auto mb-1 h-6 w-6 " />
			<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
				>Dashboard
			</span>
		</button>

		{#if showDashboardMenus}
				<div class="flex flex-col items-center bg-secondary-600 pb-2">
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-6 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						homeLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoHome}
					>
						<img src="/rean-logo-white.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>RHG App
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-6 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						rhgBotLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoHome}
					>
						<img src="/rean-logo-white.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>RHG Bot
						</span>
					</button>
				</div>
			{/if}

			<button
				class="flex flex-col w-full item-center justify-center p-2 mt-3 text-white hover:bg-[#6c3dc2] hover:text-white"
				on:click|capture={onClinicalTabClick}
			>
				<img src="/sidebar/clinical.png" alt="" class="mx-auto mb-1 h-6 w-6 " />
				<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
					>Clinical
				</span>
			</button>
			{#if showClinicalMenus}
				<div class="flex flex-col items-center bg-secondary-600">
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-6 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						assessmentTemplateLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoAssessmentTemplates}
					>
						<img src="/sidebar/assessment-template.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Assessments
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-6 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						labRecordTypeLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoLabRecordTypes}
					>
						<img src="/sidebar/lab-record.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Lab Records
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-6 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						symptomsLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoSymptoms}
					>
						<img src="/sidebar/symptom.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Symptoms
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-6 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						drugsLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoDrugs}
					>
						<img src="/sidebar/drug.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Drugs
						</span>
					</button>
				</div>
			{/if}
			<button
				class="flex flex-col w-full item-center justify-center p-2 mt-3 text-white hover:bg-[#6c3dc2] hover:text-white"
				on:click|capture={onEducationalTabClick}
			>
				<img src="/sidebar/educational.png" alt="" class="mx-auto mb-1 h-6 w-6" />
				<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium"
					>Educational
				</span>
			</button>
			{#if showEducationalMenus}
				<div class="flex flex-col bg-secondary-600">
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						coursesLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoCourses}
					>
						<img src="/sidebar/course.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Courses
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-3 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						learningJourneyLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoLearningJourney}
					>
						<img src="/sidebar/learning.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Learning<br />Journeys
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						knowledgeNuggetsLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoKnowledgeNuggets}
					>
						<img src="/sidebar/knowledge-nugget.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Knowledge <br />Nuggets
						</span>
					</button>
				</div>
			{/if}

			<button
				class="flex flex-col w-full item-center justify-center p-2 mt-3 text-white hover:bg-[#6c3dc2] hover:text-white"
				on:click|capture={onTypesTabClick}
			>
				<img src="/sidebar/types.png" alt="" class="mx-auto mb-1 h-6 w-6" />
				<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium"
					>Types
				</span>
			</button>
			{#if showTypesMemus}
				<div class="flex flex-col bg-secondary-600">
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						personRoleTypesLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoPersonRoleTypes}
					>
						<img src="/sidebar/role.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Person Role
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						priorityTypesLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoPriorityTypes}
					>
						<img src="/sidebar/priority.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Priorities
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						goalTypesLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoGoalTypes}
					>
						<img src="/sidebar/goal.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Goals
						</span>
					</button>
				</div>
			{/if}
			<button
				class="flex flex-col w-full item-center justify-center p-2 mt-3 text-white hover:bg-[#6c3dc2] hover:text-white"
				on:click|capture={onMiscellaneousTabClick}
			>
				<img src="/sidebar/miscellaneous.png" alt="" class="mx-auto mb-1 h-6 w-6" />
				<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium"
					>Miscellaneous
				</span>
			</button>
			{#if showMiscellaneousMenus}
				<div class="flex flex-col bg-secondary-600">
				<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						clientsLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoClients}
					>
						<img src="/sidebar/client.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Clients
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						organizationsLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoOrganizations}
					>
						<img src="/sidebar/organization.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Organizations
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						notificationsLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoNotifications}
					>
						<img src="/sidebar/notification.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Notifications
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						newsFeedLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoNewsFeed}
					>
						<img src="/sidebar/newsfeed.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Newsfeeds
						</span>
					</button>
					<button
						class="flex flex-col w-full item-center justify-center p-2 mt-3 ml-4 mb-10 hover:bg-[#6c3dc2] hover:text-white  {activeTab ==
						noticesLink
							? 'active: bg-primary-500 text-white'
							: 'text-white'}"
						on:click|capture={gotoNotices}
					>
						<img src="/sidebar/notice.png" alt="" class="mx-auto mb-1 h-6 w-6" />
						<span class="mx-auto text-start hover:no-underline rounded-md text-md font-medium "
							>Notices
						</span>
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

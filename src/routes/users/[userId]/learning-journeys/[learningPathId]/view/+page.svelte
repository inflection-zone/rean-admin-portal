<script lang="ts">
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import {
		faMultiply,
		faPen,
		faList,
		faMessage,
		faQuestionCircle
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { TreeView, TreeBranch, TreeLeaf } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let courses = data.learningJourney.Courses;
	let learningPathId = $page.params.learningPathId;
	let id = data.learningJourney.id;
	let name = data.learningJourney.Name;
	let preferenceWeight = data.learningJourney.PreferenceWeight;
	let description = data.learningJourney.Description;
	let durationInDays = data.learningJourney.DurationInDays;
	let imageUrl = data.learningJourney.ImageUrl;

	courses = courses.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});
	console.log('courses===', courses);

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/learning-journeys/${learningPathId}/edit`;
	const viewRoute = `/users/${userId}/learning-journeys/${learningPathId}/view`;
	const courseRoute = `/users/${userId}/courses`;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;

	const breadCrumbs = [
		{
			name: 'Learning-Journeys',
			path: learningJourneyRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-3 pb-10 mb-5">
		<form
			method="get"
			class="w-full lg:max-w-2xl md:max-w-xl sm:max-w-lg mb-10 bg-[#ECE4FC] mt-6 rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Learning Journey</div>
					<div class="lg:block md:block hidden">View Learning Journey</div>
					<a href={learningJourneyRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Name</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="name">{name}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Prefrence Weight</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="preferenceWeight">{preferenceWeight}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="description">{description}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Duration In Days</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="durationInDays">{durationInDays}</span>
			</div>

			<div class="flex items-start my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Image</span>
					</label>
				</div>
				<!-- <span class="span w-1/2 md:w-2/3 lg:w-2/3">{image}</span> -->
				{#if imageUrl === 'undefined'}
					<span class="span">Not Specified</span>
					<!-- <img class="flex h-24 w-24 rounded-full" src={avatarSource} alt="d" /> -->
				{:else}
					<Image cls="flex h-24 w-24 rounded-md" source={imageUrl} w="24" h="24" />
				{/if}
			</div>

			<div class="flex items-start mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label mt-2">
						<span>Courses</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3">
					<!-- svelte-ignore empty-block -->
					{#if courses.length <= 0}
						<div>Courses are not available</div>
					{:else}
						<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
							{#each courses as course, i}
								<TreeBranch defaultClosed>
									<div slot="root" class="flex">
										<img class="w-6 mr-2 " alt="logo" src="/course.png" />
										{i + 1}-{course.Name}
									</div>
									{#if course.Modules.length <= 0}
										<div />
									{:else}
										{#each course.Modules as module, i}
											<TreeBranch defaultClosed>
												<div slot="root" class="flex">
													<img class="w-6 mr-2 mb-4" alt="logo" src="/module.png" />
													{i + 1}-{module.Name}
												</div>
												{#if module.Contents.length <= 0}{:else}
													{#each module.Contents as content, i}
														<TreeLeaf>
															<div class="flex">
																<img class="w-6 mr-2 mb-4" alt="logo" src="/content.png" />
																{content.Sequence}-{content.Title}
															</div>
														</TreeLeaf>
													{/each}
												{/if}
											</TreeBranch>
										{/each}
									{/if}
								</TreeBranch>
							{/each}
						</TreeView>
					{/if}
				</span>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="lg:w-5/6 w-2/3 " />
				<div class="lg:w-1/6 w-1/3 ">
					<a href={editRoute}>
						<button
							type="submit"
							class="btn variant-ringed-primary lg:w-full w-24 mb-10 lg:mr-4 mr-1"
						>
							Edit
							<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
						</button>
					</a>
				</div>
			</div>
		</form>
	</div>
</main>

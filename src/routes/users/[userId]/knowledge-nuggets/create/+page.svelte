<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import Tags from '$lib/components/tags.svelte';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	// import { Textarea} from 'flowbite-svelte';
	import Button from '$lib/components/button/button.svelte';
	import Input from '$lib/components/input/labeled.input.svelte';
	import Textarea from '$lib/components/input/labeled.textarea.svelte';
	// import { Input } from 'postcss';

	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';
	function handleTags(event) {
		retrievedTags = event.detail.tags;
	}

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/knowledge-nuggets/create`;
	const knowledgeNuggetsRoute = `/users/${userId}/knowledge-nuggets`;

	const breadCrumbs = [
		{
			name: 'Knowledge-Nuggets',
			path: knowledgeNuggetsRoute,
			home: true
		},
		{
			name: 'Create'
			// path: createRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="h-screen mb-10 ">
		<form
			method="post"
			action="?/createKnowledgeNugget"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3 mb-10 bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Knowledge Nugget
					<a href={knowledgeNuggetsRoute}>
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>
			<Input title="Name" type="text" name="topicName" required placeholder="Enter name here..." />
			<Textarea
				title="Brief Information"
				name="briefInformation"
				placeholder="Enter brief information here..."
			/>
			<Textarea
				title="Detailed Information"
				name="detailedInformation"
				placeholder="Enter detailed information here..."
			/>
			<Input
				title="Additional Resource"
				type="text"
				name="additionalResource"
				placeholder="Enter additional resource here..."
			/>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class=" font-semibold"> Tags </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<Tags name="Tags" placeholder={tagsPlaceholder} on:tags={handleTags} />
					<input type="hidden" name="tags" value={JSON.stringify(retrievedTags)} />
				</div>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<Button type = "submit" title="Submit" />
				</div>
			</div>
		</form>
	</div>
</main>

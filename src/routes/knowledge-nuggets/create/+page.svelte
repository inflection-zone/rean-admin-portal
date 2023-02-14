<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import Tags from '../../../lib/components/tags.svelte';

	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';

	function handleTags(event) {
		retrievedTags = event.detail.tags;
	}
</script>

<main class="h-screen mb-10">
	<div
		class=" breadcrumbs overflow-x-auto lg:text-xl sm:text-lg text-md text-[#7165E3] lg:ml-14 md:ml-10 sm:ml-6 lg:mt-10 sm:mt-4 mt-4 ml-4"
	>
		<ul>
			<li><a href="/" class="text-[#7165E3]">Home</a></li>
			<li><a href="/" class="text-[#7165E3]">knowledge Nuggets</a></li>
			<li><a href="./create" class="text-[#7165E3]">Create </a></li>
		</ul>
	</div>

	<div class="h-screen mb-10 ">
		<form
			method="post"
			action="?/createKnowledgeNuggets"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create knowledge Nuggets
					<a href="/users/assets">
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Name</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						placeholder="Enter  name here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Brief Information </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="briefinformation"
						required
						class="textarea textarea-info w-full"
						placeholder="Enter  brief information here..."
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Detailed Information </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="detailedinformation"
						required
						class="textarea textarea-info w-full"
						placeholder="Enter detailed information here..."
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Additional Resource </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="additionalResources"
						required
						class="textarea textarea-info w-full"
						placeholder="Enter  additional resource here..."
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Tags </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<Tags name="actionPlanTags" placeholder={tagsPlaceholder} on:tags={handleTags} />
					<input type="hidden" name="tags" value={JSON.stringify(retrievedTags)} />
				</div>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="w-3/4" />
				<div class="w-1/4 ">
					<button type="submit" class="btn bg-[#5832A1] hover:bg-[#5832A1] w-full mb-10 ">
						Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>

<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';

	let id = '56789';
	let name = 'abdc';
	let briefInformation = 'xxx xx xxxxx';
	let detailedInformation = 'xxxxxx xxxxx';
	let additionalResource = 'xxxxxx';
	let tags = 'xxx';

	function handleReset() {
		name = _name;
		briefInformation = _briefInformation;
		detailedInformation = _detailedInformation;
		additionalResource = _additionalResource;
		tags = JSON.parse(_tags);
	}
</script>

<main class="h-screen mb-10">
	<div
		class=" breadcrumbs overflow-x-auto lg:text-xl sm:text-lg text-md text-[#7165E3] lg:ml-14 md:ml-10 sm:ml-6 lg:mt-10 sm:mt-4 mt-4 ml-4"
	>
		<ul>
			<li><a href="/" class="text-[#7165E3]">Home</a></li>
			<li><a href="/" class="text-[#7165E3]">knowledge Nuggets</a></li>
			<li><a href="./create" class="text-[#7165E3]">Edit knowledge Nuggets</a></li>
		</ul>
	</div>

	<div class="h-screen mb-10 ">
		<form
			method="post"
			action="?/createActionPlan"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit knowledge Nuggets
					<a href="/users/assets">
						<Fa
							icon={faMultiply}
							size="lg"
							class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
						/>
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Name</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						bind:value={name}
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
						name="briefInformation"
						bind:value={briefInformation}
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
						name="detailedInformation"
						bind:value={detailedInformation}
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
						bind:value={additionalResource}
						class="textarea textarea-info w-full"
						placeholder="Enter additional resource here..."
					/>
				</div>
			</div>
			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Tags </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						bind:value={tags}
						placeholder="Enter tags here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center my-6 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10 "
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn bg-[#5832A1] hover:bg-[#5832A1] lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10 "
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>

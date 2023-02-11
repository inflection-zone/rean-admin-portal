<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';

	let id = '56789';
	let name = 'abdv';
	let learningJourney = 'Careplan';
	let description = 'xxxxxx';
	let image = 'assets';

	function handleReset() {
		name = _name;
		learningJourney = _learningJourney;
		description = _description;
		image = _image;
	}
</script>

<main class="h-screen mb-10">
	<div
		class=" breadcrumbs lg:text-xl sm:text-lg text-[#7165E3] lg:ml-14 md:ml-10 sm:ml-8 ml-4 mt-5 lg:mt-10"
	>
		<ul>
			<li><a href="/" class="text-[#7165E3]">Home</a></li>
			<li><a href="/users/assets" class="text-[#7165E3]">Course</a></li>
			<li><a href="/users/assets/action-plan/create" class="text-[#7165E3]">Edit Course</a></li>
		</ul>
	</div>

	<div class=" flex justify-center mt-5 px-3 mb-10 flex-col items-center">
		<form
			method="post"
			action="?/updateActionPlan"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Course
					<a href="/users/assets/action-plan/[id]/view">
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " /></a
					>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Name* </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						bind:value={name}
						placeholder="xxxxxxxxxxxxxx"
						class="input input-bordered w-full "
					/>
				</div>
			</div>
			<div class="flex items-center my-4  lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Learning Journey </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select select-info w-full"
						bind:value={learningJourney}
						placeholder="Enter  name here..."
					>
						<option value="Careplan">Careplan</option>
						<option value="Auto">Auto</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
				</div>
			</div>

			<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Description </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						class="textarea textarea-info w-full"
						name="description"
						bind:value={description}
						placeholder="Enter action plan description here..."
					/>
				</div>
			</div>
			<div class="flex items-center my-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="version"> Image </label>
				</div>
				<div class="flex flex-row gap-8 w-1/2 md:w-2/3 lg:w-2/3 ">
					<input
						name="version"
						type="file"
						class="true input input-bordered input-info w-full"
						placeholder="Image"
					/>
					<button
						class="capitalize btn btn-outline lg:w-[19%] md:w-[22%] md:text-[13px] sm:w-[30%] sm:text-[12px] min-[320px]:w-[40%] min-[320px]:text-[10px]"
						>Upload</button
					>
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

<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
</script>

<main class="h-screen mb-40">
	<div
		class=" breadcrumbs overflow-x-auto lg:text-xl sm:text-lg text-md text-[#7165E3] lg:ml-14 md:ml-10 sm:ml-6 lg:mt-10 sm:mt-4 mt-4 ml-4"
	>
		<ul>
			<li><a href="/" class="text-[#7165E3]">Home</a></li>
			<li><a href="/" class="text-[#7165E3]">Priority Health Management</a></li>
			<li><a href="./create" class="text-[#7165E3]">Create Priority Health Management</a></li>
		</ul>
	</div>
	<div class="px-5 mb-14 ">
		<form
			method="post"
			action="?/createPriorityHealthManagement"
			class="w-full  bg-[#ECE4FC] md:mt-8 sm:mt-6 lg:mt-10 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Create Priority Health Management
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
					<label class="lable-text font-semibold">Patient User Id</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="patientUserId"
						placeholder="Enter patient user id here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Provider</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="provider"
						placeholder="Enter provider here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Source</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="source"
						placeholder="Enter source here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Enrollment Id</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="enrollmentId"
						placeholder="Enter enrollment id here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Careplan Code</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="careplanCode"
						placeholder="Enter careplan code here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold">Careplan Name</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="careplanName"
						placeholder="Enter careplan name here..."
						class="input input-bordered input-info w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="version"> Health Priority Type </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select select-info w-full"
						placeholder="Select health priority type here..."
					>
						<option selected>Paracetamol</option>
						<option>Auto</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<label class="lable-text font-semibold" for="version"> Is Primary </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select class="select select-info w-full" placeholder="Select is primary here...">
						<option selected>True</option>
						<option>False</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
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

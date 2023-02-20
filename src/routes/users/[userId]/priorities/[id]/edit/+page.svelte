<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	// export let data: PageServerData;
	// let initiaData = {};
	// let id = data.priority.id;
	// let patientUserId = data.priority.patientUserId;
	// let provider = data.priority.provider;
	// let source = data.priority.source;
	// let enrollmentId = data.priority.enrollmentId;
	// let careplanCode = data.priority.careplanCode;
	// let careplanName = data.priority.careplanName;
	// let healthPriorityType = data.priority.healthPriorityType;
	// let isPrimary = data.priority.isPrimary;

	let id = '56789';
	let patientUserId = '123456';
	let provider = 'xxxxx';
	let source = 'Careplan';
	let enrollmentId = '98765';
	let careplanCode = '1234567';
	let careplanName = 'assets';
	let healthPriorityType = 'Maternity';
	let isPrimary = 'True';

	//Original data
	let _patientUserId = patientUserId;
	let _provider = provider;
	let _source = source;
	let _enrollmentId = enrollmentId;
	let _careplanCode = careplanCode;
	let _careplanName = careplanName;
	let _healthPriorityType = healthPriorityType;
	let _isPrimary = isPrimary;

	function handleReset() {
		patientUserId = _patientUserId;
		provider = _provider;
		source = _source;
		enrollmentId = _enrollmentId;
		careplanCode = _careplanCode;
		careplanName = _careplanName;
		healthPriorityType = _healthPriorityType;
		isPrimary = _isPrimary;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/priorities/${id}/edit`;
	const viewRoute = `/users/${userId}/priorities/${id}/view`;
	const priorityRoute = `/users/${userId}/priorities`;

	const breadCrumbs = [
		{
			name: 'Priority',
			path: priorityRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<main class="h-screen mb-40">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class=" flex justify-center mt-5 px-3 mb-10 flex-col items-center">
		<form
			method="post"
			action="?/updatePriority"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Priority
					<a href={viewRoute}>
						<!-- svelte-ignore missing-declaration -->
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>
			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Patient User Id </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="patientUserId"
						bind:value={patientUserId}
						placeholder="Enter patient user id here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Provider </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="provider"
						bind:value={provider}
						placeholder="Enter provider here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Source </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="source"
						bind:value={source}
						placeholder="Enter source here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Enrollment Id </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="enrollmentId"
						bind:value={enrollmentId}
						placeholder="Enter enrollment id here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Careplan Code </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="careplanCode"
						bind:value={careplanCode}
						placeholder="Enter enrollment code here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Careplan Name </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="careplanName"
						bind:value={careplanName}
						placeholder="Enter enrollment name here..."
						class="input input-bordered w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Health Priority Type </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select select-info w-full"
						placeholder="select health priority type here..."
						bind:value={healthPriorityType}
					>
						<option value="Maternity">Maternity</option>
						<option value="Auto">Auto</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="lable-text font-semibold"> Is Primary </label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select select-info w-full"
						bind:value={isPrimary}
						placeholder="select is primary here..."
					>
						<option value="True">True</option>
						<option value="False">False</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
				</div>
			</div>

			<div class="flex items-center my-10 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 "
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn bg-[#5832A1] hover:bg-[#5832A1] lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 "
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>

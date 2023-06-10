<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let form;
	export let data: PageServerData;
	let initiaData = {};
	let id = data.personRoleType.id;
	let roleName = data.personRoleType.RoleName;
	let description = data.personRoleType.Description;

	//Original data
	let _roleName = roleName;
	let _description = description;

	function handleReset() {
		roleName = _roleName;
		description = _description;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/person-role-types/${id}/edit`;
	const viewRoute = `/users/${userId}/person-role-types/${id}/view`;
	const personRoleTypesRoute = `/users/${userId}/person-role-types`;

	const breadCrumbs = [
		{
			name: 'Person-Roles',
			path: personRoleTypesRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<main class="h-screen mb-40">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="post"
			action="?/updatePersonRoleTypeAction"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Person Role Type
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
					<label class="label">
						<span>Role Name *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="roleName"
						required
						bind:value={roleName}
						placeholder="Enter role name here..."
						class="input w-full {form?.errors?.roleName
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.roleName}
						<p class="text-error-500 text-xs">{form?.errors?.roleName[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex  mb-2 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="textarea w-full {form?.errors?.description
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.description}
						<p class="text-error-500 text-xs">{form?.errors?.description[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button
						type="button"
						on:click={handleReset}
						class="btn variant-ringed-primary text-primary-500 lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
					>
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button
						type="submit"
						class="btn variant-filled-secondary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>

<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	// export let data: PageServerData;
	// let initiaData = {};
	// let name = data.drug.name;
	// let genericName = data.drug.genericName;
	// let ingredients = data.drug.ingredients;
	// let strength = data.drug.strength;
	// let commercialName = data.drug.commercialName;
	// let manufacture = data.drug.manufacture;
	// let otherInformation = data.drug.otherInformation;

	let id = '56789';
	let name = 'abc def';
	let genericName = 'Paracetamol';
	let ingredients = 'xxxxx';
	let strength = 'High';
	let commercialName = 'abcdef';
	let manufacture = 'xxxxxxxx';
	let otherInformation = 'xxxxxxx';

	//Original data
	let _name = name;
	let _genericName = genericName;
	let _ingredients = ingredients;
	let _strength = strength;
	let _commercialName = commercialName;
	let _manufacture = manufacture;
	let _otherInformation = otherInformation;

	function handleReset() {
		name = _name;
		genericName = _genericName;
		ingredients = _ingredients;
		strength = _strength;
		commercialName = _commercialName;
		manufacture = _manufacture;
		otherInformation = _otherInformation;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/drugs/${id}/edit`;
	const viewRoute = `/users/${userId}/drugs/${id}/view`;
	const drugsRoute = `/users/${userId}/drugs`;

	const breadCrumbs = [
		{
			name: 'Drug',
			path: drugsRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<main class="h-screen mb-32">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class=" flex justify-center mt-5 px-3 mb-10 flex-col items-center">
		<form
			method="post"
			action="?/updateDrug"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white text-xl">
					Edit Drug
					<a href={viewRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 mb-16 text-white " /></a
					>
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
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="name"
						bind:value={name}
						placeholder="Enter name here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Generic Name</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select w-full"
						bind:value={genericName}
						placeholder="select generic name here..."
					>
						<option value="Paracetamol">Paracetamol</option>
						<option value="Auto">Auto</option>
						<option>Dark mode</option>
						<option>Light mode</option>
					</select>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Ingredients</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="ingredients"
						bind:value={ingredients}
						placeholder="Enter ingredients here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Strength</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<select
						class="select w-full"
						bind:value={strength}
						placeholder="select strength here..."
					>
						<option value="High">High</option>
						<option value="Auto">Auto</option>
						<option>medium</option>
						<option>low</option>
					</select>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Commercial Name</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="commercialName"
						bind:value={commercialName}
						placeholder="Enter commercial name here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Manufacture</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="manufacture"
						bind:value={manufacture}
						placeholder="Enter manufacture here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Other Information</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<input
						type="text"
						name="otherInformation"
						bind:value={otherInformation}
						placeholder="Enter other information here..."
						class="input w-full "
					/>
				</div>
			</div>

			<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
				<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
					<button type="button" on:click={handleReset} class="btn variant-ringed-primary lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10">
						Reset</button
					>
				</div>
				<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
					<button type="submit" class="btn variant-filled-primary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
						>Submit
					</button>
				</div>
			</div>
		</form>
	</div>
</main>

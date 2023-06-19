<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import { InputChip } from '@skeletonlabs/skeleton';

	//////////////////////////////////////////////////////////////////////////////

	export let form;
	const userId = $page.params.userId;
	const assetRoute = `/users/${userId}/careplan/assets`;
	const createRoute = `/users/${userId}/careplan/assets/exercises/create`;
	const exerciseRoute = `/users/${userId}/careplan/assets/exercises/create`;

	const breadCrumbs = [
		{
			name: 'Assets',
			path: assetRoute
		},
		{
			name: 'Exercise',
			path: exerciseRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createExerciseAction"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Exercise</th>
				<th class="text-end">
					<a href={assetRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Name *</td>
				<td>
					<input
						type="text"
						required
						placeholder="Enter name here..."
						class="input {form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
						name="name"
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Description</td>
				<td>
					<textarea class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Exercise Type</td>
				<td>
					<select name="exerciseType" class="select">
						<option disabled selected>Select exercise type</option>
						<option>Strength</option>
						<option>Aerobic</option>
						<option>Balance</option>
						<option>Reflexes</option>
						<option>Flexibility</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Intensity Level</td>
				<td>
					<select name="intensityLevel" class="select">
						<option disabled selected>Select intensity level</option>
						<option>None</option>
						<option>Minimal</option>
						<option>Moderate</option>
						<option>Somewhat hard</option>
						<option>Hard</option>
						<option>Harder</option>
						<option>Very hard</option>
						<option>Extremely hard</option>
						<option>Maximum effort</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Recommended Duration Min</td>
				<td>
					<input type="text" name="version" class="input" placeholder="V 1.0" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Version</td>
				<td>
					<input
						type="number"
						placeholder="Enter recommendeddurationmin here..."
						class="input input-bordered input-primary w-full "
						name="recommendedDurationMin"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>

<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';

	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/lab-record-types/create`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Records',
			path: labRecordTypesRoute
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
	action="?/createLabRecordTypeAction"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Lab Record</th>
				<th class="text-end">
					<a href={labRecordTypesRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Type Name *</td>
				<td>
					<input
					type="text"
					name="typeName"
					required
					placeholder="Enter type name here..."
					class="input w-full {form?.errors?.typeName
						? 'border-error-300 text-error-500'
						: 'border-primary-200 text-primary-500'}"
				/>
				{#if form?.errors?.typeName}
					<p class="text-error-500 text-xs">{form?.errors?.typeName[0]}</p>
				{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Display Name</td>
				<td>
					<input
						type="text"
						name="displayName"
						placeholder="Enter display name here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>SNOMED CODE</td>
				<td>
					<input
						type="text"
						name="snowmedCode"
						placeholder="Enter snomed code here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>LOINC CODE</td>
				<td>
					<input
						type="text"
						name="loincCode"
						placeholder="Enter loinc code here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Minimum Normal Range</td>
				<td>
					<input
						type="number"
						name="normalRangeMin"
						placeholder="Enter minimum normal range here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Maximum Normal Range</td>
				<td>
					<input
						type="number"
						name="normalRangeMax"
						placeholder="Enter maximum normal range here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Unit</td>
				<td>
					<input
						type="text"
						name="unit"
						placeholder="Enter unit here..."
						class="input"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/custom-queries/create`;
	const queryRoute = `/users/${userId}/custom-queries`;

	const breadCrumbs = [
		{ name: 'Custom Queries', path: queryRoute },
		{ name: 'Create', path: createRoute }
	];

	let name ='';
	let decription = '';
	let format = '';

	const onQuerySubmit = async (name:string, decription: string, format: string) => {
		await executeQuery({
			name,
			decription,
			format
		});
	};

	async function executeQuery(model) {
		console.log("model---",model)
		const response = await fetch(`/api/server/custom-query/execute-query`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		console.log(response);
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	on:submit={async () => await onQuerySubmit(name, decription, format)}
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Query</th>
				<th class="text-end">
					<a href={queryRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name *</td>
				<td>
					<input
						type="text"
						name="name"
						bind:value={name}
						placeholder="Enter query here..."
						class="input w-full {form?.errors?.name ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea bind:value={decription} class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Format</td>
				<td>
					<input bind:value={format} type="text" class="input w-full" name="format" placeholder="Enter format here..." />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>

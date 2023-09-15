<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';

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
	let description = '';
	let format;
	let query = '';
	let tags = [];

	const onQuerySubmit = async (name:string, description: string, format: string, query:string, tags:string[]) => {
		await executeQuery({
			name,
			description,
			format,
			query,
			tags
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

// 	async function fetchDataAndDownload(type) {
//   try {
//     const response = await fetch('your-api-endpoint');
//     const contentType = response.headers.get('content-type');
    
//     if (contentType.includes('application/json')) {
//       const jsonData = await response.json();
//       downloadFile(JSON.stringify(jsonData), 'data.json', 'application/json');
//     } else if (contentType.includes('text/csv')) {
//       const csvData = await response.text();
//       downloadFile(csvData, 'data.csv', 'text/csv');
//     } else {
//       console.error('Unsupported content type:', contentType);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

function downloadFile(data, filename, contentType) {
  const blob = new Blob([data], { type: contentType });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	on:submit={async () => await onQuerySubmit(name, description, format, query, tags)}
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
					<textarea bind:value={description} class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Add Query</td>
				<td>
					<textarea bind:value={query} class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
          <InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Format *</td>
				<td>
					<select
						name="format"
						required
						class="select w-full"
						placeholder="Select forma here..."
						bind:value={format}
					>
						<option value=CSV>CSV</option>
						<option value=JSON>JSON</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>

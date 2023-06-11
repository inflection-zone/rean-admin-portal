<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import SingleChoice from '../../create/single.choice.svelte';
	import MultipleChoice from '../../create/multiple.choice.svelte';

	//////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	const queryResponseTypes = data.queryResponseTypes;
	const assessmentNodes = data.assessmentNodes;
	let id = data.assessmentNode.id;
	let nodeType = data.assessmentNode.NodeType;
	let title = data.assessmentNode.Title;
	let description = data.assessmentNode.Description;
	let queryType = data.assessmentNode.QueryResponseType;
	let options = data.assessmentNode.Options ?? [];
	let optionValueStore = options;
	let message = data.assessmentNode.Message ?? null;
	let parentNodeId = data.assessmentNode.ParentNodeId;
	let sequence = data.assessmentNode.Sequence;

	//Original data
	let _nodeType = nodeType;
	let _title = title;
	let _description = description;
	let _queryType = queryType;
	let _sequence = sequence;

	function handleReset() {
		nodeType = _nodeType;
		title = _title;
		description = _description;
		queryType = _queryType;
		sequence = _sequence;
	}

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const nodeId = $page.params.nodeId;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const assessmentTemplateView = `/users/${userId}/assessment-templates/${templateId}/view`;

	const breadCrumbs = [
		{ name: 'Assessments', path: assessmentsRoutes },
		{ name: 'Assessment-View', path: assessmentTemplateView },
		{ name: 'Assessment-Nodes', path: assessmentNodeRoutes },
		{ name: 'Edit', path: editRoute }
	];
	let selectedNodeType = nodeType;
	let selectedQueryType = queryType;

	const onSelectNodeType = (val) => {
		selectedNodeType = val.target.value;
	};

	const onSelectQueryResponseType = (val) => {
		selectedQueryType = val.target.value;
	};
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateAssessmentNodeAction"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Assessment Node</th>
				<th class="text-end">
					<a href={viewRoute} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Node Type *</td>
				<select
				name="nodeType"
				bind:value={nodeType}
				placeholder="Select node type here..."
				class="select"
				on:change={(val) => onSelectNodeType(val)}
			>
				<option selected>{nodeType}</option>
				<option>Question</option>
				<option>Message</option>
				<option>Node List</option>
			</select>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Title *</td>
				<td>
					<input
						type="text"
						name="title"
						required
						bind:value={title}
						placeholder="Enter title here..."
						class="input w-full {form?.errors?.title
							? 'border-error-300 text-error-500'
							: 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.title}
						<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Description</td>
				<td>
					<textarea
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Sequence</td>
				<td>
					<input
					type="number"
					name="sequence"
					placeholder="Enter sequence here..."
					class="input"
					bind:value={sequence}
				/>
			 </td>
			</tr>
			{#if selectedNodeType === 'Question'}
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Query Response Type *</td>
				<td>
					<select
						id="mySelect"
						name="queryType"
						class="select select-info w-full"
						placeholder="Select query type here..."
						on:change={(val) => onSelectQueryResponseType(val)}
					>
						<option selected value={queryType}>{queryType}</option>
						{#each queryResponseTypes as responseType}
							<option value={responseType}>{responseType}</option>
						{/each}
					</select>
					{#if selectedQueryType === 'Single Choice Selection'}
					 <SingleChoice {optionValueStore} />
				  {:else if selectedQueryType === 'Multi Choice Selection'}
					 <MultipleChoice {optionValueStore} />
				  {/if}
				</td>
			</tr>
			{:else if selectedNodeType === 'Message'}
			<tr class="!border-b !border-b-secondary-100">
				<td>Message *</td>
				<td>
					<textarea
						name="message"
						required
						placeholder="Enter message here..."
						bind:value={message}
						class="textarea w-full
						{form?.errors?.message ? 'border-error-300 text-error-500' : 'border-primary-200 text-primary-500'}"
					/>
				</td>
			</tr>
			{:else}
			<tr></tr>
			{/if}
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>


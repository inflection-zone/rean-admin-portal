<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import SingleChoice from './single.choice.svelte';
	import MultipleChoice from './multiple.choice.svelte';
	import { scoringApplicableCondition } from '$lib/store/general.store';

	/////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;

	const queryResponseTypes = data.queryResponseTypes;
	const assessmentNodes = data.assessmentNodes;

	let selectedNodeType = 'Question';
	let selectedQueryType = '';

	const onSelectNodeType = (val) => {
		selectedNodeType = val.target.value;
	};

	const onSelectQueryResponseType = (val) => {
		selectedQueryType = val.target.value;
	};

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const createRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const assessmentTemplateView = `/users/${userId}/assessment-templates/${templateId}/view`;

	const breadCrumbs = [
		{
			name: 'Assessments',
			path: assessmentsRoutes
		},
		{
			name: 'Assessment-View',
			path: assessmentTemplateView
		},
		{
			name: 'Assessment-Nodes',
			path: assessmentNodeRoutes
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
	action="?/createAssessmentNodeAction"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Assessment Node</th>
				<th class="text-end">
					<a href={assessmentNodeRoutes} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Node Type *</td>
				<td>
					<select
						name="nodeType"
						placeholder="Select node type here..."
						class="select w-full"
						on:change={(val) => onSelectNodeType(val)}
					>
						<option>Question</option>
						<option>Message</option>
						<option>Node List</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Parent Node *</td>
				<td>
					<select
						name="parentNodeId"
						required
						class="select w-full"
						placeholder="Select node type here..."
					>
						{#each assessmentNodes as node}
							<option value={node.id}>{node.NodeType} - {node.Title} - {node.DisplayCode}</option>
						{/each}
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Title *</td>
				<td>
					<input
						type="text"
						name="title"
						required
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
					<textarea name="description" placeholder="Enter description here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Sequence</td>
				<td>
					<input type="number" name="sequence" placeholder="Enter sequence here..." class="input" />
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
							{#each queryResponseTypes as responseType}
								<option value={responseType}>{responseType}</option>
							{/each}
						</select>
					</td>
				</tr>
				{#if $scoringApplicableCondition === true}
					{#if selectedQueryType === 'Single Choice Selection'}
						<SingleChoice />
						<tr class="!border-b !border-b-secondary-100">
							<td>Resolution Score *</td>
							<td>
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									class="input w-full {form?.errors?.resolutionScore
										? 'border-error-300 text-error-500'
										: 'border-primary-200 text-primary-500'}"
									value={form?.data?.resolutionScore ?? ''}
								/>
							</td>
						</tr>
					{:else if selectedQueryType === 'Multi Choice Selection'}
						<MultipleChoice />
						<tr class="!border-b !border-b-secondary-100">
							<td>Resolution Score *</td>
							<td>
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									class="input w-full {form?.errors?.resolutionScore
										? 'border-error-300 text-error-500'
										: 'border-primary-200 text-primary-500'}"
									value={form?.data?.resolutionScore ?? ''}
								/>
							</td>
						</tr>
					{:else if selectedQueryType === 'Boolean'}
						<tr class="!border-b !border-b-secondary-100">
							<td>Resolution Score *</td>
							<td>
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									class="input w-full {form?.errors?.resolutionScore
										? 'border-error-300 text-error-500'
										: 'border-primary-200 text-primary-500'}"
									value={form?.data?.resolutionScore ?? ''}
								/>
							</td>
						</tr>
					{/if}
				{:else if selectedQueryType === 'Single Choice Selection'}
					<SingleChoice />
				{:else if selectedQueryType === 'Multi Choice Selection'}
					<MultipleChoice />
				{/if}
			{:else if selectedNodeType === 'Message'}
				<tr class="!border-b !border-b-secondary-100">
					<td>Message *</td>
					<td>
						<textarea
							name="message"
							required
							placeholder="Enter message here..."
							class="textarea w-full
						{form?.errors?.message ? 'border-error-300 text-error-500' : 'border-primary-200 text-primary-500'}"
						/>
					</td>
				</tr>
			{:else}
				<tr class="!border-b !border-b-secondary-100">
					<td>Serve List Node Children At Once</td>
					<td>
						<input
							type="checkbox"
							name="serveListNodeChildrenAtOnce"
							value="true"
							class="checkbox checkbox-primary checkbox-md mr-2"
						/>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>

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
		sequence = _sequence
	}

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const nodeId = $page.params.nodeId;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const assessmentTemplateView =`/users/${userId}/assessment-templates/${templateId}/view`

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
			name: 'Edit',
			path: editRoute
		}
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

<div>
	<form
		method="post"
		action="?/updateAssessmentNodeAction"
		class="w-full lg:mt-10 md:mt-8 sm:mt-6 lg:max-w-4xl md:max-w-xl sm:max-w-lg bg-[#ECE4FC] mt-6 mb-20  rounded-lg mx-auto"
	>
		<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
			<div class="ml-3 relative flex flex-row text-white text-xl">
				Edit Assessment Node
				<a href={viewRoute}>
					<Fa
						icon={faMultiply}
						size="lg"
						class="absolute right-0 lg:pr-3 md:pr-2 pr-0 text-white"
					/>
				</a>
			</div>
		</div>

		<div class="flex items-center mb-4 mt-10 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Node Type *</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<select
					name="nodeType"
					bind:value={nodeType}
					placeholder="Select node type here..."
					class="select w-full"
					on:change={(val) => onSelectNodeType(val)}
				>
					<option selected>{nodeType}</option>
					<option>Question</option>
					<option>Message</option>
					<option>Node List</option>
				</select>
			</div>
		</div>

		<div class="flex items-center my-4 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Title *</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<input
					type="text"
					name="title"
					bind:value={title}
					placeholder="Enter title here..."
					required
					class="input w-full {form?.errors?.title
						? 'border-error-300 text-error-500'
						: 'border-primary-200 text-primary-500'}"
				/>
				{#if form?.errors?.title}
					<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
				{/if}
			</div>
		</div>

		<div class="flex items-start mt-4 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label mt-2">
					<span>Description</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<textarea
					name="description"
					bind:value={description}
					placeholder="Enter description here..."
					class="textarea w-full
					{form?.errors?.description
						? 'border-error-300 text-error-500'
						: 'border-primary-200 text-primary-500'}"
				/>
				{#if form?.errors?.description}
					<p class="text-error-500 text-xs">{form?.errors?.description[0]}</p>
				{/if}
			</div>
		</div>

		<div class="flex items-center mt-4 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Sequence</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<input
					type="number"
					name="sequence"
					placeholder="Enter sequence here..."
					class="input w-full {form?.errors?.sequence
						? 'border-error-300 text-error-500'
						: 'border-primary-200 text-primary-500'}"
					bind:value={sequence}
				/>
				{#if form?.errors?.sequence}
					<p class="text-error-500 text-xs">{form?.errors?.sequence[0]}</p>
				{/if}
			</div>
		</div>

		{#if selectedNodeType === 'Question'}
			<div class="flex items-center mb-4 mt-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Query Response Type *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
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
				</div>
			</div>
			<div>
				{#if selectedQueryType === 'Single Choice Selection'}
					<SingleChoice {optionValueStore} />
				{:else if selectedQueryType === 'Multi Choice Selection'}
					<MultipleChoice {optionValueStore} />
				{/if}
			</div>
		{:else if selectedNodeType === 'Message'}
			<div class="flex items-start mb-4 mt-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label mt-2">
						<span>Message *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="message"
						required
						placeholder="Enter message here..."
						bind:value={message}
						class="textarea w-full
						{form?.errors?.message ? 'border-error-300 text-error-500' : 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.message}
						<p class="text-error-500 text-xs">{form?.errors?.message[0]}</p>
					{/if}
				</div>
			</div>
		{:else}
			<div />
		{/if}
		<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
			<div class="lg:w-1/2 md:w-1/2 sm:w-1/2 " />
			<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 ">
				<button
					type="button"
					on:click={handleReset}
					class="btn variant-ringed-primary text-primary-500 lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
				>
					Reset</button
				>
			</div>
			<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 ">
				<button
					type="submit"
					class="btn variant-filled-primary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
					>Submit
				</button>
			</div>
		</div>
	</form>
</div>

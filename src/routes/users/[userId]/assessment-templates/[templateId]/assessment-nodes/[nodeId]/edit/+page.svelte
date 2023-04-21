<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import SingleChoice from '../../create/single.choice.svelte';
	import MultipleChoice from '../../create/multiple.choice.svelte';

	//////////////////////////////////////////////////////////////////////////////////////

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
	let parentNodeId = data.assessmentNode.ParentNodeId

	console.log("assessmentNode",data.assessmentNode)

	//Original data
	let _nodeType = nodeType;
	let _title = title;
	let _description = description;
	let _queryType = queryType;

	function handleReset() {
		nodeType = _nodeType;
		title = _title;
		description = _description;
		queryType = _queryType;
	}

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;

	const breadCrumbs = [
		{
			name: 'Assessment-Templates',
			path: assessmentsRoutes
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
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
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
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
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
					class="input w-full"
					placeholder="Enter title here..."
					required
				/>
			</div>
		</div>

		<div class="flex items-start mt-4 mx-16">
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label mt-2">
					<span>Description</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<textarea
					name="description"
					bind:value={description}
					class="textarea w-full"
					placeholder="Enter description here..."
				/>
			</div>
		</div>

		{#if selectedNodeType === 'Question'}
			<div class="flex items-center mb-4 mt-2 mx-16">
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
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

			{#if selectedQueryType === 'Single Choice Selection'}
				<SingleChoice {optionValueStore} />
			{:else if selectedQueryType === 'Multi Choice Selection'}
				<MultipleChoice {optionValueStore} />
			{:else}
				<div />
			{/if}
		{:else if selectedNodeType === 'Message'}
			<div class="flex items-start mb-4 mt-2 mx-16">
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label mt-2">
						<span>Message *</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<textarea
						name="message"
						required
						class="textarea w-full"
						placeholder="Enter message here..."
						bind:value={message}
					/>
				</div>
			</div>
		{:else}
			<div />
		{/if}
		<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
			<div class="lg:w-1/2 md:w-1/2 sm:w-1/2 "/>
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

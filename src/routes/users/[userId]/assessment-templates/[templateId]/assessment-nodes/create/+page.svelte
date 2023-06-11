<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Choice from './choice.svelte';
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

<div>
	<form
		method="post"
		action="?/createAssessmentNodeAction"
		class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
	>
		<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
			<div class="ml-3 relative flex  text-white text-xl">
				Create Assessment Node
				<a href={assessmentNodeRoutes}>
					<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
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
					required
					class="select w-full"
					placeholder="Select node type here..."
					on:change={(val) => onSelectNodeType(val)}
				>
					<option selected>Question</option>
					<option>Message</option>
					<option>Node list</option>
				</select>
			</div>
		</div>

		<div class="flex items-center my-4 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Parent Node *</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
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
					placeholder="Enter title here..."
					class="input w-full {form?.errors?.title
						? 'border-error-300 text-error-500'
						: 'border-primary-200 text-primary-500'}"
					value={form?.data?.title ?? ''}
				/>
				{#if form?.errors?.title}
					<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
				{/if}
			</div>
		</div>

		<div class="flex  mt-4 mx-16">
			<div class="w-1/2 md:w-1/3 lg:w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label mt-2">
					<span>Description</span>
				</label>
			</div>
			<div class="w-1/2 md:w-2/3 lg:w-2/3">
				<textarea
					name="description"
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
					value={form?.data?.sequence ?? ''}
				/>
				{#if form?.errors?.sequence}
					<p class="text-error-500 text-xs">{form?.errors?.sequence[0]}</p>
				{/if}
			</div>
		</div>

		{#if selectedNodeType === 'Question'}
			<div class="flex items-center mt-4 mx-16">
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
						placeholder="Select query type here..."
						class="select select-info w-full "
						on:change={(val) => onSelectQueryResponseType(val)}
					>
						{#each queryResponseTypes as responseType}
							<option value={responseType}>{responseType}</option>
						{/each}
					</select>
				</div>
			</div>
			<div>
				{#if $scoringApplicableCondition === true}
					{#if selectedQueryType === 'Single Choice Selection'}
						<Choice />
						<div class="flex items-center my-4 mx-16">
							<div class="w-1/2 md:w-1/3 lg:w-1/3">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="label">
									<span>Resolution Score *</span>
								</label>
							</div>
							<div class="w-1/2 md:w-2/3 lg:w-2/3">
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									class="input w-full {form?.errors?.resolutionScore
										? 'border-error-300 text-error-500'
										: 'border-primary-200 text-primary-500'}"
									value={form?.data?.resolutionScore ?? ''}
								/>
								{#if form?.errors?.resolutionScore}
									<p class="text-error-500 text-xs">{form?.errors?.resolutionScore[0]}</p>
								{/if}
							</div>
						</div>
					{:else if selectedQueryType === 'Multi Choice Selection'}
						<Choice />
						<div class="flex items-center my-4 mx-16">
							<div class="w-1/2 md:w-1/3 lg:w-1/3">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="label">
									<span>Resolution Score *</span>
								</label>
							</div>
							<div class="w-1/2 md:w-2/3 lg:w-2/3">
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									class="input w-full {form?.errors?.resolutionScore
										? 'border-error-300 text-error-500'
										: 'border-primary-200 text-primary-500'}"
									value={form?.data?.resolutionScore ?? ''}
								/>
								{#if form?.errors?.resolutionScore}
									<p class="text-error-500 text-xs">{form?.errors?.resolutionScore[0]}</p>
								{/if}
							</div>
						</div>
					{:else if selectedQueryType === 'Boolean'}
						<div class="flex items-center my-4 mx-16">
							<div class="w-1/2 md:w-1/3 lg:w-1/3">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<label class="label">
									<span>Resolution Score *</span>
								</label>
							</div>
							<div class="w-1/2 md:w-2/3 lg:w-2/3">
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									class="input w-full {form?.errors?.resolutionScore
										? 'border-error-300 text-error-500'
										: 'border-primary-200 text-primary-500'}"
									value={form?.data?.resolutionScore ?? ''}
								/>
								{#if form?.errors?.resolutionScore}
									<p class="text-error-500 text-xs">{form?.errors?.resolutionScore[0]}</p>
								{/if}
							</div>
						</div>
					{/if}
					<input
						type="boolean"
						name="scoringApplicable"
						class="input w-full"
						placeholder=""
						hidden
						value={$scoringApplicableCondition}
					/>
				{:else if selectedQueryType === 'Single Choice Selection'}
					<Choice />
				{:else if selectedQueryType === 'Multi Choice Selection'}
					<Choice />
				{/if}
			</div>
		{:else if selectedNodeType === 'Message'}
			<div class="flex  mb-4 mt-4 mx-16">
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
						class="textarea w-full
						{form?.errors?.message ? 'border-error-300 text-error-500' : 'border-primary-200 text-primary-500'}"
					/>
					{#if form?.errors?.message}
						<p class="text-error-500 text-xs">{form?.errors?.message[0]}</p>
					{/if}
				</div>
			</div>
		{:else}
			<div class="flex items-center mt-4 mx-16">
				<div class="w-1/2 md:w-1/3 lg:w-1/3">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Serve List Node Children At Once</span>
					</label>
				</div>
				<div class="w-1/2 md:w-2/3 lg:w-2/3">
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							name="serveListNodeChildrenAtOnce"
							value="true"
							class="checkbox checkbox-primary checkbox-md mr-2"
						/>
					</label>
				</div>
			</div>
		{/if}
		<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
			<div class="w-3/4" />
			<div class="w-1/4 ">
				<button type="submit" class="btn variant-filled-secondary w-full mb-10 "> Submit </button>
			</div>
		</div>
	</form>
</div>

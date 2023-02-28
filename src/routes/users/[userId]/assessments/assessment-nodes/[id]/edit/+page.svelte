<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Singleoption from '../../create/singleoption.svelte';
	import Multipleoption from '../../create/multipleoption.svelte';

	export let data: PageServerData;
	let initiaData = {};
	let id = data.assessmentNode.id;
	let nodeType = data.assessmentNode.nodeType;
	let title = data.assessmentNode.title;
	let description = data.assessmentNode.description;
	let queryType = data.assessmentNode.queryType;

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
	const editRoute = `/users/${userId}/assessments/assessment-nodes/${id}/edit`;
	const viewRoute = `/users/${userId}/assessments/assessment-nodes/${id}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessments/assessment-nodes`;

	const breadCrumbs = [
		{
			name: 'Assessment-Node',
			path: assessmentNodeRoutes
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];

	let show = '';
	show = 'multiChoice';
	const onChange = (val) => {
		show = val.target.value;
		console.log('val-------------', show);
	};
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div>
	<form
		method="post"
		action="?/updateAssessmentNode"
		class="w-full max-w-4xl  bg-[#ECE4FC] mt-6 mb-20  rounded-lg mx-auto"
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
			<div class="w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Node Type</span>
				</label>
			</div>
			<div class="w-2/3">
				<select name="nodeType" bind:value={nodeType} required class="select w-full "
					><option selected>Node Type</option>
					<option>Question</option>
					<option>3</option>
					<option>4</option>
				</select>
			</div>
		</div>

		<div class="flex items-center my-4 mx-16">
			<div class="w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Title</span>
				</label>
			</div>
			<div class="w-2/3">
				<input
					type="text"
					name="title"
					bind:value={title}
					class="input w-full"
					placeholder="Enter title here..."
				/>
			</div>
		</div>

		<div class="flex items-center my-4 mx-16">
			<div class="w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Description</span>
				</label>
			</div>
			<div class="w-2/3">
				<textarea
					name="description"
					bind:value={description}
					class="textarea w-full"
					placeholder="Enter description here..."
				/>
			</div>
		</div>
		<div class="flex items-center my-4 mx-16">
			<div class="w-1/3">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>Query Type</span>
				</label>
			</div>
			<div class="w-2/3">
				<select
					id="mySelect"
					name="queryType"
					bind:value={queryType}
					class="select select-info w-full "
					on:change={(val) => onChange(val)}
					><option selected value="textChoice">Text</option>
					<option value="singleChoice">Single choice question</option>
					<option value="multiChoice">multiple choice question</option>
					<option value="yesnoChoice">yes no question</option>
					<option value="okChoice">ok</option>
					<option>none</option>
				</select>
			</div>
		</div>

		{#if show === 'singleChoice'}
			<Singleoption />
		{:else if show === 'multiChoice'}
			<Multipleoption />
		{/if}

		<div class="flex items-center my-8 lg:mx-16 md:mx-12 mx-4 ">
			<div class="lg:w-1/2 md:w-1/2 sm:w-1/2  w-1/3" />
			<div class="lg:w-1/4 md:w-1/4 sm:w-1/4  w-1/3 ">
				<button
					type="button"
					on:click={handleReset}
					class="btn variant-ringed-primary btn-outline lg:w-40 lg:ml-8 md:ml-6 sm:ml-1 mb-10"
				>
					Reset</button
				>
			</div>
			<div class="lg:w-1/4 md:w-1/4 sm:w-1/4 w-1/3">
				<button
					type="submit"
					class="btn variant-filled-primary lg:w-40 lg:ml-8 md:ml-6 sm:ml-2 mb-10"
					>Submit
				</button>
			</div>
		</div>
	</form>
</div>

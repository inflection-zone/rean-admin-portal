<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import Singleoption from './single.choice.svelte';
	import Multipleoption from './multiple.choice.svelte';

	let show = '';
	const onChange = (val) => {
		show = val.target.value;
	};

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/assessments/assessment-nodes/create`;
	const assessmentNodeRoutes = `/users/${userId}/assessments/assessment-nodes`;

	const breadCrumbs = [
		{
			name: 'Assessment-Node',
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
		class="w-full max-w-4xl  bg-[#ECE4FC] mt-6 mb-20  rounded-lg mx-auto"
	>
		<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
			<div class="ml-3 relative flex flex-row text-white text-xl">
				Create Assessment Node
				<a href={assessmentNodeRoutes}>
					<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
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
				<select
					name="nodeType"
					required
					class="select w-full"
					placeholder="Select node type here..."
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
				<input type="text" name="title" class="input w-full" placeholder="Enter title here..." />
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
					required
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
					placeholder="Select query type here..."
					class="select select-info w-full "
					on:change={(val) => onChange(val)}
					><option selected value="textChoice">Text</option>
					<option value="singleChoice">Single choice question</option>
					<option value="multiChoice">Multiple choice question</option>
					<option value="yesnoChoice">Yes no question</option>
					<option value="okChoice">Ok</option>
					<option>None</option>
				</select>
			</div>
		</div>

		{#if show === 'singleChoice'}
			<Singleoption />
		{:else if show === 'multiChoice'}
			<Multipleoption />
		{/if}

		<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
			<div class="w-3/4" />
			<div class="w-1/4 ">
				<button type="submit" class="btn variant-filled-primary w-full mb-10 "> Submit </button>
			</div>
		</div>
	</form>
</div>

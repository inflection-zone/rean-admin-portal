<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show, showMessage } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import UpdateScoringCondition from '$lib/components/modal/update.scoring.condition.modal.svelte';
	import { scoringApplicableCondition, showScoringConditionModal } from '$lib/store/general.store';
	import { Helper } from '$lib/utils/helper';

	////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let sessionId = data.sessionId;
	let id = data.assessmentNode.id;
	let nodeType = data.assessmentNode.NodeType;
	let title = data.assessmentNode.Title;
	let description = data.assessmentNode.Description ?? null;
	let message = data.assessmentNode.Message ?? null;
	let serveListNodeChildrenAtOnce = data.assessmentNode.ServeListNodeChildrenAtOnce ?? null;
	let queryType = data.assessmentNode.QueryResponseType;
	let options = data.assessmentNode.Options ?? [];
	let childrenNodes = data.assessmentNode.Children ?? [];
	let displayCode = data.assessmentNode.DisplayCode;
	let resolutionScore;
	let sequence = data.assessmentNode.Sequence;

	$: resolutionScore;

	if (nodeType === 'Question') {
		resolutionScore = data.assessmentNode.ScoringCondition.ResolutionScore;
	}

	scoringApplicableCondition.set(data.templateScoringCondition.ScoringApplicable);

	console.log('assessmentNode', data.assessmentNode);

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const nodeId = $page.params.nodeId;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const createNodeRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;
	const assessmentTemplateView = `/users/${userId}/assessment-templates/${templateId}/view`;
	const editNodeRoute = (id) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/edit`;

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
			name: 'View',
			path: viewRoute
		}
	];
	const handleAssessmentNodeDelete = async (e, id) => {
		const assessmentNodeId = id;
		console.log('assessmentNodeId', assessmentNodeId);
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: templateId,
			assessmentNodeId: assessmentNodeId
		});
		window.location.href = viewRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessment-nodes`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		console.log();
	}

	const onUpdateScoringCondition = async (resolutionScore: number) => {
		const scoringId = data.assessmentNode.ScoringCondition.id;
		console.log(scoringId);
		await updateApiKey({
			sessionId,
			templateId,
			nodeId,
			scoringConditionId: data.assessmentNode.ScoringCondition.id,
			resolutionScore: resolutionScore
		});
	};

	async function updateApiKey(model) {
		const response = await fetch(`/api/server/assessment-nodes/update-scoring-condition`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		const scoringCondition = JSON.parse(resp);
		resolutionScore = scoringCondition.ResolutionScore;
		console.log(response);
	}
</script>

<UpdateScoringCondition
	on:updateScoringCondition={async (e) => await onUpdateScoringCondition(e.detail.resolutionScore)}
/>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap justify-end gap-2">
	{#if nodeType === 'Node list'}
		<a href={createNodeRoute} class="btn variant-filled-secondary">Add child</a>
	{/if}
	<a href={editRoute} class="btn variant-filled-secondary">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container border border-secondary-100 my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Assessment Node</th>
				<th class="text-end">
					<a href={assessmentNodeRoutes} class="btn btn-icon-sm -my-2 variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Node Type</td>
				<td>{nodeType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Parent Node</td>
				<td>{displayCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Sequence</td>
				<td>{sequence}</td>
			</tr>
			{#if nodeType === 'Question'}
				<tr class="!border-b !border-b-secondary-100">
					<td>Query Response Type</td>
					<td>{queryType}</td>
				</tr>
				{#if options.length > 0}
					<tr class="!border-b !border-b-secondary-100">
						<td class="align-top">Options</td>
						<td>
							<ol class="list-decimal">
								{#each options as option}
									<li>{option.Text}</li>
								{/each}
							</ol>
						</td>
					</tr>
				{/if}

				{#if $scoringApplicableCondition === true}
					<tr class="!border-b !border-b-secondary-100">
						<td>Resolution Score</td>
						<td>
							<div class="flex items-center">
								<span>{resolutionScore}</span>

								<button
									on:click|preventDefault={async () => showScoringConditionModal.set(true)}
									class="btn btn-icon-sm -my-1 ml-auto hover:variant-soft-primary"
								>
									<Fa icon={faPencil} style="color-text-primary" size="md" />
								</button>
							</div>
						</td>
					</tr>
				{/if}
			{:else if nodeType === 'Message'}
				<tr class="!border-b !border-b-secondary-100">
					<td>Message</td>
					<td>{message}</td>
				</tr>
			{:else if nodeType === 'Node list'}
				<tr class="!border-b !border-b-secondary-100">
					<td>Serve List Node Children At Once</td>
					<td>{serveListNodeChildrenAtOnce}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100">
					<td class="align-top">Children Nodes</td>
					<td>
						{#if childrenNodes.length <= 0}
							<span class="span">Children nodes not available!</span>
						{:else}
							<div class="table-container border border-secondary-100" id="modules">
								<table class="table table-compact">
									<thead class="!variant-soft-secondary">
										<tr>
											<th>Sequence</th>
											<th>Node type</th>
											<th>Title</th>
											<th />
											<th />
										</tr>
									</thead>
									<tbody class="!bg-white">
										{#each childrenNodes as node}
											<tr class="!border-b !border-b-secondary-100">
												<td>{node.Sequence}</td>
												<td>{node.NodeType}</td>
												<td>{Helper.truncateText(node.Title, 30)}</td>
												<td>
													<a
														href={editNodeRoute(node.id)}
														class="btn btn-icon-sm -my-1 hover:variant-soft-primary"
													>
														<Fa icon={faPencil} style="color-text-primary" size="md" />
													</a>
												</td>
												<td>
													<Confirm
														confirmTitle="Delete"
														cancelTitle="Cancel"
														let:confirm={confirmThis}
														on:delete={(e) => handleAssessmentNodeDelete(e, node.id)}
													>
														<button
															on:click|preventDefault={() =>
																confirmThis(handleAssessmentNodeDelete, node.id)}
															class="btn btn-icon-sm -my-1 hover:variant-soft-error"
														>
															<Fa icon={faTrash} />
														</button>
														<span slot="title"> Delete </span>
														<span slot="description">
															Are you sure you want to delete a child node?
														</span>
													</Confirm>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{/if}
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { scoringApplicableCondition } from '$lib/store/general.store';
	import { onMount } from 'svelte';
	import { TreeBranch, TreeLeaf, TreeView } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';
	import Icon from '$lib/components/icon.svelte';

	export let data: PageServerData;
	let assessmentNodes = data.assessmentNodes;
	let assessmentTemplate = data.assessmentTemplate;
	let title = assessmentTemplate.Title;
	let description = (assessmentTemplate.Description !== null && assessmentTemplate.Description !== "") ? assessmentTemplate.Description : 'Not specified';
	let displayCode = assessmentTemplate.DisplayCode;
	let type = assessmentTemplate.Type;
	let providerAssessmentCode = (assessmentTemplate.ProviderAssessmentCode !== null && assessmentTemplate.ProviderAssessmentCode !== "") ? assessmentTemplate.ProviderAssessmentCode : 'Not specified';;
	let serveListNodeChildrenAtOnce = assessmentTemplate.ServeListNodeChildrenAtOnce;
	let scoringApplicable = assessmentTemplate.ScoringApplicable;
	let provider = (assessmentTemplate.Provider !== null && assessmentTemplate.Provider !== "") ? assessmentTemplate.Provider : 'Not specified';;

	assessmentNodes = assessmentNodes.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});

	console.log('assessmentNodes', assessmentNodes);

	onMount(() => {
		scoringApplicableCondition.set(assessmentTemplate.ScoringApplicable);
		console.log('scoringApplicableCondition', $scoringApplicableCondition);
	});

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/view`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const nodeRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;
	const assessmentNodeView = (nodeId) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;

	const breadCrumbs = [
		{ name: 'Assessments', path: assessmentsRoutes },
		{ name: 'View', path: viewRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={nodeRoute} class="btn variant-filled-secondary ml-auto"> Add Assessment Node</a>
	<a href={editRoute} class="btn variant-filled-secondary w-22 h-10 px-0">
		<div class="flex items-center">
			<Icon
			cls="stroke-surface-100 stroke-2 fill-none"
			h="100%" w="100%" iconPath='/images/others/edit.svg#icon'/>
			<span class="pr-4">Edit</span>
		</div>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Assessment</th>
				<th class="text-end">
					<a href={assessmentsRoutes} class="btn px-0 w-8 h-8 variant-soft-secondary">
						<Icon
							cls="stroke-primary-500 stroke-2 fill-none"
							h="100%" w="100%" iconPath='/images/others/cancel.svg#icon'/>
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Display code</td>
				<td>{displayCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Provider</td>
				<td>{provider}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Provider Assessment Code</td>
				<td>{providerAssessmentCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Serve List Node Children At Once</td>
				<td>{serveListNodeChildrenAtOnce}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Scoring Applicable</td>
				<td>{scoringApplicable}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Nodes</td>
				<td>
					{#if assessmentNodes.length <= 1}
						<div>Nodes are not available</div>
					{:else}
						<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
							{#each assessmentNodes as node}
								{#if node.ParentNodeId === null}
									<TreeBranch rootContent={node.Title}>
										{#each node.Children as child}
											{#if child.NodeType === 'Node list' && child.ParentNodeId !== null}
												<TreeBranch defaultClosed>
													<div slot="root" class="flex gap-2 items-center">
														<Icon
															cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
															h="100%" w="100%" iconPath='/images/others/assessment-node/node-list.svg#icon'/>
														<!-- <img class="w-8 text-lg" src="/assets/images/other/assessment-node/node-list.png" alt="" /> -->
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div>
													{#each child.Children as kid}
														{#if kid.NodeType === 'Node list' && kid.ParentNodeId !== null}
															<TreeBranch defaultClosed>
																<div slot="root" class="flex gap-2 items-center">
																	<Icon
																		cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
																		h="100%" w="100%" iconPath='/images/others/assessment-node/node-list.svg#icon'/>
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div>
																{#each kid.Children as child}
																	{#if child.NodeType === 'Question'}
																		<TreeLeaf>
																			<div class="flex gap-2 items-center">
																				<Icon
																					cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
																					h="100%" w="100%" iconPath='/images/others/assessment-node/question.svg#icon'/>
																				<!-- <img class="w-8 text-lg" src="/assets/images/other/assessment-node/question.png" alt="" /> -->
																				<a href={assessmentNodeView(child.id)}>
																					{child.Sequence}-{child.NodeType}-{child.Title}
																				</a>
																			</div>
																		</TreeLeaf>
																	{:else if child.NodeType === 'Message'}
																		<TreeLeaf>
																			<div class="flex gap-2 items-center">
																				<Icon
																					cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
																					h="100%" w="100%" iconPath='/images/others/assessment-node/message.svg#icon'/>
																				<a href={assessmentNodeView(child.id)}>
																					{child.Sequence}-{child.NodeType}-{child.Title}
																				</a>
																			</div>
																		</TreeLeaf>
																	{/if}
																{/each}
															</TreeBranch>
														{:else if kid.NodeType === 'Question'}
															<TreeLeaf>
																<div class="flex gap-2 items-center">
																	<Icon
															cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
															h="100%" w="100%" iconPath='/images/others/assessment-node/question.svg#icon'/>
																	<!-- <img class="w-8 text-lg" src="/assets/images/other/assessment-node/question.png" alt="" /> -->
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div>
															</TreeLeaf>
														{:else}
															<TreeLeaf>
																<div class="flex gap-2 items-center">
																	<Icon
																		cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
																		h="100%" w="100%" iconPath='/images/others/assessment-node/question.svg#icon'/>
																	<!-- <img class="w-8 text-lg" src="/assets/images/other/assessment-node/question.png" alt="" /> -->
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div>
															</TreeLeaf>
														{/if}
													{/each}
												</TreeBranch>
											{:else if child.NodeType === 'Question'}
												<TreeLeaf>
													<div class="flex gap-2 items-center">
														<Icon
															cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
															h="100%" w="100%" iconPath='/images/others/assessment-node/question.svg#icon'/>
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div>
												</TreeLeaf>
											{:else if child.NodeType === 'Message'}
												<TreeLeaf>
													<div class="flex gap-2 items-center">
														<Icon
															cls="stroke-slate-800 stroke-black stroke-2 fill-none h-10"
															h="100%" w="100%" iconPath='/images/others/assessment-node/message.svg#icon'/>
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div>
												</TreeLeaf>
											{/if}
										{/each}
									</TreeBranch>
								{/if}
							{/each}
						</TreeView>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>

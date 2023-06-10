<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faMessage,
		faMultiply,
		faPen,
		faQuestionCircle,
		faShareNodes
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { TreeView, TreeBranch, TreeLeaf } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';
	import { scoringApplicableCondition } from '$lib/store/general.store';

	export let data: PageServerData;
	let assessmentNodes = data.assessmentNodes;
	let id = data.assessmentTemplate.id;
	let title = data.assessmentTemplate.Title;
	let description = data.assessmentTemplate.Description;
	let displayCode = data.assessmentTemplate.DisplayCode;
	let type = data.assessmentTemplate.Type;
	let providerAssessmentCode = data.assessmentTemplate.ProviderAssessmentCode;
	let serveListNodeChildrenAtOnce = data.assessmentTemplate.ServeListNodeChildrenAtOnce;
	let scoringApplicable = data.assessmentTemplate.ScoringApplicable;
	let provider = data.assessmentTemplate.Provider;

	assessmentNodes = assessmentNodes.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});

	console.log('assessmentNodes', assessmentNodes);

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
		scoringApplicableCondition.set(data.assessmentTemplate.ScoringApplicable);
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
		{
			name: 'Assessments',
			path: assessmentsRoutes
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a
		href={nodeRoute}
		class="btn variant-filled-secondary ml-auto"> Add Assessment Node</a
	>
	<a href={editRoute} class="btn variant-filled-secondary">
		<span><Fa icon={faPen} size="sm" /></span>
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Assessment</th>
				<th class="text-end">
					<a href={assessmentsRoutes} class="btn btn-icon-sm variant-soft-secondary">
						<Fa icon={faMultiply} size="lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Display code</td>
				<td>{displayCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Provider</td>
				<td>{provider}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Provider Assessment Code</td>
				<td>{providerAssessmentCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Serve List Node Children At Once</td>
				<td>{serveListNodeChildrenAtOnce}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Scoring Applicable</td>
				<td>{scoringApplicable}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
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
													<div slot="root" class="flex">
														<Fa icon={faShareNodes} size="lg" class="mr-2" />
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div>
													{#each child.Children as kid}
														{#if kid.NodeType === 'Node list' && kid.ParentNodeId !== null}
															<TreeBranch defaultClosed>
																<div slot="root" class="flex">
																	<Fa icon={faShareNodes} size="lg" class="mr-2" />
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div>
																{#each kid.Children as child}
																	{#if child.NodeType === 'Question'}
																		<TreeLeaf>
																			<div class="flex">
																				<Fa icon={faQuestionCircle} size="lg" class="mr-2" />
																				<a href={assessmentNodeView(child.id)}>
																					{child.Sequence}-{child.NodeType}-{child.Title}
																				</a>
																			</div>
																		</TreeLeaf>
																	{:else if child.NodeType === 'Message'}
																		<TreeLeaf>
																			<div class="flex">
																				<Fa icon={faMessage} size="lg" class="mr-2" />
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
																<div class="flex">
																	<Fa icon={faQuestionCircle} size="lg" class="mr-2" />
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div>
															</TreeLeaf>
														{:else}
															<TreeLeaf>
																<div class="flex">
																	<Fa icon={faMessage} size="lg" class="mr-2" />
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
													<div class="flex">
														<Fa icon={faQuestionCircle} size="lg" class="mr-2" />
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div>
												</TreeLeaf>
											{:else if child.NodeType === 'Message'}
												<TreeLeaf>
													<div class="flex">
														<Fa icon={faMessage} size="lg" class="mr-2" />
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

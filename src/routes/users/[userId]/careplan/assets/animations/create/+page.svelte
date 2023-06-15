<script lang="ts">
  import Tags from '$lib/components/tags.svelte';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';

  const userId = $page.params.userId;
  const assetRoute = `/users/${userId}/assets`;
  const createRoute = `/users/${userId}/assets/animations/create`;
  const animationRoute = `/users/${userId}/assets/animations/create`;
  let retrievedTags = '';
  let tagsPlaceholder = 'Enter a tags here...';

  function handleTags(event) {
    retrievedTags = event.detail.tags;
  }

  const breadCrumbs= [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Animation',
      path: animationRoute
    },
    {
      name: 'Create',
      path: createRoute
    },
   
  ]

</script>

<BreadCrumbs  crumbs={breadCrumbs}  />

<form
	method="post"
	action="?/createAnimation"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Animation</th>
				<th class="text-end">
					<a href={assetRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
			<tr class="!border-b !border-b-secondary-100">
				<td>Name *</td>
				<td>
          <input
          type="text"
          required
          placeholder="Enter action plan name here..."
          class="input"
          name="name"
        />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Transcript</td>
				<td>
          <textarea
          class="textarea"
          name="transcript"
          placeholder="Enter transcript here..."
        />
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Url</td>
				<td>
          <input
            type="url"
            placeholder="Enter url here..."
            class="input"
            name="pathUrl"
          />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Tags</td>
				<td>
          <Tags name="animationTags" placeholder={tagsPlaceholder} on:tags={handleTags} />
          <input type="hidden" name="tags" value={JSON.stringify(retrievedTags)} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Version</td>
				<td>
				  <input
           type="text"
            name="version"
            class="input"
            placeholder="V 1.0"
          />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
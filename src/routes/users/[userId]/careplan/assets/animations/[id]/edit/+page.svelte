<script lang="ts">
  import type { PageServerData } from './$types';
  import Tags from '$lib/components/tags.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';

/////////////////////////////////////////////////////////////////////

  const userId = $page.params.userId;
  const animationId = $page.params.id;
  const assetRoute = `/users/${userId}/assets`;
  const editRoute = `/users/${userId}/assets/animations/${animationId}/edit`;
  const viewRoute =  `/users/${userId}/assets/animations/${animationId}/view`;
  const animationRoute = `/users/${userId}/assets/animations/create`;

  export let data: PageServerData;
  let initialData = {};
  let assetCode = data.animation.AssetCode;
  let name = data.animation.Name;
  let transcript = data.animation.Transcript;
  let pathUrl = data.animation.Url;
  let tags = data.animation.Tags;
  let version = data.animation.Version;
  let retrievedTags = '';
  let tagsPlaceholder = 'Enter a tags here...';

  //Original data
  let _name = name;
  let _transcript = transcript;
  let _tags = JSON.stringify(tags);
  let _pathUrl = pathUrl;
  let _version = version;

  onMount(() => {
    initialData = data;
    console.log(data);
  });

  function handleTags(event) {
    retrievedTags = event.detail.tags;
  }

  function handleReset() {
    name = _name;
    transcript = _transcript;
    pathUrl = _pathUrl;
    tags = JSON.parse(_tags);
    version = _version;
  }

  const breadCrumbs = [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Animation',
      path: animationRoute
    },
    {
      name: 'Edit',
      path: editRoute
    }
  ];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateAnimation"
	class="table-container border border-secondary-100 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Animation</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white">
      <tr class="!border-b !border-b-secondary-100">
				<td>Asset Code</td>
				<td>{assetCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Name *</td>
				<td>
          <input
          type="text"
          required
          placeholder="Enter action plan name here..."
          class="input"
          name="name"
          bind:value={name}
        />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Transcript</td>
				<td>
          <textarea
          class="textarea textarea-primary w-full"
          placeholder="Enter animation transcript here..."
          bind:value={transcript}
          name="transcript"
        />
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100">
				<td class="align-top">Url</td>
				<td>
          <input
          type="url"
          required
          placeholder="Enter url here..."
          bind:value={pathUrl}
          class="input"
          name="pathUrl"
        />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100">
				<td>Tags</td>
				<td>
          <Tags name="Tags" placeholder={tagsPlaceholder} on:tags={handleTags} bind:tags />
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />
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
            bind:value={version}
          />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
    <button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
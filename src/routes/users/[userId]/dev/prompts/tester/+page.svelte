<script lang="ts">
  import { enhance } from '$app/forms';
import { page } from '$app/stores';
import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
import Icon from '@iconify/svelte';
import InputChip from '$lib/components/input-chips.svelte';
import { ProgressBar } from '@skeletonlabs/skeleton';

////////////////////////////////////////////////////////////////////////////////

export let form;
const userId = $page.params.userId;
const createRoute = `/users/${userId}/assessment-templates/create`;
const assessmentsRoutes = `/users/${userId}/assessment-templates`;

const breadCrumbs = [
  { name: 'Prompts', path: assessmentsRoutes },
  { name: 'Tester', path: createRoute }
];

let name = "Prompt name";
let model = "OpenAi GPT 3.5 Turbo";
let useCaseType = "Generation";
let group = "Chat Default";
let prompt = "Prompt data";
let variable = "Pro";

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createNotificationAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Prompt Tester</th>
				<th class="text-end">
					<a href={assessmentsRoutes} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td>Version</td>
        <td>1</td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>OpenAi GPT 3.5 Turbo</td>
				<td>{model}</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td class="align-top">Variables</td>
        <td>
          <!-- <textarea name="description" placeholder="Enter description here..." class="input" /> -->
        </td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td class="align-top">Question</td>
        <td>
          <textarea name="description" placeholder="Enter question here..." class="input" />
        </td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td class="align-top">Conversation Context</td>
        <td>
          <textarea name="description" placeholder="Enter conversation context here..." class="input" />
        </td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td class="align-top">QnA Document text</td>
        <td>
          <textarea name="description" placeholder="Enter qna document text here..." class="input" />
        </td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td class="align-top">Personlization Info</td>
        <td>
          <textarea name="description" placeholder="Enter personlization info here..." class="input" />
        </td>
      </tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
        <td></td>
        <td>
          <div class="flex flex-wrap p-2 justify-end gap-2">
        <button type="submit" class="btn variant-filled-secondary">Run Test</button>
      </div> 
      </td>
      </tr>  
		</tbody>
	</table>
  <div class="py-4 mx-auto flex flex-wrap justify-center">
    <td>
      <div class="text-center w-full">Test Summary</div>
    </td>
    </div>
    <div class="py-4 mx-10 flex flex-wrap justify-center">
      <textarea name="description" class="input w-[1050px]" disabled />
    </div>
    <div class=" mx-10 flex flex-wrap justify-center">
      <input type="text" name="description" class="input w-[1050px]" disabled />
    </div>
    <div class="py-4 mx-10 flex flex-wrap justify-center">
      <textarea name="description" class="input w-[1050px]" disabled />
    </div>
</form>

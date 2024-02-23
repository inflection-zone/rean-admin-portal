<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import InputChip from '$lib/components/input-chips.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';

    ////////////////////////////////////////////////////////////////////////////////

    let temperature = 0.95;
    let topP = 0.1;
    let frequency = 0.4;
    let presence = 0.56;

    function temperatureValue(event) {
        temperature = event.target.value;
    }
    function topPValue(event) {
        topP = event.target.value;
    }
    function frequencyValue(event) {
        frequency = event.target.value;
    }
    function presenceValue(event) {
        presence = event.target.value;
    }

    function getColorClass(temp) {
        if (temp >= 0 && temp < 0.25) {
            return 'bg-red-500';
        } else if (temp >= 0.25 && temp < 0.5) {
            return 'bg-yellow-500';
        } else if (temp >= 0.5 && temp < 0.75) {
            return 'bg-green-500';
        } else {
            return 'bg-blue-500';
        }
    }

    export let form;
    const userId = $page.params.userId;
    const createRoute = `/users/${userId}/assessment-templates/create`;
    const assessmentsRoutes = `/users/${userId}/assessment-templates`;

    const breadCrumbs = [
        { name: 'Prompts', path: assessmentsRoutes },
        { name: 'Edit', path: createRoute }
    ];

    let name = 'Prompt name';
    let description = 'Prompt description';
    let useCaseType = 'Generation';
    let group = 'Chat Default';
    let model = 'OpenAi GPT 3.5 Turbo';
    let prompt = 'Prompt data';
    let variable = 'You are mdical expert trained to give answers to the user only from the provided text {Question}';

    let _name = name;
    let _description = description;
    let _useCaseType = useCaseType;
    let _group = group;
    let _model = model;
    let _prompt = prompt;
    let _variable = variable;

    function handleReset() {
        name = _name;
        description = _description;
        useCaseType = _useCaseType;
        group = _group;
        model = _model;
        prompt = _prompt;
        variable = _variable;
    }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/updatePromptAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
    use:enhance
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Edit Prompt</th>
                <th class="text-end">
                    <a
                        href={assessmentsRoutes}
                        class="btn p-2 -my-2 variant-soft-secondary"
                    >
                        <Icon
                            icon="material-symbols:close-rounded"
                            class="text-lg"
                        />
                    </a>
                </th>
            </tr>
        </thead>
        <tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="title"
                        bind:value={name}
                        placeholder="Enter name here..."
                        class="input w-full {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
                    />
                    {#if form?.errors?.title}
                        <p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
                    {/if}
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Description *</td>
                <td>
                    <textarea
                        name="description"
                        placeholder="Enter description here..."
                        bind:value={description}
                        class="input"
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Version</td>
                <td>1</td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Use Case Type *</td>
                <td>
                    <select
                        class="select w-full"
                        name="type"
                        bind:value={useCaseType}
                        placeholder="Select type here..."
                    >
                        <option>Chat</option>
                        <option>Classification</option>
                        <option>Extraction</option>
                        <option>Ideation</option>
                        <option>Summarization</option>
                        <option>Generation</option>
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Group *</td>
                <td>
                    <select
                        class="select w-full"
                        name="type"
                        bind:value={group}
                        placeholder="Select type here..."
                    >
                        <option>Chat Default</option>
                        <option />
                        <option />
                        <option />
                        <option />
                        <option />
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Model *</td>
                <td>
                    <select
                        class="select w-full"
                        name="type"
                        bind:value={model}
                        placeholder="Select type here..."
                    >
                        <option>OpenAi GPT 3.5 Turbo</option>
                        <option />
                        <option />
                        <option />
                        <option />
                        <option />
                    </select>
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Prompt *</td>
                <td>
                    <textarea
                        name="description"
                        placeholder="Enter prompt here..."
                        bind:value={prompt}
                        class="input"
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Variables</td>
                <td>
                  <p 
                  class="btn variant-ghost-secondary mr-4 mt-1">Question</p
              >
              <p                      
                  class="btn variant-ghost-secondary mr-4 mt-1">ConversationContext</p
              >
              <p                       
                  class="btn variant-ghost-secondary mr-4 mt-1">QnADocumentText</p
              >
              <p                       
                  class="btn variant-ghost-secondary mt-1">PersonalizationInfo</p
              >
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 gap-20">
              <td class="py-4">Temperature</td>
              <td class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="w-64 relative">
                        <div
                                class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(temperature)}"
                                style="width: {temperature * 100}%"
                            />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                bind:value={temperature}
                                on:input={temperatureValue}
                            />
                            <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                {temperature}
                            </span>
                    </div>

                      <div class="flex items-center gap-20 space-x-4">
                          <td class="py-4">Top P</td>
                          <div class="w-64 relative">
                            <div class="">
                                <div
                                        class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(topP)}"
                                        style="width: {topP * 100}%"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                        bind:value={topP}
                                        on:input={topPValue}
                                    />
                                    <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                        {topP}
                                    </span>
                            </div>
                      </div>
                  </div>
              </td>
          </tr>

          <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 gap-20">
              <td class="py-4">Frequency Penalty</td>
              <td class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="w-64 relative">
                        <div
                        class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(frequency)}"
                        style="width: {frequency * 100}%"
                    />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                        bind:value={frequency}
                        on:input={frequencyValue}
                    />
                    <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                        {frequency}
                    </span>
                    </div>

                      <div class="flex items-center space-x-4">
                          <td class="py-4">Presence Penalty</td>
                          <div class="w-64 relative">
                            <div
                                    class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(presence)}"
                                    style="width: {presence * 100}%"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                    bind:value={presence}
                                    on:input={presenceValue}
                                />
                                <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                    {presence}
                                </span>
                        </div>
                      </div>
                  </div>
              </td>
          </tr>
        </tbody>
    </table>
    <div class="flex flex-wrap p-2 justify-end gap-2">
        <button
            type="button"
            on:click={handleReset}
            class="btn variant-soft-secondary">Reset</button
        >
        <button
            type="submit"
            class="btn variant-filled-secondary">Submit</button
        >
    </div>
</form>

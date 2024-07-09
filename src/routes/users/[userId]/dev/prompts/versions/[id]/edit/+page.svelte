<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import Icon from '@iconify/svelte';
    import type { PageServerData } from './$types';

    ////////////////////////////////////////////////////////////////////////////////

    export let data: PageServerData;
    let versions = data.versions;
    let id = versions.id;
    let name = versions.Name;
    let description = versions.Description;
    let useCaseType = versions.UseCaseType;
    let group = versions.Group;
    let model = versions.Model;
    let prompt = versions.Prompt;
    let variable = versions.Variables;
    let createdByUserId = versions.CreatedByUserId;
    let temperature = versions.Temperature;
    let frequencyPenalty = versions.FrequencyPenalty;
    let topP = versions.TopP;
    let presencePenalty = versions.PresencePenalty;
    let isActive = versions.IsActive;

    function updateVariables() {
        const regex = /\{(.*?)\}/g;
        let matches = [];
        let match;

        while ((match = regex.exec(prompt)) !== null) {
            matches.push(match[1]);
        }

        variable = matches;
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
    const createRoute = `/users/${userId}/dev/prompts/versions/create`;
    const versionsRoutes = `/users/${userId}/dev/prompts/versions`;

    const breadCrumbs = [
        { name: 'Versions', path: versionsRoutes },
        { name: 'Edit', path: createRoute }
    ];

    let _name = name;
    let _description = description;
    let _useCaseType = useCaseType;
    let _group = group;
    let _model = model;
    let _prompt = prompt;
    let _variable = variable;
    let _createdByUserId = createdByUserId;
    let _temperature = temperature;
    let _frequencyPenalty = frequencyPenalty;
    let _topP = topP;
    let _presencePenalty = presencePenalty;
    let _isActive = isActive;

    function handleReset() {
        name = _name;
        description = _description;
        useCaseType = _useCaseType;
        group = _group;
        model = _model;
        prompt = _prompt;
        variable = _variable;
        createdByUserId = _createdByUserId;
        temperature = _temperature;
        frequencyPenalty = _frequencyPenalty;
        topP = _topP;
        presencePenalty = _presencePenalty;
        isActive = _isActive;
    }
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
    method="post"
    action="?/updateVersionsAction"
    class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
    use:enhance
>
    <table class="table">
        <thead class="!variant-soft-secondary">
            <tr>
                <th>Edit Versions</th>
                <th class="text-end">
                    <a
                        href={versionsRoutes}
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
        <tbody class="!bg-white dark:!bg-inherit" /><tbody class="!bg-white dark:!bg-inherit">
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td>Name *</td>
                <td>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter name here..."
                        class="input w-full "
                        bind:value={name}
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Description *</td>
                <td>
                    <textarea
                        name="description"
                        required
                        placeholder="Enter description here..."
                        class="input"
                        bind:value={description}
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
                        required
                        name="useCaseType"
                        bind:value={useCaseType}
                        placeholder="Select type here..."
                    >
                        <option>Chat</option>
                        <option>Classification</option>
                        <option>Extraction</option>
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
                        required
                        name="group"
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
                        required
                        name="model"
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
                        name="prompt"
                        bind:value={prompt}
                        required
                        placeholder="Enter prompt here..."
                        class="input"
                        on:input={updateVariables}
                    />
                </td>
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
                <td class="align-top">Variables</td>
                <td class="">
                    <div class="variables-container">
                        <textarea
                            name="variable"
                            bind:value={variable}
                            class="input"
                            on:input={updateVariables}
                        />
                    </div>
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
                                name="temperature"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                bind:value={temperature}
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
                                        name="topP"
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                        bind:value={topP}
                                    />
                                    <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                        {topP}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div></td
                >
            </tr>
            <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 gap-20">
                <td class="py-4">Frequency Penalty</td>
                <td class="py-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-64 relative">
                            <div
                                class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(
                                    frequencyPenalty
                                )}"
                                style="width: {frequencyPenalty * 100}%"
                            />
                            <input
                                name="frequencyPenalty"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                bind:value={frequencyPenalty}
                            />
                            <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                {frequencyPenalty}
                            </span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <td class="py-4">Presence Penalty</td>
                            <div class="w-64 relative">
                                <div
                                    class="h-2 absolute rounded-full left-0 top-2 bottom-0 {getColorClass(
                                        presencePenalty
                                    )}"
                                    style="width: {presencePenalty * 100}%"
                                />
                                <input
                                    name="presencePenalty"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    class="w-[270px] appearance-none rounded-full h-2 transition-all duration-500 ease-in-out bg-gray-200"
                                    bind:value={presencePenalty}
                                />
                                <span class="absolute bottom-0 left-0 right-0 text-center mb-4">
                                    {presencePenalty}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex flex-wrap p-2 justify-end gap-2">
        <button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>

        <button
            type="submit"
            class="btn variant-filled-secondary">Save as New Version</button
        >
    </div>
</form>

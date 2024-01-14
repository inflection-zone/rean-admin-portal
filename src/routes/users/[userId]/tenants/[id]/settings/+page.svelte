<script lang="ts">
    import Form from '$lib/components/tenant-settings/forms.svelte';
    import PatientApp from '$lib/components/tenant-settings/patient-app.svelte';
    import ChatBot from '$lib/components/tenant-settings/chat-bot.svelte';
    import CommonSetting from '$lib/components/tenant-settings/common-setting.svelte';
    import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import type { PageServerData } from './$types';
    import { bubble } from 'svelte/internal';

    /////////////////////////////////////////////////////////////////////////
    $:integrationSettings = {
            PatientInterface: false,
            ChatBotInterface: false,
            FormsInterface: false
        }
    
    const userId = $page.params.userId;
	const tenantId = $page.params.id;
    const viewRoute = `/users/${userId}/tenants/${tenantId}/view`;
	const tenantRoute = `/users/${userId}/tenants`;

	const breadCrumbs = [
		{
			name: 'Tenants',
			path: tenantRoute
		},
		{
			name: 'Settings',
			path: viewRoute
		}
	];
    let disabled = false;
    console.log('$page param:',$page.params)
    const id = $page.params.id;
    // const userId = $page.params.userId;
    export let data: PageServerData;
    $:createSetting = data.tenantSettingId ? 0 : 1;
    console.log('Data',data);
    const tenantSetting = data.settings;
    console.log('Tenant Setting = ',tenantSetting)
    const integrations = [];
    let isPatientAppChecked = false;
    let isChatbotChecked = false;
    let isFormsChecked = false;
    if (data.settings) {
        isPatientAppChecked = data.settings.Integrations.PatientInterface,
        isChatbotChecked = data.settings.Integrations.ChatBotInterface,
        isFormsChecked = data.settings.Integrations.FormsInterface
        disabled = true;
    }
    let submit;
    let index = -1;
    $: initial = true;
    $: chatBotSetting = false;
    $: commonSetting = false;
    $: patientAppSetting = false;
    $: formSetting = false;
    function goToNextSetting(index) {
        if (index === -1) {
            initial = false;
            commonSetting = true;
        }
        if (index === 0) {
            commonSetting = false;
            patientAppSetting = true;
        }
        if (index === 1) {
            commonSetting = false;
            patientAppSetting = false;
            chatBotSetting = true;
        }
        if (index === 2) {
            commonSetting = false;
            patientAppSetting = false;
            chatBotSetting = false;
            formSetting = true;
        }
    }
    function setIntegrationOptions() {
       let submitCount = 0;
        if (isPatientAppChecked) {
            submitCount +=1;
        }
        if (isChatbotChecked) {
            submitCount +=1;
        }
        if (isFormsChecked) {
            submitCount +=1;
        }
        submit = submitCount
        integrations.push(isPatientAppChecked);
        integrations.push(isChatbotChecked);
        integrations.push(isFormsChecked);
        console.log('PatientApp -',isPatientAppChecked)
        console.log('ChatbotApp -',isChatbotChecked)
        console.log('FormsApp -',isFormsChecked)
    }
    async function handleCreateTenantSettings() {
        const tenantId = id;
        const settings = {
        Integrations: {
            PatientInterface: true,
            ChatBotInterface: false,
            FormsInterface: false
        },
        Common: {
            VitalAndLabRecords: true,
            Nutrition:false,
            MedicationManagement:false,
            Reminders:false,
            ScheduledAssesments:false,
            ExcerciseAndFitness:false,
            FHIRResourceStorage:false,
            Careplans: {
                Default:false,
                Custom:false
            },
            EHIRIntegrations:false,
            ABDMIntegrations:false,
            DocumentManagement:false
        },
        PatientInterface: {
            GamificationAndAwards:false,
            CoursesAndLearningJourneys:false,
            CommunityAndUserGroups:false,
            AppointmentsAndVisits:false,
            DeviceIntegration: {
                Terra:false,
                SenseSemi:false
            },
            PatientReports: {
                Default:false,
                Custom:false
            }
        },
        ChatBotInterface: {
            FAQ: {
                Default:false,
               Custom:false
            },
            Integrations: {
                ClickUp:false,
               Slack:false
            },
            WhatsApp:false,
           Telegram:false,
           QuicksightDashboard:false,
           ChatPersonalization:false,
           CustomUserDBQueries:false,
           LocationContextualQueries:false,
           LocalizationSupport:false
        },
        FormsInterface: {
            Integrations: {
                KoboToolbox:false,
                ODK:false,
                GoogleForm:false
            },
            OfflineSupport:false,
            FieldApp:false
        }
    }
    settings.Integrations.PatientInterface = isPatientAppChecked,
    settings.Integrations.ChatBotInterface = isChatbotChecked,
    settings.Integrations.FormsInterface = isFormsChecked,

		await Create({
			sessionId: data.sessionId,
			tenantId,
            settings
		});
        goto(`/users/${userId}/tenants/${id}/view`)
    }

    async function handleUpdateTenantSettings() {
        console.log('handledUpdateTenantSettings() get called.....');
        const tenantSettingId = data.tenantSettingId;
        const settings = {
        Integrations: {
            PatientInterface: true,
            ChatBotInterface: false,
            FormsInterface: false
        },
        Common: {
            VitalAndLabRecords: true,
            Nutrition:false,
            MedicationManagement:false,
            Reminders:false,
            ScheduledAssesments:false,
            ExcerciseAndFitness:false,
            FHIRResourceStorage:false,
            Careplans: {
                Default:false,
                Custom:false
            },
            EHIRIntegrations:false,
            ABDMIntegrations:false,
            DocumentManagement:false
        },
        PatientInterface: {
            GamificationAndAwards:false,
            CoursesAndLearningJourneys:false,
            CommunityAndUserGroups:false,
            AppointmentsAndVisits:false,
            DeviceIntegration: {
                Terra:false,
                SenseSemi:false
            },
            PatientReports: {
                Default:false,
                Custom:false
            }
        },
        ChatBotInterface: {
            FAQ: {
                Default:false,
               Custom:false
            },
            Integrations: {
                ClickUp:false,
               Slack:false
            },
            WhatsApp:false,
           Telegram:false,
           QuicksightDashboard:false,
           ChatPersonalization:false,
           CustomUserDBQueries:false,
           LocationContextualQueries:false,
           LocalizationSupport:false
        },
        FormsInterface: {
            Integrations: {
                KoboToolbox:false,
                ODK:false,
                GoogleForm:false
            },
            OfflineSupport:false,
            FieldApp:false
        }
    }
    settings.Integrations.PatientInterface = isPatientAppChecked,
    settings.Integrations.ChatBotInterface = isChatbotChecked,
    settings.Integrations.FormsInterface = isFormsChecked,
    console.log('Updated Settings ',settings)
		await Update({
			sessionId: data.sessionId,
			tenantSettingId,
            settings
		});
        goto(`/users/${userId}/tenants/${id}/view`)
    }

    async function Create(model) {
        console.log('Model',model)
		await fetch(`/api/server/tenant-settings/create?userId=${userId}`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

    async function Update(model) {
        console.log('Model',model)
		await fetch(`/api/server/tenant-settings/update?userId=${userId}`, {
			method: 'PUT',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

</script>
<BreadCrumbs crumbs={breadCrumbs} />
<div class="flex w-full flex-wrap justify-end gap-2 mb-2">
    <button class="btn variant-filled-secondary" on:click={() => {
        disabled = false
    }}>
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
    </button>
</div>

<div>
{#if initial}
<table contenteditable = "false" class="table">
    <thead class="!variant-soft-secondary">
        <tr>
            <th>Integrations</th>
        </tr>
    </thead>
    <tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1183px]">
        <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                <input
                    type="checkbox"
                    name="patientApp"
                    disabled = {disabled}
                    bind:checked={isPatientAppChecked}
                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                    />
            </td>
            <td class="ml-4">Patient App</td>
        </tr>
        <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                <input
                    type="checkbox"
                    name="chatBot"
                    disabled = {disabled}
                    bind:checked={isChatbotChecked}
                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                />
            </td>
            <td class="ml-4">Chat bot</td>
        </tr>
        <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                <input
                    type="checkbox"
                    name="form"
                    disabled = {disabled}
                    bind:checked={isFormsChecked}
                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                />
            </td>
            <td class="ml-4">Forms</td>
        </tr>
    </tbody>
</table>
{/if}
{#if commonSetting}
    <CommonSetting/>
{/if}
{#if patientAppSetting}
    <PatientApp/>
{/if}
{#if chatBotSetting}
    <ChatBot/>
{/if}
{#if formSetting}
    <Form/>
{/if}
</div>
<div class="flex p-2 justify-end">
    <button class="btn variant-filled-secondary" disabled={ isPatientAppChecked ? false :(isChatbotChecked ? false :(isFormsChecked ? false :true))} on:click={()=>{
        if (initial === true){
            setIntegrationOptions();
        }
        if (index === -1){
            goToNextSetting(index);
            index += 1;
        }else {
            if (integrations[0]) {
                goToNextSetting(0);
                integrations[0] = false;
                submit -=1;
            } else if (integrations[1]) {
                goToNextSetting(1);
                integrations[1] = false;
                submit -=1;
            } else if (integrations[2]) {
                goToNextSetting(2);
                integrations[2] = false;
                submit -=1;
            }else {
                if (!createSetting) {
                    handleUpdateTenantSettings()
                } else {
                    handleCreateTenantSettings()
                }
            }
        }
    }}>{submit === 0 ? !createSetting ? "Update" : "Submit" : "Next"}</button>
</div>



<!-- <script lang="ts">
    import Form from '$lib/components/tenant-settings/forms.svelte';
    import PatientApp from '$lib/components/tenant-settings/patient-app.svelte';
    import ChatBot from '$lib/components/tenant-settings/chat-bot.svelte';
    import CommonSetting from '$lib/components/tenant-settings/common-setting.svelte';
    import { page } from '$app/stores';
    import { goto, invalidateAll } from '$app/navigation';
    import type { PageServerData } from './$types';

    /////////////////////////////////////////////////////////////////////////
    console.log('$page param:',$page.params)
    const id = $page.params.id;
    const userId = $page.params.userId;
    export let data: PageServerData;
    $:createSetting = data.tenantSettingId ? 0 : 1;
    console.log('Data',data);
    const tenantSetting = data.settings;
    console.log('Tenant Setting = ',tenantSetting)
    const integrations = [];
    let isPatientAppChecked = false;
    let isChatbotChecked = false;
    let isFormsChecked = false;
    let submit;
    let index = -1;
    $: initial = true;
    $: chatBotSetting = false;
    $: commonSetting = false;
    $: patientAppSetting = false;
    $: formSetting = false;
    function goToNextSetting(index) {
        if (index === -1) {
            initial = false;
            commonSetting = true;
        }
        if (index === 0) {
            commonSetting = false;
            patientAppSetting = true;
        }
        if (index === 1) {
            commonSetting = false;
            patientAppSetting = false;
            chatBotSetting = true;
        }
        if (index === 2) {
            commonSetting = false;
            patientAppSetting = false;
            chatBotSetting = false;
            formSetting = true;
        }
    }
    function setIntegrationOptions() {
       let submitCount = 0;
        if (isPatientAppChecked) {
            submitCount +=1;
        }
        if (isChatbotChecked) {
            submitCount +=1;
        }
        if (isFormsChecked) {
            submitCount +=1;
        }
        submit = submitCount
        integrations.push(isPatientAppChecked);
        integrations.push(isChatbotChecked);
        integrations.push(isFormsChecked);
        console.log('PatientApp -',isPatientAppChecked)
        console.log('ChatbotApp -',isChatbotChecked)
        console.log('FormsApp -',isFormsChecked)
    }
    async function handleCreateTenantSettings() {
        const tenantId = id;
        const settings = {
        Integrations: {
            PatientInterface: true,
            ChatBotInterface: false,
            FormsInterface: false
        },
        Common: {
            VitalAndLabRecords: true,
            Nutrition:false,
            MedicationManagement:false,
            Reminders:false,
            ScheduledAssesments:false,
            ExcerciseAndFitness:false,
            FHIRResourceStorage:false,
            Careplans: {
                Default:false,
                Custom:false
            },
            EHIRIntegrations:false,
            ABDMIntegrations:false,
            DocumentManagement:false
        },
        PatientInterface: {
            GamificationAndAwards:false,
            CoursesAndLearningJourneys:false,
            CommunityAndUserGroups:false,
            AppointmentsAndVisits:false,
            DeviceIntegration: {
                Terra:false,
                SenseSemi:false
            },
            PatientReports: {
                Default:false,
                Custom:false
            }
        },
        ChatBotInterface: {
            FAQ: {
                Default:false,
               Custom:false
            },
            Integrations: {
                ClickUp:false,
               Slack:false
            },
            WhatsApp:false,
           Telegram:false,
           QuicksightDashboard:false,
           ChatPersonalization:false,
           CustomUserDBQueries:false,
           LocationContextualQueries:false,
           LocalizationSupport:false
        },
        FormsInterface: {
            Integrations: {
                KoboToolbox:false,
                ODK:false,
                GoogleForm:false
            },
            OfflineSupport:false,
            FieldApp:false
        }
    }
		await Create({
			sessionId: data.sessionId,
			tenantId,
            settings
		});
        goto(`/users/${userId}/tenants/${id}/view`)
    }

    async function handleUpdateTenantSettings() {
        console.log('handledUpdateTenantSettings() get called.....');
        const tenantSettingId = data.tenantSettingId;
        const settings = {
        Integrations: {
            PatientInterface: true,
            ChatBotInterface: false,
            FormsInterface: false
        },
        Common: {
            VitalAndLabRecords: true,
            Nutrition:false,
            MedicationManagement:false,
            Reminders:false,
            ScheduledAssesments:false,
            ExcerciseAndFitness:false,
            FHIRResourceStorage:false,
            Careplans: {
                Default:false,
                Custom:false
            },
            EHIRIntegrations:false,
            ABDMIntegrations:false,
            DocumentManagement:false
        },
        PatientInterface: {
            GamificationAndAwards:false,
            CoursesAndLearningJourneys:false,
            CommunityAndUserGroups:false,
            AppointmentsAndVisits:false,
            DeviceIntegration: {
                Terra:false,
                SenseSemi:false
            },
            PatientReports: {
                Default:false,
                Custom:false
            }
        },
        ChatBotInterface: {
            FAQ: {
                Default:false,
               Custom:false
            },
            Integrations: {
                ClickUp:false,
               Slack:false
            },
            WhatsApp:false,
           Telegram:false,
           QuicksightDashboard:false,
           ChatPersonalization:false,
           CustomUserDBQueries:false,
           LocationContextualQueries:false,
           LocalizationSupport:false
        },
        FormsInterface: {
            Integrations: {
                KoboToolbox:false,
                ODK:false,
                GoogleForm:false
            },
            OfflineSupport:false,
            FieldApp:false
        }
    }
		await Update({
			sessionId: data.sessionId,
			tenantSettingId,
            settings
		});
        goto(`/users/${userId}/tenants/${id}/view`)
    }

    async function Create(model) {
        console.log('Model',model)
		await fetch(`/api/server/tenant-settings/create?userId=${userId}`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

    async function Update(model) {
        console.log('Model',model)
		await fetch(`/api/server/tenant-settings/update?userId=${userId}`, {
			method: 'PUT',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

</script>
<div>
{#if initial}
<table class="table">
    <thead class="!variant-soft-secondary">
        <tr>
            <th>Integrations</th>
        </tr>
    </thead>
    <tbody class="!bg-white dark:!bg-inherit flex flex-col w-[1183px]">
        <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                <input
                    type="checkbox"
                    name="patientApp"
                    bind:checked={isPatientAppChecked}
                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                    />
            </td>
            <td class="ml-4">Patient App</td>
        </tr>
        <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                <input
                    type="checkbox"
                    name="chatBot"
                    bind:checked={isChatbotChecked}
                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                />
            </td>
            <td class="ml-4">Chat bot</td>
        </tr>
        <tr class="!bg-white !border-b !border-b-secondary-100 dark:!border-b-surface-700">
            <td>
                <input
                    type="checkbox"
                    name="form"
                    bind:checked={isFormsChecked}
                    class="ml-10 checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md"
                />
            </td>
            <td class="ml-4">Forms</td>
        </tr>
    </tbody>
</table>
{/if}
{#if commonSetting}
    <CommonSetting/>
{/if}
{#if patientAppSetting}
    <PatientApp/>
{/if}
{#if chatBotSetting}
    <ChatBot/>
{/if}
{#if formSetting}
    <Form/>
{/if}
</div>
<div class="flex p-2 justify-end">
    <button class="btn variant-filled-secondary" disabled={ isPatientAppChecked ? false :(isChatbotChecked ? false :(isFormsChecked ? false :true))} on:click={()=>{
        if (initial === true){
            setIntegrationOptions();
        }
        if (index === -1){
            goToNextSetting(index);
            index += 1;
        }else {
            if (integrations[0]) {
                goToNextSetting(0);
                integrations[0] = false;
                submit -=1;
            } else if (integrations[1]) {
                goToNextSetting(1);
                integrations[1] = false;
                submit -=1;
            } else if (integrations[2]) {
                goToNextSetting(2);
                integrations[2] = false;
                submit -=1;
            }else {
                if (!createSetting) {
                    handleUpdateTenantSettings()
                } else {
                    handleCreateTenantSettings()
                }
            }
        }
    }}>{submit === 0 ? !createSetting ? "Update" : "Submit" : "Next"}</button>
</div> -->

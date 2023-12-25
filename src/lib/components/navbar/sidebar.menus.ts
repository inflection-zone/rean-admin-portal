import { FeatureOptions } from "$lib/system.types";
import { getFeatureOptions } from '$lib/options/options.selector';

///////////////////////////////////////////////////////////////////////////////

export interface SidebarMenu {
    name     : string;
    title    : string;
    icon     : string;
    link    ?: string | null | undefined;
    children?: SidebarMenu[];
}

///////////////////////////////////////////////////////////////////////////////

export const getMenuList = (userId: string): SidebarMenu[] => {

    const menuList: SidebarMenu[] = [];

    const dashbord: SidebarMenu = {
        name    : 'Main-Dashboard',
        title   : 'Dashboard',
        icon    : 'material-symbols:dashboard-outline-rounded',
        link    : `/users/${userId}/home`,
        children: []
    };
    menuList.push(dashbord);

    //................................................................

    const administration: SidebarMenu = {
        name    : 'Administration',
        title   : 'Administration',
        icon    : 'material-symbols:security-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(administration);

    const client: SidebarMenu = {
        name    : 'Clients',
        title   : 'Clients',
        icon    : 'material-symbols:frame-person-outline-rounded',
        link    : `/users/${userId}/api-clients`,
        children: []
    };
    menuList.push(client);

    const tenant: SidebarMenu = {
        name    : 'Tenants',
        title   : 'Tenants',
        icon    : 'material-symbols:tenancy-outline',
        link    : `/users/${userId}/tenants`,
        children: []
    };
    menuList.push(tenant);

    const personRole: SidebarMenu = {
        name    : 'Person-Role',
        title   : 'Person Role',
        icon    : 'material-symbols:person-search-outline-rounded',
        link    : `/users/${userId}/person-role-types`,
        children: []
    };
    menuList.push(personRole);

    //................................................................

    const analysis: SidebarMenu = {
        name    : 'Analysis',
        title   : 'Analysis',
        icon    : 'material-symbols:analytics-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(analysis);

    const customQuery: SidebarMenu = {
        name    : 'Custom-Queries',
        title   : 'Custom Queries',
        icon    : 'material-symbols:database-outline',
        link    : `/users/${userId}/custom-queries`,
        children: []
    };
    menuList.push(customQuery);

    //................................................................

    const hospitalSystems: SidebarMenu = {
        name    : 'Hospital-Systems',
        title   : 'Hospital Systems',
        icon    : 'material-symbols:account-tree-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(hospitalSystems);

    const hospital: SidebarMenu = {
        name    : 'Hospitals',
        title   : 'Hospitals',
        icon    : 'material-symbols:local-hospital-outline-rounded',
        link    : `/users/${userId}/hospitals`,
        children: []
    };
    menuList.push(hospital);

    const healthSystem: SidebarMenu = {
        name    : 'Health-Systems',
        title   : 'Health Systems',
        icon    : 'material-symbols:health-and-safety-outline-rounded',
        link    : `/users/${userId}/health-systems`,
        children: []
    };
    menuList.push(healthSystem);

    //................................................................

    const clinical: SidebarMenu = {
        name    : 'Clinical',
        title   : 'Clinical',
        icon    : 'material-symbols:medical-services-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(clinical);

    const assessment: SidebarMenu = {
        name    : 'Assessments',
        title   : 'Assessments',
        icon    : 'material-symbols:assignment-outline-rounded',
        link    : `/users/${userId}/assessment-templates`,
        children: []
    };
    menuList.push(assessment);

    const labRecordType: SidebarMenu = {
        name    : 'Lab-Records',
        title   : 'Lab-Records',
        icon    : 'material-symbols:lab-research-outline-rounded',
        link    : `/users/${userId}/lab-record-types`,
        children: []
    };
    menuList.push(labRecordType);

    const symptom: SidebarMenu = {
        name    : 'Symptoms',
        title   : 'Symptoms',
        icon    : 'material-symbols:symptoms-outline',
        link    : `/users/${userId}/symptoms`,
        children: []
    };
    menuList.push(symptom);

    const drug: SidebarMenu = {
        name    : 'Drugs',
        title   : 'Drugs',
        icon    : 'material-symbols:pill-outline',
        link    : `/users/${userId}/drugs`,
        children: []
    };
    menuList.push(drug);

    //................................................................

    const careplan: SidebarMenu = {
        name    : 'Careplan',
        title   : 'Careplan',
        icon    : 'material-symbols:home-health-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(careplan);

    const careplanDashboard: SidebarMenu = {
        name    : 'Careplan-Dashboard',
        title   : 'Dashboard',
        icon    : 'material-symbols:dashboard-outline-rounded',
        link    : `/users/${userId}/careplan`,
        children: []
    };
    menuList.push(careplanDashboard);

    const careplanAssets: SidebarMenu = {
        name    : 'Careplan-Assets',
        title   : 'Assets',
        icon    : 'carbon:task-asset-view',
        link    : `/users/${userId}/careplan/assets`,
        children: []
    };
    menuList.push(careplanAssets);

    const careplanPlans: SidebarMenu = {
        name    : 'Careplan-Plans',
        title   : 'Careplans',
        icon    : 'iconoir:healthcare',
        link    : `/users/${userId}/careplan/careplans`,
        children: []
    };
    menuList.push(careplanPlans);

    const careplanEnrollments: SidebarMenu = {
        name    : 'Careplan-Enrollments',
        title   : 'Enrollments',
        icon    : 'material-symbols:check-box-outline-rounded',
        link    : `/users/${userId}/careplan/enrollments`,
        children: []
    };
    menuList.push(careplanEnrollments);

    //................................................................

    const educational: SidebarMenu = {
        name    : 'Educational',
        title   : 'Educational',
        icon    : 'material-symbols:school-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(educational);

    const course: SidebarMenu = {
        name    : 'Courses',
        title   : 'Courses',
        icon    : 'material-symbols:abc-rounded',
        link    : `/users/${userId}/courses`,
        children: []
    };
    menuList.push(course);

    const learningJourney: SidebarMenu = {
        name    : 'Learning-Journeys',
        title   : 'Learning Journeys',
        icon    : 'material-symbols:local-library-outline-rounded',
        link    : `/users/${userId}/learning-journeys`,
        children: []
    };
    menuList.push(learningJourney);

    const knowledgeNugget: SidebarMenu = {
        name    : 'Knowledge-Nuggets',
        title   : 'Knowledge Nuggets',
        icon    : 'material-symbols:assignment-add-outline-rounded',
        link    : `/users/${userId}/knowledge-nuggets`,
        children: []
    };
    menuList.push(knowledgeNugget);

    //................................................................

    const types: SidebarMenu = {
        name    : 'Types',
        title   : 'Types',
        icon    : 'material-symbols:account-tree-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(types);

    const priority: SidebarMenu = {
        name    : 'Priorities',
        title   : 'Priorities',
        icon    : 'material-symbols:priority-outline',
        link    : `/users/${userId}/priorities`,
        children: []
    };
    menuList.push(priority);

    const goal: SidebarMenu = {
        name    : 'Goals',
        title   : 'Goals',
        icon    : 'material-symbols:radar',
        link    : `/users/${userId}/goals`,
        children: []
    };
    menuList.push(goal);

    //................................................................

    const miscellaneous: SidebarMenu = {
        name    : 'Miscellaneous',
        title   : 'Miscellaneous',
        icon    : 'material-symbols:home-max-dots-outline',
        link    : null,
        children: []
    };
    menuList.push(miscellaneous);

    const organization: SidebarMenu = {
        name    : 'Organizations',
        title   : 'Organizations',
        icon    : 'material-symbols:corporate-fare-rounded',
        link    : `/users/${userId}/organizations`,
        children: []
    };
    menuList.push(organization);

    const cohort: SidebarMenu = {
        name    : 'Cohorts',
        title   : 'Cohorts',
        icon    : 'material-symbols:groups-outline-rounded',
        link    : `/users/${userId}/cohorts`,
        children: []
    };
    menuList.push(cohort);

    const notification: SidebarMenu = {
        name    : 'Notifications',
        title   : 'Notifications',
        icon    : 'material-symbols:notifications-outline-rounded',
        link    : `/users/${userId}/notifications`,
        children: []
    };
    menuList.push(notification);

    const notice: SidebarMenu = {
        name    : 'Notices',
        title   : 'Notices',
        icon    : 'material-symbols:release-alert-outline-rounded',
        link    : `/users/${userId}/notices`,
        children: []
    };
    menuList.push(notice);

    const newsFeed: SidebarMenu = {
        name    : 'Newsfeeds',
        title   : 'News Feeds',
        icon    : 'material-symbols:newsmode-outline-rounded',
        link    : `/users/${userId}/newsfeeds`,
        children: []
    };
    menuList.push(newsFeed);

    //................................................................

    const gamification: SidebarMenu = {
        name    : 'Gamification',
        title   : 'Gamification',
        icon    : 'simple-icons:gamedeveloper',
        link    : null,
        children: []
    };
    menuList.push(gamification);

    const eventType: SidebarMenu = {
        name    : 'Gamification-Event-Types',
        title   : 'Event Types',
        icon    : 'mdi:event-edit',
        link    : `/users/${userId}/gamification/event-types`,
        children: []
    };
    menuList.push(eventType);

    const badgeCategory: SidebarMenu = {
        name    : 'Gamification-Badge-Categories',
        title   : 'Badge Categories',
        icon    : 'octicon:id-badge-16',
        link    : `/users/${userId}/gamification/badge-categories`,
        children: []
    };
    menuList.push(badgeCategory);

    const badge: SidebarMenu = {
        name    : 'Gamification-Badges',
        title   : 'Badges',
        icon    : 'cil:badge',
        link    : `/users/${userId}/gamification/badges`,
        children: []
    };
    menuList.push(badge);

    const schema: SidebarMenu = {
        name    : 'Gamification-Schemas',
        title   : 'Schemas',
        icon    : 'ic:outline-schema',
        link    : `/users/${userId}/gamification/schemas`,
        children: []
    };
    menuList.push(schema);

    //................................................................

    // Add here any new menu items

    return menuList;
}

///////////////////////////////////////////////////////////////////////////////

export const buildSidebarMenu = (userId: string): unknown[] => {
    const menuList: SidebarMenu[] = getMenuList(userId);
    const options: FeatureOptions = getFeatureOptions();

    const sidebarMenu: unknown[] = [];

    return sidebarMenu;
};

///////////////////////////////////////////////////////////////////////////////


// const navData = [
//     {
//         title: 'Dashboard',
//         icon: 'material-symbols:dashboard-outline-rounded',
//         childNav: [
//             // {
//             //     icon: '/rean-logo-white.png',
//             //     title: 'RHG App',
//             //     link: `/users/${userId}/home`
//             // }
//             // {
//             // 	icon: '/rean-logo-white.png',
//             // 	title: 'RHG Bot',
//             // 	link: `/users/${userId}/bot-stats`
//             // }
//         ]
//     },
//     {
//         title: 'Hospitals Systems',
//         icon: 'material-symbols:account-tree-outline-rounded',
//         childNav: [
//             {
//                 title: 'Hospitals',
//                 icon: 'material-symbols:local-hospital-outline-rounded',
//                 link: `/users/${userId}/hospitals`
//             },
//             {
//                 title: 'Health Systems',
//                 icon: 'material-symbols:health-and-safety-outline-rounded',
//                 link: `/users/${userId}/health-systems`
//             }
//         ]
//     },
//     {
//         title: 'Clinical',
//         icon: 'material-symbols:medical-services-outline-rounded',
//         childNav: [
//             {
//                 icon: 'material-symbols:assignment-outline-rounded',
//                 title: 'Assessments',
//                 link: `/users/${userId}/assessment-templates`
//             },
//             {
//                 icon: 'material-symbols:lab-research-outline-rounded',
//                 title: 'Lab-Records',
//                 link: `/users/${userId}/lab-record-types`
//             },
//             {
//                 icon: 'material-symbols:symptoms-outline',
//                 title: 'Symptoms',
//                 link: `/users/${userId}/symptoms`
//             },
//             {
//                 icon: 'material-symbols:pill-outline',
//                 title: 'Drugs',
//                 link: `/users/${userId}/drugs`
//             },
//             // {
//             //     icon: 'material-symbols:home-health-outline-rounded',
//             //     title: 'Careplan',
//             //     children: [
//             //         {
//             //             icon: 'material-symbols:dashboard-outline-rounded',
//             //             title: 'Dashboard',
//             //             link: `/users/${userId}/careplan`
//             //         },
//             //         {
//             //             icon: 'carbon:task-asset-view',
//             //             title: 'Assets',
//             //             link: `/users/${userId}/careplan/assets`
//             //         },
//             //         {
//             //             icon: 'iconoir:healthcare',
//             //             title: 'Careplans',
//             //             link: `/users/${userId}/careplan/careplans`
//             //         },
//             //         {
//             //             icon: 'material-symbols:check-box-outline-rounded',
//             //             title: 'Enrollments',
//             //             link: `/users/${userId}/careplan/enrollments`
//             //         }
//             //     ]
//             // }
//         ]
//     },
//     {
//         title: 'Educational',
//         icon: 'material-symbols:school-outline-rounded',
//         childNav: [
//             {
//                 icon: 'material-symbols:abc-rounded',
//                 title: 'Courses',
//                 link: `/users/${userId}/courses`
//             },
//             {
//                 icon: 'material-symbols:local-library-outline-rounded',
//                 title: 'Learning Journeys',
//                 link: `/users/${userId}/learning-journeys`
//             },
//             {
//                 icon: 'material-symbols:assignment-add-outline-rounded',
//                 title: 'Knowledge Nuggets',
//                 link: `/users/${userId}/knowledge-nuggets`
//             }
//         ]
//     },
//     {
//         title: 'Types',
//         icon: 'material-symbols:account-tree-outline-rounded',
//         childNav: [
//             {
//                 icon: 'material-symbols:person-search-outline-rounded',
//                 title: 'Person Role',
//                 link: `/users/${userId}/person-role-types`
//             },
//             {
//                 icon: 'material-symbols:priority-outline',
//                 title: 'Priorities',
//                 link: `/users/${userId}/priorities`
//             },
//             {
//                 icon: 'material-symbols:radar',
//                 title: 'Goals',
//                 link: `/users/${userId}/goals`
//             }
//         ]
//     },
//     // {
//     //     title: 'Miscellaneous',
//     //     icon: 'material-symbols:home-max-dots-outline',
//     //     childNav: [
//             // {
//             //     icon: 'material-symbols:frame-person-outline-rounded',
//             //     title: 'Clients',
//             //     link: `/users/${userId}/api-clients`
//             // },
//             // {
//             //     icon: 'material-symbols:corporate-fare-rounded',
//             //     title: 'Organizations',
//             //     link: `/users/${userId}/organizations`
//             // },
//             // {
//             //     icon: 'material-symbols:notifications-outline-rounded',
//             //     title: 'Notifications',
//             //     link: `/users/${userId}/notifications`
//             // },
//             // {
//             //     icon: 'material-symbols:newsmode-outline-rounded',
//             //     title: 'News Feed',
//             //     link: `/users/${userId}/newsfeeds`
//             // },
//             // {
//             //     icon: 'material-symbols:release-alert-outline-rounded',
//             //     title: 'Notices',
//             //     link: `/users/${userId}/notices`
//             // },
//             // {
//             //     icon: 'material-symbols:database-outline',
//             //     title: 'Custom Queries',
//             //     link: `/users/${userId}/custom-queries`
//             // },
//             // {
//             //     icon: 'material-symbols:tenancy-outline',
//             //     title: 'Tenants',
//             //     link: `/users/${userId}/tenants`
//             // },
//             // {
//             //     icon: 'material-symbols:groups-outline-rounded',
//             //     title: 'Cohorts',
//             //     link: `/users/${userId}/cohorts`
//             // }
//     //     ]
//     // },
//     // {
//     //     title: 'Gamification',
//     //     icon: 'simple-icons:gamedeveloper',
//     //     childNav: [
//     //         {
//     //             icon: 'mdi:event-edit',
//     //             title: 'Event Types',
//     //             link: `/users/${userId}/gamification/event-types`
//     //         },
//     //         {
//     //             icon: 'octicon:id-badge-16',
//     //             title: 'Badge Categories',
//     //             link: `/users/${userId}/gamification/badge-categories`
//     //         },
//     //         {
//     //             icon: 'cil:badge',
//     //             title: 'Badges',
//     //             link: `/users/${userId}/gamification/badges`
//     //         },
//     //         {
//     //             icon: 'ic:outline-schema',
//     //             title: 'Schemas',
//     //             link: `/users/${userId}/gamification/schemas`
//     //         }
//     //     ]
//     // }
// ];

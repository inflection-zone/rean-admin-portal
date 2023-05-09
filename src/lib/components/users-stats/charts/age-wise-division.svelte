<script lang="ts">
  import { Pie } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from 'chart.js';
	import { ageWiseUsersData } from '$lib/store/general.store';

  export let ageWiseUsers;

// let dataSource

//   $: if (dataSource){
//     dataSource.data.datasets[0].data = ageWiseUsers;
//     dataSource.update()
// 		}
  $:ageWiseUsers;
  // ageWiseUsers = $ageWiseUsersData;

  let usersBelowThirtyfiveRatio = ageWiseUsers.UsersBelowThirtyfive.Ratio;
  let usersBetweenThirtysixToSeventyRatio = ageWiseUsers.UsersBetweenThirtysixToSeventy.Ratio;
  let usersAboveSeventyRatio = ageWiseUsers.UsersAboveSeventy.Ratio;
  let ageNotSpecifiedUsersRatio = ageWiseUsers.AgeNotSpecifiedUsers.Ratio;

  let data = {
  labels: ['Users below 35', 'Users between 36 to 70', 'Users above 70', 'Age not specified'],
  datasets: [
    {
      data: [usersBelowThirtyfiveRatio, usersBetweenThirtysixToSeventyRatio, usersAboveSeventyRatio, ageNotSpecifiedUsersRatio],
      backgroundColor: [
        '#351e61',
        '#5832A1',
        '#7165E3',
        '#ECE4FC',
      
      ],
      hoverBackgroundColor: [
        '#422679',
        '#8a70bd',
        '#9c93eb',
        '#f2ecfd',
      ],
    },
  ],
};

// const options = {
// 		responsive: true,
// 		plugins: {
// 			legend: {
// 				position: "top"
// 			},
// 			title: {
// 				display: true,
// 				text: "Gender wise division of users"
// 			},
// 		}
// 	};
 ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>
<!-- <div class="w-72 h-full"> -->
<Pie id="dataSource" bind:this={ageWiseUsers} {data} options = {{ responsive: true }} />
<!-- </div> -->
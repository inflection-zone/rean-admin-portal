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

  export let ageWiseUsers;

  $:ageWiseUsers;

  let usersBelowThirtyfiveRatio = ageWiseUsers.UsersBelowThirtyfive.Ratio;
  let usersBetweenThirtysixToSeventyRatio = ageWiseUsers.UsersBetweenThirtysixToSeventy.Ratio;
  let usersAboveSeventyRatio = ageWiseUsers.UsersAboveSeventy.Ratio;
  let ageNotSpecifiedUsersRatio = ageWiseUsers.AgeNotSpecifiedUsers.Ratio;

  let sourceData = [usersBelowThirtyfiveRatio, usersBetweenThirtysixToSeventyRatio, usersAboveSeventyRatio, ageNotSpecifiedUsersRatio];
  $ : sourceData = [usersBelowThirtyfiveRatio, usersBetweenThirtysixToSeventyRatio, usersAboveSeventyRatio, ageNotSpecifiedUsersRatio];

  let data = {
  labels: ['Users below 35', 'Users between 36 to 70', 'Users above 70', 'Age not specified'],
  datasets: [
    {
      data:sourceData,
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

 ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
 
</script>

<Pie id="dataSource" bind:this={ageWiseUsers} {data} options = {{ responsive: true }} />


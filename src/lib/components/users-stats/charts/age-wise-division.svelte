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

  const chartColors = ['#CB463B', '#9F2A2A', '#661B26', '#2E0C16'];
  const hoverChartColors = ['#f2ecfd', '#CB463B', '#9F2A2A', '#661B26'];
	const tickColorLight = '#661B26';
	const tickColorDark = '#DED6EC';

  let sourceData = [usersBelowThirtyfiveRatio, usersBetweenThirtysixToSeventyRatio, usersAboveSeventyRatio, ageNotSpecifiedUsersRatio];
  $ : sourceData = [usersBelowThirtyfiveRatio, usersBetweenThirtysixToSeventyRatio, usersAboveSeventyRatio, ageNotSpecifiedUsersRatio];

  let data = {
  labels: ['Users below 35', 'Users between 36 to 70', 'Users above 70', 'Age not specified'],
  datasets: [
    {
      data:sourceData,
      backgroundColor: chartColors,
      hoverBackgroundColor: hoverChartColors,
    },
  ],
};

 ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

</script>

<Pie id="dataSource" bind:this={ageWiseUsers} {data} options={{ responsive: true }} />

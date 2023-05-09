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
	import { data } from './data';

  export let genderWiseUsers;
  $ :genderWiseUsers;

  console.log("genderWiseUsers", genderWiseUsers)
  let maleUsersRatio = genderWiseUsers.MaleUsers.Ratio;
  let femaleUsersRatio = genderWiseUsers.FemaleUsers.Ratio;
  let intersexUsersRatio = genderWiseUsers.IntersexUsers.Ratio;
  let genderNotSpecifiedRatio = genderWiseUsers.GenderNotSpecifiedUsers.Ratio;

//   let data = {
//   labels: ['Male', 'Female', 'Intersex', 'Gender not specified'],
//   datasets: [
//     {
//       data: [maleUsersRatio, femaleUsersRatio, intersexUsersRatio, genderNotSpecifiedRatio],
//       backgroundColor: [
//         '#351e61',
//         '#5832A1',
//         '#7165E3',
//         '#ECE4FC',
      
//       ],
//       hoverBackgroundColor: [
//         '#422679',
//         '#8a70bd',
//         '#9c93eb',
//         '#f2ecfd',
//       ],
//     },
//   ],
// };

 ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>
<div>
<Pie {data} options = {{ responsive: true }} />
</div>
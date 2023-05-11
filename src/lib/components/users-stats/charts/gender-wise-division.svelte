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

  export let lablesList: string[] = [];
	export let dataSource: number[] = [];

  let data = {
  lables:lablesList,
  datasets: [
    {
      data:dataSource,
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

}
 ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>
<div>
<Pie {data} options={{ responsive: true }} />
</div>
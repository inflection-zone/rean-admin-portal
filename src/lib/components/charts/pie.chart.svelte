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

  export let lables:string[] = [];
  export let dataRatio:Number[] ;

  let data = {
  labels: lables,
  datasets: [
    {
      data: dataRatio,
      backgroundColor: [
        '#F7464A',
        '#46BFBD',
        '#FDB45C',
        '#949FB1',
        '#4D5360',
      ],
      hoverBackgroundColor: [
        '#FF5A5E',
        '#5AD3D1',
        '#FFC870',
        '#A8B3C5',
        '#616774',
      ],
    },
  ],
};

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>
<div class="w-full h-full">
<!-- <Pie {data} options={{ responsive: true }} /> -->
</div>
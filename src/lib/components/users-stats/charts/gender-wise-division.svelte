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
	import {
		getChartColors,
		getHoverChartColors,
		getTickColorLight,
		getTickColorDark
  	} from '$lib/themes/theme.selector';

  /////////////////////////////////////////////////////////////////////////////

  const chartColors = getChartColors();
  const hoverChartColors = getHoverChartColors();
  const tickColorLight = getTickColorLight();
  const tickColorDark = getTickColorDark();

  export let lablesList: string[] = [];
	export let dataSource: number[] = [];

  let data = {
  lables:lablesList,
  datasets: [
    {
      data:dataSource,
      backgroundColor: chartColors,
      hoverBackgroundColor: hoverChartColors,
    },
  ],

}
 ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>
<div>
<Pie {data} options={{ responsive: true }} />
</div>

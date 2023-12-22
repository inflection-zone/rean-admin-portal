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
    PUBLIC_CHART_COLORS,
    PUBLIC_HOVER_CHART_COLORS,
    PUBLIC_TICK_COLOR_LIGHT,
    PUBLIC_TICK_COLOR_DARK
} from '$env/static/public';
  export let lablesList: string[] = [];
	export let dataSource: number[] = [];

//   const chartColors = ['#CB463B', '#9F2A2A', '#661B26', '#2E0C16'];
//   const hoverChartColors = ['#f2ecfd', '#CB463B', '#9F2A2A', '#661B26'];
// 	const tickColorLight = '#661B26';
// 	const tickColorDark = '#DED6EC';

    const chartColors = PUBLIC_CHART_COLORS.split(',');
    const hoverChartColors = PUBLIC_HOVER_CHART_COLORS.split(',');
    const tickColorLight = PUBLIC_TICK_COLOR_LIGHT;
    const tickColorDark = PUBLIC_TICK_COLOR_DARK;

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

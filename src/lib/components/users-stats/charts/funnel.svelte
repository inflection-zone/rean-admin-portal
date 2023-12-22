<script lang="ts">
	import { onMount } from 'svelte';
	import Chart, { LinearScale, CategoryScale } from 'chart.js/auto';
	import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
	import datalabels from 'chartjs-plugin-datalabels';
    import {
    PUBLIC_CHART_COLORS,
    PUBLIC_TICK_COLOR_LIGHT,
    PUBLIC_TICK_COLOR_DARK
} from '$env/static/public';
    export let labels: string[];
	export let dataSource: number[];

	Chart.register(FunnelController, TrapezoidElement, LinearScale, CategoryScale);

	let funnelChart;
	let ctx;

	// const chartColors = ['#CB463B', '#9F2A2A', '#661B26', '#2E0C16'];
	// const tickColorLight = '#661B26';
	// const tickColorDark = '#DED6EC';

    const chartColors = PUBLIC_CHART_COLORS.split(',');
    const tickColorLight = PUBLIC_TICK_COLOR_LIGHT;
    const tickColorDark = PUBLIC_TICK_COLOR_DARK;

	onMount(() => {
		ctx = funnelChart.getContext('2d');
		funnelChart = new Chart(ctx, {
			type: 'funnel',
			data: {
        labels: labels,
				datasets: [
					{
            data:dataSource,
						backgroundColor: chartColors,
						borderColor: chartColors,
						borderWidth: 1
					},
      //     datalabels: {
      //   labels: {
      //     value: {
      //       color: 'green'
      //     }
      //   }
      // }
				]
			},
			options: {
				responsive: true,
				// maintainAspectRatio: false,
				indexAxis: 'y',
				plugins: {
					datalabels: {
						display: true,
						anchor: 'start',
						align: 'start',
						offset: 0,
            color: 'red',
          //   formatter: (value, ctx) => {
          //   return value + '%';
          // },
					}
				}
			}
		});
	});
</script>

<canvas id="myChart" bind:this={funnelChart} />

<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let labels: string[] = [];
	export let dataSource: number[] = [];
	let barChart;
	let ctx;

	onMount(() => {
		ctx = barChart.getContext('2d');
		barChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						data: dataSource,
						backgroundColor: ['#351e61', '#5832A1', '#7165E3', '#ECE4FC'],
						borderColor: ['#351e61', '#5832A1', '#7165E3', '#ECE4FC'],
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: '#5832A1'
						},
					},
					y: {
						beginAtZero: true,
						grid: {
							display: false
						},
						ticks: {
							color: '#5832A1' // set y-axis label color here
						}
					}
				},
				plugins: {
					legend: {
						display: false,
						position: 'top',
						align: 'center',
						labels: {
							color: '#5832A1'
						}
					}
				}
			}
		});
	});
</script>

<canvas id="myChart" bind:this={barChart} />

<script lang="ts">
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let lables: string[] = [];
	export let data: number[] = [];
	let pieChart;
	let ctx;

	onMount(async () => {
		ctx = pieChart.getContext('2d');
		pieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: lables,
				datasets: [
					{
						data: data,
						backgroundColor: ['#351e61', '#5832A1', '#7165E3', '#ECE4FC'],
						hoverBackgroundColor: ['#422679', '#8a70bd', '#9c93eb', '#f2ecfd']
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: true,
						position: 'right'
					},
					
				}
			}
		});
	});

</script>

<canvas id="pieChart" bind:this={pieChart} />


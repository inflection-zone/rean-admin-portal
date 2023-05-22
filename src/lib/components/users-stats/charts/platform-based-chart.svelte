<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let lables: string[] = [];
	export let totalUsersData: number[] = [];
	export let androidUsersData: number[] = [];
	export let iOSUsersData: number[] = [];
	let barChart;
	let ctx;

	onMount(() => {
		ctx = barChart.getContext('2d');
		barChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: lables,
				datasets: [
					{
						label: 'Total users',
						data: totalUsersData,
						borderColor: 'green',
						fill: false
					},
					{
						label: 'Android users',
						data: androidUsersData,
						borderColor: 'blue',
						fill: false
					},
					{
						label: 'IOS users',
						data: iOSUsersData,
						borderColor: 'purple',
						fill: false
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
							color: '#5832A1' // set x-axis label color here
						}
					},
					y: {
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
						display: true,
						position: 'top',
						align: 'center',
						labels: {
							color: '#5832A1',
							boxWidth:10,
							boxHeight:10,
						}
					}
				}
			}
		});
	});
</script>

<canvas id="three-line-chart" bind:this={barChart} />

<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let lables: string[] = [];
	export let data: number[] = [];
	export let title: string;
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
				layout: {
					padding: {
						left: 0,
						right:0, 
						top: -150,
						bottom: 0
					}
				},
				plugins: {
					legend: {
						display: true,
						position: 'right',
						align: 'center',
						labels: {
							color: '#5832A1'
						}
					},
					// title: {
					//     display: true,
					//     text: title,
					//     position: "bottom",
					// 		color: '#5832A1',
					// 		align:'start',
					// 		font:{
					//   size: 22,
					//   weight: 'normal',
					//   lineHeight: 1.2,
					// 		},
					// },
				}
			}
		});
	});
</script>

<div class="">
	<canvas id="pieChart" bind:this={pieChart} />
</div>

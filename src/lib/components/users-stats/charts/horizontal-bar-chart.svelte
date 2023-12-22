<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
    import {
    PUBLIC_CHART_COLORS,
    PUBLIC_TICK_COLOR_LIGHT,
    PUBLIC_TICK_COLOR_DARK
    } from '$env/static/public';
	export let labels: string[] = [];
	export let dataSource: number[] = [];
	export let title;
	let barChart;
	let ctx;
	// const chartColors = ['#CB463B', '#9F2A2A', '#661B26', '#2E0C16'];
	// const tickColorLight = '#661B26';
	// const tickColorDark = '#DED6EC';

    const chartColors = PUBLIC_CHART_COLORS.split(',');
    const tickColorLight = PUBLIC_TICK_COLOR_LIGHT;
    const tickColorDark = PUBLIC_TICK_COLOR_DARK;

	onMount(() => {
		ctx = barChart.getContext('2d');
		barChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						data: dataSource,
						backgroundColor: chartColors,
						borderColor: chartColors,
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: 'y',
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight // set x-axis label color here
						}
					},
					y: {
						beginAtZero: true,
						grid: {
							display: false
						},
						ticks: {
							color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight // set y-axis label color here
						}
					}
				},
				layout: {
					padding: {
						bottom: 20 // Adjust the bottom padding value as needed
					}
				},
				plugins: {
					legend: {
						display: false,
						position: 'top',
						align: 'center',
						labels: {
							color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight
						}
					},
					title: {
						display: true,
						text: title,
						position: 'top',
						color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight,
						align: 'center',
						padding: 20,
						font: {
							size: 22,
							weight: 'normal',
							lineHeight: 1.2
						}
					}
				}
			}
		});
	});
</script>

<canvas id="myChart" bind:this={barChart} />

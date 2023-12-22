<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
    import {
    PUBLIC_CHART_COLORS,
    PUBLIC_TICK_COLOR_LIGHT,
    PUBLIC_TICK_COLOR_DARK
    } from '$env/static/public';
	export let labels: string[];
	export let data: number[];
	export let title: string;

	$:data;
    $:labels
	let pieChart;
	let ctx;
	// const chartColors = ['#CB463B', '#9F2A2A', '#661B26', '#2E0C16']
	// const tickColorLight = '#661B26';
	// const tickColorDark = '#DED6EC';

    const chartColors = PUBLIC_CHART_COLORS.split(',');
    const tickColorLight = PUBLIC_TICK_COLOR_LIGHT;
    const tickColorDark = PUBLIC_TICK_COLOR_DARK;
    
	onMount(async () => {
		ctx = pieChart.getContext('2d');
		pieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [
					{
						data: data,
						backgroundColor: chartColors,
						hoverBackgroundColor: chartColors
					}
				]
			},
			options: {
				responsive: true,
				// layout: {
				// 	padding: {
				// 		left: 10,
				// 		right:10,
				// 		top: 10,
				// 		bottom:10
				// 	}
				// },
				plugins: {
					legend: {
						display: true,
						position: 'right',
						labels: {
							boxWidth: 10,
							boxHeight: 10,
							color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight
						}
					},
					title: {
						display: false,
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

<div>
	<canvas id="pieChart" bind:this={pieChart} />
</div>

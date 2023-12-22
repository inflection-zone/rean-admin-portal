<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
    import {
    PUBLIC_TICK_COLOR_LIGHT,
    PUBLIC_TICK_COLOR_DARK
    } from '$env/static/public';
	export let lables: string[] = [];
	export let totalUsersData: number[] = [];
	export let androidUsersData: number[] = [];
	export let iOSUsersData: number[] = [];
	let barChart;
	let ctx;
	// const tickColorLight = '#661B26';
	// const tickColorDark = '#DED6EC';

    const tickColorLight = PUBLIC_TICK_COLOR_LIGHT;
    const tickColorDark = PUBLIC_TICK_COLOR_DARK;

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
						label: 'iOS users',
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
							color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight // set x-axis label color here
						}
					},
					y: {
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
						display: true,
						position: 'top',
						align: 'center',
						labels: {
							color: document.documentElement.classList.contains('dark') ? tickColorDark : tickColorLight,
							boxWidth: 10,
							boxHeight: 10
						}
					}
				}
			}
		});
	});
</script>

<canvas id="three-line-chart" bind:this={barChart} />

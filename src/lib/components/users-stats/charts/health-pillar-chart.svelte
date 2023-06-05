<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	
  export let healthPillarDistributionMonthly;

  let physicalActivityUsers = healthPillarDistributionMonthly.PhysicalActivityUsers;
  let meditationUsers = healthPillarDistributionMonthly.MeditationUsers;
  let medicationUsers = healthPillarDistributionMonthly.MedicationUsers;
  let symptomUsers = healthPillarDistributionMonthly.SymptomUsers;
  let labRecordUsers = healthPillarDistributionMonthly.LabRecordUsers;
  let nutritionUsers = healthPillarDistributionMonthly.NutritionUsers;
  // let vitalUsers = healthPillarDistributionMonthly.VitalUsers;

  let labels = physicalActivityUsers.map((x) => x.Month);
  let physicalActivityUsersData = physicalActivityUsers.map((x) => x.Count);
  let meditationUsersData = meditationUsers.map((x) => x.Count);
  let medicationUsersData = medicationUsers.map((x) => x.Count);
  let symptomUsersData = symptomUsers.map((x) => x.Count);
  let labRecordUsersData = labRecordUsers.map((x) => x.Count);
  let nutritionUsersData = nutritionUsers.map((x) => x.Count);
  // let vitalUsersData = vitalUsers.map((x) => x.Count);

	let lineChart;
	let ctx;

	onMount(() => {
		ctx = lineChart.getContext('2d');
		lineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Physical Activity',
						data: physicalActivityUsersData,
						borderColor: 'green',
						fill: false
					},
					{
						label: 'Maditation',
						data: meditationUsersData,
						borderColor: 'blue',
						fill: false
					},
					{
						label: 'Medication',
						data: medicationUsersData,
						borderColor: 'purple',
						fill: false
					},
          {
						label: 'Symptoms',
						data: symptomUsersData,
						borderColor: 'red',
						fill: false
					},
          {
						label: 'Lab Record',
						data: labRecordUsersData,
						borderColor: 'blue',
						fill: false
					},
          {
						label: 'Nutrition',
						data: nutritionUsersData,
						borderColor: 'pink',
						fill: false
					},
          // {
					// 	label: 'Vitals',
					// 	data: vitalUsersData,
					// 	borderColor: 'pink',
					// 	fill: false
					// }
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
				layout: {
          padding: {
            bottom: 20, // Adjust the bottom padding value as needed
          },
        },
				plugins: {
					legend: {
						display: true,
						position: 'right',
						align: 'center',
						labels: {
							color: '#5832A1',
							boxWidth:10,
							boxHeight:10,
						}
					},
					title: {
					    display: true,
					    text: 'Health Pillars Monthly',
					    position: "top",
							color: '#5832A1',
							align:'center',
							padding:20,
							font:{
					  size: 22,
					  weight: 'normal',
					  lineHeight: 1.2,
							},
					},
				}
			}
		});
	});
</script>

<!-- <div class="h-80"> -->
<!-- <h4 class="text-center py-3 text-22 font-semibold leading-5 justify-center text-primary-500">Health Pillars Monthly</h4> -->
<canvas class="" id="line chart" bind:this={lineChart} />
<!-- </div> -->
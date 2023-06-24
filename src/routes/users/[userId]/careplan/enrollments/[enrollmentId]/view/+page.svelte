<script lang="ts">
  import type { PageServerData } from './$types';
  import date from 'date-and-time';
  import { page } from '$app/stores';
  import EnrollmentDisplay from '$lib/components/enrollmentDisplay/enrollmentDisplay.svelte';
  import { goto } from '$app/navigation';

  const userId = $page.params.userId;
  const enrollmentId = $page.params.enrollmentId;
  const createRoute = `/users/${userId}/enrollments/create`;
  const editRoute = `/users/${userId}/enrollments/${enrollmentId}/edit`;
  const viewRoute = `/users/${userId}/enrollments/${enrollmentId}/view`;
  const viewTaskRoute = `/users/${userId}/enrollments/${enrollmentId}/tasks`;
  const enrollmentsRoute = `/users/${userId}/enrollments`;

  ////////////////////////////////////////////////////////////////////////

  export let data: PageServerData;
  let id = data.enrollment.id;
  let enrollment = data.enrollment;
  let enrollmentStats = data.enrollmentStats;
  let participantBirthDate = enrollment.Participant.BirthDate;
  let participantDisplayId = enrollment.Participant.DisplayId;
  let enrollmentCode = enrollment.DisplayId;
  let currentWeek = enrollmentStats.CurrentWeek;
  let totalWeeks = enrollmentStats.TotalWeek;
  let weekArray = Array.from(new Array(totalWeeks), (x, i) => i + 1);
  let MAX_STEP_WIDTH = 200;
  //Calculating age by birthdate
  let year = Number(participantBirthDate.substr(0, 4));
  let month = Number(participantBirthDate.substr(4, 2)) - 1;
  let day = Number(participantBirthDate.substr(6, 2));
  let today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
    age--;
  }

  const breadCrumbs = [
    {
      name: 'Enrollments',
      path: enrollmentsRoute
    },
    {
      name: 'View',
      path: viewRoute
    }
  ];
</script>

<div class="flex justify-center mt-14 mb-20">
  <div class="card justify-start w-11/12 h-full shadow-bottom-right tertiary">
    <div class="flex flex-row ">
      <div class="sm:w-1/2 min-[320px]:w-1/2 lg:hidden md:hidden xl:hidden 2xl:hidden"></div>
        <div class="w-3/5 lg:w-3/4 md:w-2/3 xl:w-3/4 sm:w-[150%] min-[320px]:w-[240%]">
          <div class="flex items-center  mt-5 my-2.5 lg:mx-16 md:mx-12 mx-10 ">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold">Enrollment Code</label>
            </div>
            <span class="w-1/2 md:2/3 lg:2/3 sm:w-3/2 min-[320px]:w-3/2" id="participantAge">{enrollmentCode}</span>
          </div>

          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> Participant </label>
            </div>
            <span class="w-1/2 md:2/3 lg:2/3 sm:w-3/2 min-[320px]:w-3/2" id="participantAge">
              Participant # {participantDisplayId}
            </span>
          </div>

          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> Age </label>
            </div>
            <span class="w-1/2 md:2/3 lg:2/3 sm:w-3/2 min-[320px]:w-3/2" id="participantAge"> {age}</span>
          </div>

          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold" for=""> Gender </label>
            </div>
            <span class="w-1/2 md:w-2/3 lg:w-2/3 sm:w-3/2 min-[320px]:w-3/2" id="gender">
              {enrollment.Participant.Gender}
            </span>
          </div>

          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> Careplan </label>
            </div>
            <span class="w-1/2 md:w-2/3 lg:w-2/3 sm:w-3/2 min-[320px]:w-3/2"> {enrollment.Careplan.Name}</span>
          </div>
          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> Category </label>
            </div>
            <span class="w-1/2 md:w-2/3 lg:w-2/3 sm:w-3/2 min-[320px]:w-3/2"> {enrollment.Careplan.Category.Type}</span>
          </div>
          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> Enrollment Date </label>
            </div>
            <span class="w-1/2 md:w-2/3 lg:w-2/3 sm:w-3/2 min-[320px]:w-3/2" id="enrollmentDate">
              {date.format(new Date(enrollment.EnrollmentDate), 'DD-MMM-YYYY')}
            </span>
          </div>
          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> Start Date </label>
            </div>
            <span class="w-1/2 md:w-2/3 lg:w-2/3 sm:w-3/2" id="enrollmentDate">
              {date.format(new Date(enrollment.StartDate), 'DD-MMM-YYYY')}
            </span>
          </div>
          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> End Date </label>
            </div>
            <span class="w-1/2 md:w-2/3 lg:w-2/3 sm:w-3/2 min-[320px]:w-3/2" id="enrollmentDate">
              {date.format(new Date(enrollment.EndDate), 'DD-MMM-YYYY')}
            </span>
          </div>
          <div class="flex items-center my-2.5 lg:mx-16 md:mx-12 mx-10">
            <div class="w-1/2 md:w-1/3 lg:w-1/3 sm:w-full min-[320px]:w-full">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="lable-text font-semibold"> Current Week </label>
            </div>
            <span class="w-1/2 md:w-2/3 lg:w-2/3 sm:w-3/2 min-[320px]:w-3/2" id="enrollmentDate">
              {currentWeek}
            </span>
          </div>
        
        <div class="flex items-center mt-5 mb-5 lg:mx-16 md:mx-12 mx-10 ">
          <div class="w-1/2 md:w-1/3 lg:w-1/3 ">
            
            <button class="btn btn-sm w-36 btn-primary transition 
            ease-in-out 
            delay-150   
            hover:scale-110  
            duration-300 ... "> 
              <a class="text-base-100 capitalize" href={viewTaskRoute} >enrollment Tasks</a>
            </button>
          </div>
          <span class="w-1/2 md:w-2/3 lg:w-2/3" >
           
          </span>
        </div>
      </div>

      <div class="flex justify-end w-2/5 lg:w-1/4 md:w-1/3 xl:w-1/4">
        <div class="lg:block xl:block md:hidden sm:hidden min-[320px]:hidden mt-4 ">
          <EnrollmentDisplay {totalWeeks} {currentWeek} />
        </div>
        <div class="lg:hidden xl:hidden 2xl:hidden mt-8 sm:hidden md:block sm:w-full min-[320px]:hidden">
          <EnrollmentDisplay {totalWeeks} {currentWeek} {MAX_STEP_WIDTH} />
        </div>
      </div>
    </div>
    <div class="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-24 md:gap-28 pb-4 ">
      <div class="flex justify-center lg:hidden md:hidden ">
           <div>
            <EnrollmentDisplay {totalWeeks} {currentWeek} {MAX_STEP_WIDTH} />
          </div>
      </div>
      <div class="flex justify-center">
        <div class="grid grid-cols justify-items-center">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="lable-text font-semibold text-xl mb-2">Total Tasks</label>
          <div
            class="radial-progress text-secondary text-xl font-bold"
            style="--value:100;--size:98px; --thickness:10px"
          >
            {enrollmentStats.TolalTask}
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="grid grid-cols justify-items-center">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="lable-text font-semibold text-xl mb-2">Finished Tasks</label>
          <div
            class="radial-progress text-green-500 text-xl font-bold"
            style="--value:100;--size:98px; --thickness:10px"
          >
            {enrollmentStats.FinishedTask}
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="grid grid-cols justify-items-center">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="lable-text font-semibold text-xl mb-2">Delayed Tasks</label>
          <div
            class="radial-progress text-red-500 text-xl font-bold"
            style="--value:100;--size:98px; --thickness:10px"
          >
            {enrollmentStats.DelayedTask}
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="grid grid-cols justify-items-center">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="lable-text font-semibold text-xl mb-2 ">Unserved Tasks</label>
          <div
            class="radial-progress text-secondary text-xl font-bold"
            style="--value:100; --size:98px; --thickness:10px "
          >
            {enrollmentStats.UnservedTask}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

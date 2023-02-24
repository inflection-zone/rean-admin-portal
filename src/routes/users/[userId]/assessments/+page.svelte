<script>
// @ts-nocheck

  import Paginate from '$lib/components/paginate/paginate.svelte';
  import Fa from 'svelte-fa';
  import { faCirclePlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
//   import Navbar from '$lib/components/navbar/navbar.svelte';
  let columns = ['Title', 'Display Code', 'Type', 'Provider', 'Created Date'];
  let items = [
    ['Maternity (Regular)', 'MATERNITY', 'Maternity and Neonatal', 'Rean', '01-March-2020'],
    ['Sport Injury (Post-Op)', 'SPORTS-POST-OP', 'Post Surgery Care', 'Rean', '01-March-2020'],
    ['Eye care (Post-Op)', 'EYE-POST-OP', 'Post Surgery Care', 'Rean', '01-March-2020'],
    ['Spinal Physiotherapy', 'SPINAL-PHYSIO', 'Neuro Care', 'Rean', '01-March-2020'],
    [
      'Neonatal Special Care',
      'NEONATAL-SPECIAL',
      'Maternity and Neonatal',
      'Rean',
      '01-March-2020'
    ],
    ['Maternity (Regular)', 'MATERNITY', 'Maternity and Neonatal', 'Rean', '01-March-2020'],
    [
      'Neonatal Special Care',
      'NEONATAL-SPECIAL',
      'Maternity and Neonatal',
      'Rean',
      '01-March-2020'
    ],
    ['Maternity (Regular)', 'MATERNITY', 'Maternity and Neonatal', 'Rean', '01-March-2020'],
    [
      'Neonatal Special Care',
      'NEONATAL-SPECIAL',
      'Maternity and Neonatal',
      'Rean',
      '01-March-2020'
    ],
    ['Maternity (Regular)', 'MATERNITY', 'Maternity and Neonatal', 'Rean', '01-March-2020'],
    ['Eye care (Post-Op)', 'EYE-POST-OP', 'Post Surgery Care', 'Rean', '01-March-2020'],
    ['Spinal Physiotherapy', 'SPINAL-PHYSIO', 'Neuro Care', 'Rean', '01-March-2020'],
    ['Eye care (Post-Op)', 'EYE-POST-OP', 'Post Surgery Care', 'Rean', '01-March-2020'],
    ['Spinal Physiotherapy', 'SPINAL-PHYSIO', 'Neuro Care', 'Rean', '01-March-2020']
  ];

  let show = false;

  let currentPage = 1;
  let pageSize = 20;
</script>
<!-- <Navbar /> -->

<div class=" pt-2">
  <div class=" breadcrumbs text-lg text-[#7165E3] ml-14 mt-4">
    <ul>
      <li><a href="/" class="text-[#7165E3]">Home</a></li>
      <li>Assessment explorer</li>
    </ul>
  </div>

  <div class="flex flex-row mr-14 mt-3 ">
    <div class="basis-1/2 justify-center items-center ">
      <div class="relative flex items-center  " />
    </div>
    <div class="basis-1/2 justify-center items-center">
      <div class="relative flex items-center">
        <a href="/assessment/create" class="absolute right-4 lg:mr-[-18px] ">
          <Fa icon={faCirclePlus} style="color: #5832A1" size="4x" />
        </a>
      </div>
    </div>
  </div>

  <div
    class="flex flex-row mx-6 mt-10 gap-8 lg:flex-row md:flex-row sm:flex-col min-[280px]:flex-col"
  >
    <div class="basis-1/2 justify-center items-center ">
      <div class="relative flex items-center">
        <input
          type="text"
          placeholder="Assessment-Template Type"
          class="input input-bordered input-info w-full"
        />
      </div>
    </div>
    <div class="basis-1/2 justify-center items-center ">
      <div class="relative flex items-center">
        <input
          type="text"
          placeholder="Search Assessment Template By Display Code"
          class="input input-bordered input-info w-full"
        />
      </div>
    </div>
  </div>

  <div
    class="flex flex-row mx-6 mt-4 gap-8 lg:flex-row md:flex-row sm:flex-col min-[280px]:flex-col"
  >
    <div class="basis-1/2 justify-center items-center ">
      <div class="relative flex items-center">
        <input
          type="text"
          placeholder="Search Assessment-Template By Title"
          class="input input-bordered input-info w-full"
        />
      </div>
    </div>
    <div class="basis-1/2 justify-center items-center">
      <div class="relative flex items-center  ">
        <input
          type="text"
          placeholder="Search Assessment-Template By Care plan"
          class="input input-bordered input-info w-full"
        />
      </div>
    </div>
  </div>
  <div class="flex justify-center flex-col mx-6 mt-4 overflow-auto">
    <div class=" overflow-y-auto h-[600px]">
      <table class="table w-full ">
        <!-- <div class="  w-full "> -->
        <!-- head -->
        <thead class="sticky top-0">
          <tr>
            <th />
            {#each columns as columnHeading}
              <th aria-sort="ascending" class="">
                <!-- <Fa icon={faArrowDown} class=""   style="color: #5832A1 first:aria-[sort=ascending]:rotate-0" size="md" /> -->
                {columnHeading}
              </th>
            {/each}
            <th />
            <th />
            <th />
          </tr><tr />
        </thead>

        <tbody class="">
          {#each items as row, index}
            <tr>
              <td>{pageSize * 0 + index + 1}</td>

              <td class="" />
              <!-- </a> -->
              <td class="" />
              <td class="" />
              <td class="" />
              <td />
              <td>
                <a href="/users/home/careplans/id/edit"
                  ><Fa icon={faPencil} style="color: #5832A1" size="md" /></a
                >
              </td>
              <td>
                <button>
                  <Fa icon={faTrash} style="color: #5832A1" size="md" />
                </button>
              </td>
              <!-- <td></td>   -->
            </tr>
          {/each}
        </tbody>

        <tfoot />
        <!-- </div> -->
      </table>
    </div>

    <div
      class=" border-t flex flex-col w-full bg-[#7165E3] h-12 pt-2 rounded-b-lg mb-12 xs:flex-row items-center xs:justify-between md:mr-5 sm:mr-5 mr-8"
    >
      <Paginate items={items.length} />
    </div>
  </div>
</div>

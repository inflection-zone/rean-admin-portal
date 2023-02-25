<script lang="ts">
  import Fa from 'svelte-fa';
  import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
</script>

<div class=" breadcrumbs text-lg  text-[#7165E3] ml-14 mt-10">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/assessment">Assessment-Template</a></li>
    <li>Nodes</li>
    <li>View</li>
  </ul>
</div>

<form class="w-full max-w-4xl  bg-[#ECE4FC] mt-12  rounded-lg mx-auto">
  <div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
    <div class="ml-3 relative flex flex-row text-white text-xl">
      Node
      <a href="/assessment">
        <Fa icon={faMultiply} size="lg" style="color:white" class="absolute right-0 pr-3 " />
      </a>
    </div>
  </div>

  <div class="hidden" />
  <div class="flex items-center mb-4 mt-10 mx-16">
    <div class="w-1/3">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="lable-text"> Parent Node Id </label>
    </div>
    <div class="w-2/3">123e4567e-89b-12d3-a456426614174000</div>
  </div>

  <div class="flex items-center my-6 mx-16">
    <div class="w-1/3">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="lable-text">Node Type</label>
    </div>
    <div class="w-2/3">Question</div>
  </div>

  <div class="flex items-center my-6 mx-16">
    <div class="w-1/3">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="lable-text"> Title </label>
    </div>
    <div class="w-2/3">What is Race ?</div>
  </div>

  <div class="flex items-center my-6 mx-16">
    <div class="w-1/3">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="lable-text"> Description </label>
    </div>
    <div class="w-2/3">taking Idea About Race</div>
  </div>

  <div class="flex items-center my-6 mx-16">
    <div class="w-1/3">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="lable-text"> Query Type </label>
    </div>
    <div class="w-2/3">Multiple Choice question</div>
  </div>
  <div class="flex flex-col mt-12 mx-20">
    <div class="w-1/3">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="lable-text"> Options</label>
    </div>
    <div class="pl-8 pt-3 ">
      <div class="flex gap-4 mt-0.5">
        <input type="checkbox" name="option1" class="h-4 w-4" />
        <label for="option1">White</label>
      </div>
      <div class="flex gap-4 mt-0.5">
        <input type="checkbox" name="option2" class="h-4 w-4" />
        <label for="option2">Black</label>
      </div>
      <div class="flex gap-4 mt-0.5">
        <input type="checkbox" name="option3" class="h-4 w-4" />
        <label for="option3">American Indian or Alaska Native</label>
      </div>
      <div class="flex gap-4 mt-0.5">
        <input type="checkbox" name="option4" class="h-4 w-4" />
        <label for="option4">Asian Indian</label>
      </div>
      <div class="flex gap-4 mt-0.5">
        <input type="checkbox" name="option5" class="h-4 w-4" />
        <label for="option5">Chinese</label>
      </div>
    </div>
  </div>

  <div class="flex items-center mt-10 mx-16">
    <div class="w-5/6" />
    <div class="w-1/6 ">
      <a href="/home/careplans/[id]/edit">
        <button type="submit" class="btn  btn-outline w-full mb-10 mr-4">
          Edit
          <Fa icon={faPen} size="lg" class="ml-5" />
        </button>
      </a>
    </div>
  </div>
</form>

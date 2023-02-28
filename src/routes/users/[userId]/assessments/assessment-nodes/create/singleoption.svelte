<script>
  import Fa from 'svelte-fa';
  import { faMultiply } from '@fortawesome/free-solid-svg-icons';
  let show = false;
  let values = [
    {
      name: ''
    }
  ];

   let look=false

  const addField = () => {
    values = [...values, { name: '' }];
    console.log("values-------",values.length)
  };
 
  const removeField = () => {
    values = values.slice(0, values.length - 1);
    
  };

   

  const handleFocus = () => {
    show = true;
  };
</script>

<div class=" flex justify-center ">
  <div class="w-[29%]  " />
  <div class="border-2 border-solid card bg-[#ffffff] h-auto  w-[57.5%]   rounded-lg">
    <div class=" form-control my-2  flex flex-col pl-5">
      {#each values as v, i}
        <div class="flex  flex-row pb-4 pt-2">
          <span class="font-semibold">{i+1}</span>
          <input
            id={v}
            type="text"
            class="pl-2 border-b-2 w-10/12 outline-none"
            on:focus={handleFocus}
            bind:value={values[i].name}
            placeholder="name"
          />

          <button class="pl-3 pt-1.5" type="button" on:click={removeField}>
            <Fa icon={faMultiply} size="md" />
          </button>
        </div>
      {/each}
      
    </div>
    <div>
      <div class="flex  justify-start pl-5 mb-2">
        {#if show }
         
          <button
            class="hover:bg-color pl-2  btn btn-sm bg-color text-md text-[14px]"
            type="button"
            on:click|preventDefault={addField}>Add Option</button
          >
        {/if}
      </div>

    </div>

  </div>

</div>

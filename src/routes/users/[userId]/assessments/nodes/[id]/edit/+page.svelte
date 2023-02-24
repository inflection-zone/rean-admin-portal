<script lang="ts">
    import Fa from 'svelte-fa';
    import { faMultiply } from '@fortawesome/free-solid-svg-icons';
    import Navbar from '../../../../../lib/components/nav/nav.svelte';
  
    import Singleoption from '../../create/singleoption.svelte';
    import Multipleoption from '../../../../assessment/nodes/create/multipleoption.svelte'
  
    let retrievedTags = '';
    let tagsPlaceholder = 'Enter a tags here...';
  
    function handleTags(event) {
      retrievedTags = event.detail.tags;
    }
  
    let show = '';
    show='multiChoice'
    const onChange = (val) => {
      show = val.target.value;
      console.log("val-------------",show)
     
    };
  </script>
  
  <Navbar />
  
  <div>
    <div class=" breadcrumbs text-xl  text-[#7165E3] ml-14 mt-10">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Assessment-template</a></li>
        <li>Nodes</li>
      </ul>
    </div>
  
    <form method="post" class="w-full max-w-4xl  bg-[#ECE4FC] mt-6 mb-20  rounded-lg mx-auto">
      <div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
        <div class="ml-3 relative flex flex-row text-white text-xl">
          Create New Node
          <Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 " />
        </div>
      </div>
      <div class="flex items-center mb-4 mt-10 mx-16">
        <div class="w-1/3">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="lable-text">Parent Node</label>
        </div>
        <div class="w-2/3">
          <select type="text" name="name" required class="select select-info w-full "
            ><option selected>parent node</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
  
      <div class="flex items-center my-4 mx-16">
        <div class="w-1/3">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="lable-text">Node Type</label>
        </div>
        <div class="w-2/3">
          <select type="text" name="name" required class="select select-info w-full "
            ><option selected>Node Type</option>
            <option>Question</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
  
      <div class="flex items-center my-4 mx-16">
        <div class="w-1/3">
          <label class="lable-text" for="version"> Title </label>
        </div>
        <div class="w-2/3">
          <input
            name="Title"
            class="input input-bordered input-info w-full"
            placeholder="What is your Zip code?"
          />
        </div>
      </div>
  
      <div class="flex items-center my-4 mx-16">
        <div class="w-1/3">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="lable-text"> Description </label>
        </div>
        <div class="w-2/3">
          <textarea
            name="description"
            required
            class="textarea textarea-info w-full"
            placeholder="postal code"
          />
        </div>
      </div>
      <div class="flex items-center my-4 mx-16">
        <div class="w-1/3">
          <label class="lable-text" for="version"> Query Type </label>
        </div>
        <div class="w-2/3">
          <select
            id="mySelect"
            type="text"
            name="name"
            required
            class="select select-info w-full "
            on:change={(val)=> onChange(val)}
            ><option  value="textChoice">Text</option>
            <option value="singleChoice">Single choice question</option>
            <option selected value="multiChoice">multiple choice question</option>
            <option value="yesnoChoice">yes no question</option>
            <option value="okChoice">ok</option>
            <option>none</option>
          </select>
        </div>
      </div>
      
      {#if show === 'singleChoice'}
        <Singleoption />  
      {:else if show === 'multiChoice'}
        <Multipleoption />  
      {/if}
  
      <div class="flex items-center mt-5 mx-16">
        <div class="w-3/4" />
        <div class="w-1/4 ">
          <button type="submit" class="btn bg-color hover:bg-color w-full mb-10 ">Submit</button>
        </div>
      </div>
  
      
  
    </form>
  </div>
  
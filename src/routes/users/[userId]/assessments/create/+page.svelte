<script lang="ts">

    import Fa from 'svelte-fa';
	import { faMultiply } from '@fortawesome/free-solid-svg-icons';
    import Tags from '../../../lib/components/tags.svelte';
    import Navbar from "../../../lib/components/nav/nav.svelte"


    let retrievedTags = '';
    let tagsPlaceholder = "Enter a tags here..."

    function handleTags(event) {
        retrievedTags = event.detail.tags;
    }

</script>
<Navbar />

<div>
    <div class=" breadcrumbs text-xl  text-[#7165E3] ml-14 mt-10">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Clinical</a></li>
            <li><a href="/">Assessment-template</a></li>
            <li>Create New</li>
        </ul>
    </div>

    <form method="post" class="w-full max-w-4xl  bg-[#ECE4FC] mt-6 mb-20  rounded-lg mx-auto">
        <div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
            <div class="ml-3 relative flex flex-row text-white text-xl">
                Create New Assessment-template
                <Fa icon={faMultiply} size="lg" class="absolute right-0 pr-3 " />
            </div>
        </div>

        <div class="hidden" name="assetCode"></div>

        <div class="flex items-center mb-4 mt-10 mx-16">
            <div class="w-1/3">
                		<!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="lable-text">Title*</label>
            </div>
            <div class="w-2/3">
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter assessment template name here..."
                    class="input input-bordered input-info w-full "
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
                    placeholder="Enter assessment description here..."
                />
            </div>
        </div>

        <div class="flex items-center my-4 mx-16">
            <div class="w-1/3">
                <label class="lable-text" for="version"> Display code</label>
            </div>
            <div class="w-2/3">
                <input name="" class="input input-bordered input-info w-full" placeholder="AssessmentTemp#cholDemo">
            </div>
        </div>
        <div class="flex items-center my-4 mx-16">
            <div class="w-1/3">
                <label class="lable-text" for="version"> Type</label>
            </div>
            <div class="w-2/3">
                <select class="select select-info w-full">
                    <option selected>Careplan</option>
                    <option>Auto</option>
                    <option>Dark mode</option>
                    <option>Light mode</option>
                  </select>
            </div>
        </div>
        <div class="flex items-center my-4 mx-16">
            <div class="w-1/3">
                <label class="lable-text" for="version">Provider</label>
            </div>
            <div class="w-2/3">
                <input name="" class="input input-bordered input-info w-full" placeholder="Rean">
            </div>
        </div>
 

        <div class="flex items-center my-4 mx-16">
            <div class="w-1/3">
                <label class="lable-text" for="version"> Provider assessment code </label>
            </div>
            <div class="w-2/3">
                <input name="" class="input input-bordered input-info w-full" placeholder="1">
            </div>
        </div>
        <div class="flex items-center my-4 mx-16">
            <div class="w-1/3">
                <label class="lable-text" for="version"> Servelist node childrenAt once </label>
            </div>
            <div class="w-2/3">
                <input name="" class="input input-bordered input-info w-full" placeholder="false">
            </div>
        </div>

        <div class="flex items-center mt-5 mx-16">
            <div class="w-3/4" />
            <div class="w-1/4 ">
                <button type="submit" class="btn btn-primary w-full mb-10 ">Submit</button>
            </div>
        </div>
    </form>

</div>
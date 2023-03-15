<script>
  import { fly, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  export let confirmTitle = 'Confirm';
  export let cancelTitle = 'Cancel';
  export let showDialog = false;

  const dispatch = createEventDispatcher();
  const handlelDeleteClick = async () => {
    dispatch('delete');
  };

  let functionToCall = {
    func: null,
    args: null
  };

 export async function callFunction() {
   await functionToCall['func'](...functionToCall['args']);
    showDialog = false;
  }

 export function confirm( func, ...args ) {
    functionToCall = { func, args };
    showDialog = true;
  }

</script>

<slot {confirm} />

{#if showDialog}
  <div class="overlay" in:fade={{ duration: 200 }} out:fade={{ delay: 200, duration: 200 }} />
  <div
    class="confirm-dialog"
    in:fly={{
      y: -10,
      delay: 200,
      duration: 200
    }}
    out:fly={{
      y: -10,
      duration: 200
    }}
  >
    <div class="message-section">
      <span class="message-title">
        <slot name="title">Are you sure you want to perform this action?</slot>
      </span>
      <span class="message-description">
        <slot name="description">This action can't be undone!</slot>
      </span>
    </div>
    <div class="actions bg-base-100">
      <button
        class=" btn btn-outline btn-primary btn-sm leading-none font-semibold text-lg pr-4 mr-4"
        on:click={() => (showDialog = false)}
      >
        <slot name="cancel">
          {cancelTitle}
        </slot>
      </button>
      <button
        class="btn btn-error text-base-100 btn-sm "
  
        on:click|preventDefault = {async () => {
         await handlelDeleteClick();
         await callFunction();
        }}
      >
        <slot name="confirm">
          {confirmTitle}
        </slot>
      </button>
    </div>
  </div>
{/if}

<style>
  .message-title {
    font-size: 22px;
    font-weight: 500;
    display: block;
    color: hsl(0, 0%, 20%);
    line-height: 1.2;
  }
  .message-description {
    display: block;
    margin-top: 20px;
    font-size: 16px;
    color: hsl(0, 0%, 30%);
    line-height: 1.4;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    margin: 25px -40px -30px;
    padding: 15px 20px;
    border-radius: 0 0 3px 3px;
  }
  .confirm-dialog {
    font-family: sans-serif;
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 40px;
    border-radius: 6px;
    background: #fff;
    max-width: 500px;
    width: calc(100% - 20px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  .overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    user-select: none;
    z-index: 998;
    background: hsla(0, 0%, 0%, 80%);
  }
  /* .confirm-button {
    background: hsl(200, 40%, 50%);
    background: var(--confirm-btn-bg);
    margin-left: 10px;
    border: none;
    outline: none;
    border-radius: 2px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    color: hsl(0, 0%, 95%);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  } */
  /* .confirm-button:hover {
    background: hsl(200, 40%, 55%);
    background: var(--confirm-btn-bg-hover);
  } */
  /* .cancel-button {
    border: none;
    outline: none;
    background: transparent;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    color: hsl(200, 40%, 50%);
    color: var(--cancel-btn-color);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  } */
  /* .cancel-button:hover {
    color: hsl(200, 40%, 55%);
    color: var(--cancel-btn-color-hover);
  } */
</style>

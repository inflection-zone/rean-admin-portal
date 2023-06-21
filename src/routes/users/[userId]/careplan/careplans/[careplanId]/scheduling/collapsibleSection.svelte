<script lang="ts">
	import Icon from '@iconify/svelte';
  export let headerText;
  export let color = '';
  export let paddingBottom = `${12}px`;
  export let paddingTop = `${12}px`;
  export let paddingLeft = `${20}px`;
  export let paddingRight = `${20}px`;
  let expanded = false;
  
</script>

<div class="collapsible pb-1 ml-3 first:pt-2 last:pb-6">
  <h3>
    <button
      type="button"
      style="--color:{color}; --paddingBottom:{paddingBottom}; --paddingTop:{paddingTop}; --paddingLeft:{paddingLeft}; paddingRight:{paddingRight}"
      class="text-lg pr-6"
      aria-expanded={expanded}
      on:click={() => (expanded = !expanded)}
      >{headerText}
      <svg viewBox="0 0 20 20" fill="none" class="pt-1 pr-3">
        {#if expanded == false}
        <Icon icon="material-symbols:keyboard-arrow-down-rounded" class="text-lg" />
        {:else}
        <Icon icon="material-symbols:keyboard-arrow-up-rounded" class="text-lg" />
        {/if}
      </svg>
    </button>
  </h3>
  <div class="content " hidden={!expanded}>
    <slot />
  </div>
</div>

<style>
  .collapsible {
    border-radius: 20px;
  }
  h3 {
    margin: 0;
  }
  button {
    display: flex;
    justify-content: space-between;
    width: 96%;
    /* border: 2px; */
    border-radius: 9px;
    margin: 13px;
    margin-left: 23px;
    background: var(--color);
    padding-bottom: var(--paddingBottom);
    padding-top: var(--paddingTop);
    padding-left: var(--paddingLeft);
    padding-right: var(--paddingRight);
    /* padding: 1em 0.5em; */
  }
  svg {
    height: 1.4em;
    width: 1.4em;
    margin-right: 5px;
  }
</style>

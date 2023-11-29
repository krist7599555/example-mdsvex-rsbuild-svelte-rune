<script lang="ts">
  let element = $state<HTMLElement>();
</script>

<article bind:this={element} class="prose mx-auto py-12">
  <slot {element} />
</article>

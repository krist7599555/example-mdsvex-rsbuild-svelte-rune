<script lang="ts">
  import { match } from "ts-pattern";
  const { people, color } = $props<{
    people: string;
    color: string;
  }>();
</script>

<div
  style:--color={color}
  style:--bg-color={color + "22"}
  data-nrm-component="chat"
  class="nrm-chat no-prose border-l-4 py-4 border-[var(--color)] bg-[var(--bg-color)] pl-4 my-4"
>
  <div class="font-bold mb-3" aria-label="{people} บอกว่า">{people}</div>
  <div class="prose">
    <slot />
  </div>
</div>

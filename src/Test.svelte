<script lang="ts" context="module">
  export const metadata = { title: "ชื่อ Title" };
  const { title } = metadata;
  export const HI = "9988";
</script>

<script lang="ts">
  import { match } from "ts-pattern";
  let count = $state(0);
  const height = {
    name: "9900",
    k: 13,
    hh: [1, 2, 3],
  } as const;
</script>

<h2>ohh {title}</h2>
<button on:click={() => (count += 1)}>inc</button>
{#each [1, 2, 3] as i}
  <button>{i}</button>
{/each}
<blockquote>
  <p>
    jarama<br />
    rnaja<br />
  </p>
  <blockquote>ohh</blockquote>
</blockquote>
<Chat people="น้องไนซ์" color="#FFAA00"
  ><p>okeee</p>
  <blockquote>
    <p>okeee</p>
  </blockquote>
  <ul>
    <li>okeee</li>
    <li>okeee</li>
    <li>okeee</li>
  </ul></Chat
>

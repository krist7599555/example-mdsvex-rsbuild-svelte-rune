<script lang="ts">
  import Article from "./Article.svelte";
  import { routes } from "./routes";
  import { pipe, A, F, O } from "@mobily/ts-belt";
  import { mount, tick } from "svelte";
  import { ViewVertical } from "radix-icons-svelte";
  import { fade } from "svelte/transition";
  import Chat from "./Chat.svelte";
  import { cn } from "./helper";
  let slug = $state<string>(routes[0].metadata.slug);
  let route = $derived(
    routes.find((r) => r.metadata.slug === slug) ?? routes[0]
  );
  let element = $state<HTMLElement | undefined>(undefined);
  let showNav = $state(false);
  $effect(() => {
    slug;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  $effect(() => {
    if (!element) return;
    // pipe(
    //   Array.from(element.querySelectorAll("article > p")),
    //   A.map((element) => ({
    //     element,
    //   }))
    // );

    // for (const p of Array.from(document.querySelectorAll("p"))) {
    //   for (const kw of ["mom:", "nice:", "member:"]) {
    //     if (p.innerHTML.startsWith(kw)) {
    //       const text = p.innerHTML.replaceAll(kw, "");
    //       p.innerHTML = "";
    //       mount(Chat, {
    //         target: p,
    //         props: {
    //           person: kw.slice(0, -1),
    //           text,
    //         },
    //       });
    //     }
    //   }
    // }
  });
</script>

{#await route.import() then component}
  <nav class="lg:hidden col-span-full border-b p-2">
    <button class="p-2" on:click={() => (showNav = !showNav)}>
      <ViewVertical />
    </button>
  </nav>
  <div bind:this={element} class="lg:grid grid-cols-[auto,1fr] relative">
    {#if showNav}
      <div
        class="absolute lg:hidden inset-0 bg-stone-800/60 h-screen"
        transition:fade={{ duration: 200 }}
        on:click|self={() => (showNav = false)}
      ></div>
    {/if}
    <aside
      class={cn(
        "fixed transition-transform translate-x-[-100%] lg:translate-x-0 bg-white border-r lg:block px-4 py-12 h-screen w-[300px] overflow-scroll lg:sticky top-0",
        { "translate-x-0": showNav }
      )}
    >
      <ol class="list-decimal list-inside">
        {#each routes as route}
          <li>
            <a
              role="button"
              href="/?blog={route.metadata.slug}"
              class="m-0 text-ellipsis overflow-hidden"
              class:text-slate-500={slug !== route.metadata.slug}
              class:text-orange-400={slug === route.metadata.slug}
              on:click|preventDefault={(e) => {
                slug = route.metadata.slug ?? undefined;
              }}>{route.metadata.title}</a
            >
          </li>
        {/each}
      </ol>
    </aside>

    <Article>
      <h1>{route.metadata.title}</h1>
      {#if route.metadata.tags}
        <div data-nrm="tags" class="-mt-2">
          {#each route.metadata.tags as tag}
            <span
              class="border-current border px-2 py-0.5 text-sm text-primary-500 rounded-md"
              >{tag}</span
            >
          {/each}
        </div>
      {/if}
      <svelte:component this={component.default} />
      <nav
        class="mt-12 no-prose mx-auto grid grid-cols-1 gap-4 place-content-center"
      >
        <!-- {@render link({ slug: routes[0].metadata.slug, title: "กลับหน้าแรก" })} -->
        {#if route.paginate.next}
          {@render link({
            ...route.paginate.next,
            before: "หน้าถัดไป",
            class: "py-4 text-lg",
          })}
        {/if}
      </nav>
    </Article>
  </div>
{/await}

{#snippet link({ slug: s, title, before, class: cls = "" }: { class?: string, before?: string, slug: string, title?: string })}
  <a
    href="/?blog={s}"
    class="border border-current bg-primary-100 font-bold text-primary-600 py-1 rounded-md text-center no-underline {cls}"
    on:click|preventDefault={(e) => {
      slug = s;
    }}
  >
    {#if before}
      <span class="text-sm text-stone-700">{before}</span>
    {/if}
    {title}
  </a>
{/snippet}

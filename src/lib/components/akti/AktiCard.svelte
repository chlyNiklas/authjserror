<script lang="ts">
	import { resolve } from '$app/paths';
	import { Rating } from 'flowbite-svelte';
	interface Akti {
		id: string;
		title: string;
		summary: string;
		rating?: number;
	}
	let { akti }: { akti: Akti } = $props();
</script>

<a
	href={resolve(`/akti/${akti.id}`)}
	class="w-full bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md flex flex-col items-start p-5 gap-5 hover:shadow-lg transition-shadow duration-200"
>
	<h4>{akti.title}</h4>
	<p class="text-left">{akti.summary}</p>

	{#if akti.rating}
		<Rating id="example-1b" total={5} size={30} rating={akti.rating} class="self-end mt-auto" />
	{/if}
</a>

<script lang="ts">
	import AktiCard from '$lib/components/akti/AktiCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-5">
	{#each data.aktis as akti (akti.id)}
		<AktiCard {akti}></AktiCard>
	{/each}
</div>

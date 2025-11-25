<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import { EditOutline, CloseOutline } from 'flowbite-svelte-icons';
	import AktiEditor from '$lib/components/akti/AktiEditor.svelte';
	import UserDisplay from '$lib/components/UserDisplay.svelte';

	let { data }: PageProps = $props();

	let edit = $state(false);
	$effect(() => {
		console.log(data);
	});
</script>

<div class="flex justify-between">
	<h2>{data.akti?.title} <span class="text-xs text-gray-400">v{data.akti.version}</span></h2>
	{#if data.session?.user?.id === data.akti.author?.id && data.akti.author?.id}
		<Button onclick={() => (edit = !edit)} color={edit ? 'gray' : 'primary'}>
			{#if edit}
				<CloseOutline class="shrink-0 h-6 w-6" />
			{:else}
				<EditOutline class="shrink-0 h-6 w-6 -mr-0.5 ml-0.5" />
			{/if}
		</Button>
	{:else}
		<div class="flex gap-5 items-center">
			<p>gschribe vo:</p>
			<UserDisplay user={data.akti.author} />
		</div>
	{/if}
</div>

{#if edit}
	<AktiEditor akti={data.akti} />
{:else}
	<div class="p-5 my-5 bg-gray-200 rounded-md">
		<h3 class="mb-2">Zämefassig</h3>
		<p>{data.akti.summary}</p>
	</div>
	{@html data.akti.body}
{/if}

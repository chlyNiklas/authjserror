<script lang="ts">
	import type { User } from '@auth/sveltekit';
	import { Avatar, Dropdown } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';
	import { twMerge, type ClassNameValue } from 'tailwind-merge';
	let {
		user,
		children,
		class: className
	}: { user: User; children?: Snippet; class?: ClassNameValue } = $props();

	let classList = $derived(twMerge('flex items-center gap-5', className));
</script>

{#if children}
	<button class={classList}>
		<Avatar src={user.image ?? undefined} />
		<p>{user.name}</p>
	</button>
	<Dropdown simple>
		{@render children?.()}
	</Dropdown>
{:else}
	<span class={classList}>
		<Avatar src={user.image ?? undefined} />
		<p>{user.name}</p>
	</span>
{/if}

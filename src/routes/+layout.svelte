<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		Button,
		Avatar
	} from 'flowbite-svelte';
	import type { LayoutProps } from './$types';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import UserDisplay from '$lib/components/UserDisplay.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<Navbar class="border-b border-gray-200 dark:border-gray-700">
	<NavBrand href="/">
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
			>Aktishare</span
		>
	</NavBrand>

	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
	</NavUl>

	{#if data.session?.user}
		<UserDisplay user={data.session.user}>
			<DropdownItem>
				<Button onclick={() => signOut()}>Sign out</Button>
			</DropdownItem>
		</UserDisplay>
	{:else}
		<Button onclick={() => signIn('nextcloud')}>Signin</Button>
	{/if}
</Navbar>
<main class="p-5 sm:px-20 2xl:px-60 flex flex-col h-full grow">
	{@render children()}
</main>

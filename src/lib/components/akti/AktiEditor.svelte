<script lang="ts">
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import RichText from '../RichText.svelte';
	interface Akti {
		title: string;
		summary: string;
		body: string;
	}
	let { akti }: { akti: Akti } = $props();
</script>

<form method="POST" class="flex flex-col gap-5">
	<div>
		<Label>Titu</Label>
		<Input value={akti.title} type="text" name="title" required minlength={5} />
	</div>
	<div>
		<Label>Zämefassig</Label>
		<Textarea value={akti.summary} name="summary" required minlength={5} class="w-full min-h-40" />
	</div>
	<div>
		<Label>Inhaut</Label>
		<RichText value={akti.body} name="body" required />
	</div>
	<Button type="submit" class="grow-0 self-end">Spichere</Button>
</form>

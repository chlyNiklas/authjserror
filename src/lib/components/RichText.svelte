<script lang="ts">
	import { FormatButtonGroup, TextEditor } from '@flowbite-svelte-plugins/texteditor';
	import type { Editor } from '@tiptap/core';
	import { Helper } from 'flowbite-svelte';

	let {
		value = $bindable('Hello World'),
		name,
		required = false,
		minlength
	}: { value?: string; name?: string; required?: boolean; minlength?: number } = $props();

	let editorInstance = $state<Editor | null>(null);
	let updating: boolean = false;

	$effect(() => {
		if (updating) {
			updating = false;
			return;
		}
		// Only update content if it is actually different to prevent cursor jumping
		if (editorInstance && editorInstance.getHTML() !== value) {
			editorInstance.commands.setContent(value);
		}
	});

	$effect(() => {
		if (!editorInstance) return;

		editorInstance.on('update', (editor) => {
			updating = true;
			const content = editor.editor.getHTML();
			errorMessage = '';

			if (editor.editor.isEmpty) {
				value = '';
			} else {
				value = content;
			}
		});
	});
	let errorMessage = $state('');
	// Derived state to easily toggle classes
</script>

<div class="relative group">
	<TextEditor
		bind:editor={editorInstance}
		content="<p></p> <p></p>"
		contentprops={{ id: 'formats-ex' }}
	>
		<FormatButtonGroup editor={editorInstance} />
	</TextEditor>

	{#if name}
		<input
			type="text"
			{name}
			bind:value
			{required}
			minlength={minlength ? minlength + 6 : undefined}
			tabindex="-1"
			style="opacity: 0; position: absolute; pointer-events: none; z-index: -1; bottom: 0; left: 50%; height: 0; width: 0;"
			oninvalid={(e) => {
				const target = e.target as HTMLInputElement;

				// 1. Read the message (e.g., "Please fill out this field.")
				errorMessage = target.validationMessage;
				editorInstance?.commands.focus();
			}}
		/>
	{/if}
</div>
{#if errorMessage}
	<Helper class="mt-2" color="red">
		{errorMessage}
	</Helper>
{/if}

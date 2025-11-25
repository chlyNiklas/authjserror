<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex items-center justify-center grow">
	<h3>{page.status}: {page.error?.message ?? 'Upsi, da isch öppis kaputt gange...'}</h3>
</div>

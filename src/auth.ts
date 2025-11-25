import { SvelteKitAuth } from '@auth/sveltekit';
import Nextcloud from '@auth/sveltekit/providers/nextcloud';
import {
	AUTH_NEXTCLOUD_ID,
	AUTH_NEXTCLOUD_SECRET,
	AUTH_NEXTCLOUD_ISSUER,
	AUTH_TRUST_HOST
} from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: AUTH_TRUST_HOST === 'true',
	  adapter: DrizzleAdapter(db),
	providers: [
		Nextcloud({
			clientId: AUTH_NEXTCLOUD_ID,
			clientSecret: AUTH_NEXTCLOUD_SECRET,
			issuer: AUTH_NEXTCLOUD_ISSUER
		})
	]
});

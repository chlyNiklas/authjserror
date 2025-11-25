import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { extractFormData } from '$lib/extractFormData';
import { resolve } from '$app/paths';

import * as v from 'valibot';
import { ensureAuth } from '$lib/auth';
import { db } from '$lib/server/db';
import { aktis } from '$lib/server/db/schema';
export const load: PageServerLoad = async (event) => {
	await ensureAuth(event);
	return {};
};
export const actions = {
	default: async (event) => {
		const user = await ensureAuth(event);

		const akti = (
			await extractFormData(
				event.request,
				v.object({
					title: v.pipe(v.string(), v.minLength(5)),
					summary: v.pipe(v.string(), v.minLength(5)),
					body: v.pipe(v.string(), v.minLength(5))
				})
			)
		).data;

		if (!akti) return {};
		console.log(user);

		const res = await db
			.insert(aktis)
			.values({ ...akti, author: user.id })
			.returning({ id: aktis.id });

		return redirect(303, resolve(`/akti/[aktiId]`, { aktiId: res[0].id }));
	}
} satisfies Actions;

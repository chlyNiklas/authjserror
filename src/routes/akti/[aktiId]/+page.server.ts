import { db } from '$lib/server/db';
import { aktis, ratings } from '$lib/server/db/schema';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { ensureAuth } from '$lib/auth';
import { extractFormData } from '$lib/extractFormData';
import * as v from 'valibot';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async (event) => {
	const akti = await db.query.aktis.findFirst({
		where: eq(aktis.id, event.params.aktiId),
		with: { author: true }
	});
	console.log(akti);
	const r = await db.query.ratings.findMany({
		with: { user: true },
		where: eq(ratings.aktiId, event.params.aktiId)
	});

	if (!akti) {
		error(404, { message: 'Die Akti gits garnid, sorry...' });
	}

	return {
		akti,
		ratings: r
	};
};
export const actions = {
	default: async (event) => {
		const user = await ensureAuth(event);

		if (!event.params.aktiId) return error(404);

		const akti = await db
			.select({ id: aktis.id, version: aktis.version, author: aktis.author })
			.from(aktis)
			.limit(1)
			.where(eq(aktis.id, event.params.aktiId));

		if (!akti || akti.length == 0) return error(404);
		if (akti[0].author != user.id) return error(403);

		const changeRequest = (
			await extractFormData(
				event.request,
				v.object({
					title: v.pipe(v.string(), v.minLength(5)),
					summary: v.pipe(v.string(), v.minLength(5)),
					body: v.pipe(v.string(), v.minLength(5))
				})
			)
		).data;

		if (!changeRequest) return error(400);

		console.log('User ID before akti insert:', user.id); // Added log

		const res = await db
			.insert(aktis)
			.values({ ...changeRequest, author: user.id, version: akti[0].version + 1 })
			.returning({ id: aktis.id });

		return redirect(303, resolve(`/akti/[aktiId]`, { aktiId: res[0].id }));
	}
} satisfies Actions;

import { db } from '$lib/server/db';
import { aktis, ratings } from '$lib/server/db/schema';
import { avg, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const a = await db
		.select({
			id: aktis.id,
			title: aktis.title,
			summary: aktis.summary,
			rating: avg(ratings.rating)
		})
		.from(aktis)
		.leftJoin(ratings, eq(aktis.id, ratings.aktiId))
		.groupBy(aktis.id, aktis.title, aktis.summary);

	return {
		aktis: a.map((a) => ({ ...a, rating: a.rating ? parseFloat(a.rating) : undefined }))
	};
};

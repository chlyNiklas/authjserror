import type { Session, User } from '@auth/sveltekit';
import { error } from '@sveltejs/kit';
import { db } from './server/db';
import { users } from './server/db/schema';
import { eq } from 'drizzle-orm';
interface Event {
	locals: {
		auth(): Promise<Session | null>;
	};
}

export async function ensureAuth(event: Event): Promise<User> {
	const session = await getSession(event);
	if (!session) error(401, { message: 'Du muesch di zersch iiloge' });
	return session.user;
}

export async function getSession(event: Event) {
	const session = await event.locals.auth();
	if (!session) return null;
	if (!session.user) error(403, { message: 'Di gits garnid. Vilich nomau usloge u iiloge?' });

	const res = await db
		.select({ id: users.id })
		.from(users)
		.limit(1)
		.where(eq(users.email, session.user.email ?? 'eaf9302d-9525-4f3e-8147-9620d2076f67')); //uuid as default to find nothing

	if (!res[0]?.id) {
		error(403, { message: 'Di gits garnid. Vilich nomau usloge u iiloge?' });
	}

	return { expires: session.expires, user: { ...session.user, id: res[0].id } };
}

import { getSession as getSession } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await getSession(event);

	return {
		session
	};
};

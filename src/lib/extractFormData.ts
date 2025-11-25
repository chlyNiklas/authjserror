/*
 * Code from: https://jovianmoon.io/posts/sveltekit-form-validation-with-valibot
 */
import { dev } from '$app/environment';
import * as v from 'valibot';

export const extractFormData = async <TInput = unknown, TOutput = TInput>(
	request: Request,
	schema: v.BaseSchema<TInput, TOutput, v.BaseIssue<unknown>>
): Promise<{
	data: TOutput | undefined;
	error: string | null;
}> => {
	try {
		const formData = await request.formData();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result: Record<string, any> = {};

		// Convert form data to an object with proper handling of multiple values
		formData.forEach((value, key) => {
			// Case 1: First time encountering this key
			if (result[key] === undefined) {
				result[key] = value;
			}
			// Case 2: Key exists and is already an array, add new value
			else if (Array.isArray(result[key])) {
				result[key].push(value);
			}
			// Case 3: Key exists but isn't an array yet, convert to array with both values
			else {
				result[key] = [result[key], value];
			}
		});

		const validation = v.safeParse(schema, result);
		if (!validation.success) {
			if (dev) {
				console.error('Validation errors:');
				for (const error of validation.issues) {
					console.error(`- ${error.message}`);
				}
			}
			if (validation.issues && validation.issues.length > 0) {
				return {
					data: undefined,
					error: validation.issues.map((issue) => issue.message).join(', ')
				};
			}
			return {
				data: undefined,
				error: 'Error validating form submission, please check everything carefully.'
			};
		}

		return { data: validation.output as TOutput, error: null };
	} catch (error) {
		if (dev) {
			console.error(`Error extracting form data: ${error}`);
		}
		return { data: undefined, error: `Error extracting form data: ${error}` };
	}
};

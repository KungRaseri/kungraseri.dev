import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function calculatePasswordStrength(password: string) {
	let score = 0;
	const feedback: string[] = [];

	// Length check
	if (password.length >= 8) score += 1;
	if (password.length >= 12) score += 1;
	if (password.length >= 16) score += 1;
	if (password.length < 8) feedback.push('Password should be at least 8 characters');

	// Character variety
	if (/[a-z]/.test(password)) score += 1;
	else feedback.push('Add lowercase letters');

	if (/[A-Z]/.test(password)) score += 1;
	else feedback.push('Add uppercase letters');

	if (/[0-9]/.test(password)) score += 1;
	else feedback.push('Add numbers');

	if (/[^a-zA-Z0-9]/.test(password)) score += 1;
	else feedback.push('Add special characters');

	// Complexity bonuses
	if (password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
		score += 2; // Bonus for good combination
	}

	// Common patterns penalties
	if (/(.)\1{2,}/.test(password)) {
		score -= 1;
		feedback.push('Avoid repeated characters');
	}

	if (/^[0-9]+$/.test(password)) {
		score -= 2;
		feedback.push('Avoid only numbers');
	}

	if (/^[a-zA-Z]+$/.test(password)) {
		score -= 1;
		feedback.push('Mix letters with other characters');
	}

	if (/^(password|12345|qwerty|abc123|letmein|admin)/i.test(password)) {
		score -= 3;
		feedback.push('Avoid common passwords');
	}

	// Ensure score is in range
	score = Math.max(0, Math.min(10, score));

	let strength: 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';
	let color: string;

	if (score <= 3) {
		strength = 'weak';
		color = '#ef4444';
	} else if (score <= 5) {
		strength = 'fair';
		color = '#f59e0b';
	} else if (score <= 7) {
		strength = 'good';
		color = '#eab308';
	} else if (score <= 8) {
		strength = 'strong';
		color = '#22c55e';
	} else {
		strength = 'very-strong';
		color = '#10b981';
	}

	return {
		score,
		maxScore: 10,
		percentage: (score / 10) * 100,
		strength,
		color,
		feedback: feedback.length > 0 ? feedback : ['Great password!'],
		hasLowercase: /[a-z]/.test(password),
		hasUppercase: /[A-Z]/.test(password),
		hasNumbers: /[0-9]/.test(password),
		hasSpecial: /[^a-zA-Z0-9]/.test(password),
		length: password.length
	};
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { password } = await request.json();

		if (password === undefined) {
			return json({ error: 'Password is required' }, { status: 400 });
		}

		const result = calculatePasswordStrength(password);

		return json(result);
	} catch {
		return json({ error: 'Failed to analyze password' }, { status: 500 });
	}
};

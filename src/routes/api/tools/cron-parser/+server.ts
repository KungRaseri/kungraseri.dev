import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function parseCronExpression(expression: string): string {
	const parts = expression.trim().split(/\s+/);
	
	if (parts.length !== 5) {
		throw new Error('Invalid cron expression. Expected 5 parts: minute hour day month weekday');
	}

	const [minute, hour, day, month, weekday] = parts;

	const descriptions: string[] = [];

	// Minute
	if (minute === '*') {
		descriptions.push('every minute');
	} else if (minute.includes('/')) {
		const [, interval] = minute.split('/');
		descriptions.push(`every ${interval} minutes`);
	} else if (minute.includes(',')) {
		descriptions.push(`at minutes ${minute}`);
	} else {
		descriptions.push(`at minute ${minute}`);
	}

	// Hour
	if (hour === '*') {
		descriptions.push('every hour');
	} else if (hour.includes('/')) {
		const [, interval] = hour.split('/');
		descriptions.push(`every ${interval} hours`);
	} else if (hour.includes(',')) {
		descriptions.push(`at hours ${hour}`);
	} else {
		descriptions.push(`at hour ${hour}`);
	}

	// Day
	if (day !== '*') {
		if (day.includes(',')) {
			descriptions.push(`on days ${day}`);
		} else {
			descriptions.push(`on day ${day}`);
		}
	}

	// Month
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	if (month !== '*') {
		if (month.includes(',')) {
			const monthNames = month.split(',').map(m => months[parseInt(m) - 1] || m).join(', ');
			descriptions.push(`in ${monthNames}`);
		} else {
			descriptions.push(`in ${months[parseInt(month) - 1] || month}`);
		}
	}

	// Weekday
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	if (weekday !== '*') {
		if (weekday.includes(',')) {
			const dayNames = weekday.split(',').map(d => weekdays[parseInt(d)] || d).join(', ');
			descriptions.push(`on ${dayNames}`);
		} else {
			descriptions.push(`on ${weekdays[parseInt(weekday)] || weekday}`);
		}
	}

	return descriptions.join(', ');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { expression } = await request.json();

		if (!expression) {
			return json({ error: 'Cron expression is required' }, { status: 400 });
		}

		const description = parseCronExpression(expression);

		return json({ description, isValid: true });
	} catch (err) {
		return json({
			error: err instanceof Error ? err.message : 'Invalid cron expression',
			isValid: false
		}, { status: 400 });
	}
};

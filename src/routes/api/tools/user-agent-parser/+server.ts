import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface ParsedUA {
	browser: string;
	browserVersion: string;
	os: string;
	osVersion: string;
	device: string;
	isBot: boolean;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

function parseUserAgent(ua: string): ParsedUA {
	let browser = 'Unknown';
	let browserVersion = '';
	let os = 'Unknown';
	let osVersion = '';
	let device = 'Unknown';
	let isBot = false;
	let isMobile = false;
	let isTablet = false;
	let isDesktop = false;

	// Bot detection
	if (/bot|crawler|spider|scraper/i.test(ua)) {
		isBot = true;
		if (/Googlebot/.test(ua)) browser = 'Googlebot';
		else if (/bingbot/.test(ua)) browser = 'Bingbot';
		else if (/Slackbot/.test(ua)) browser = 'Slackbot';
		else browser = 'Bot';
	}

	// Browser detection
	if (!isBot) {
		if (/Edg\//.test(ua)) {
			browser = 'Microsoft Edge';
			browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] || '';
		} else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) {
			browser = 'Chrome';
			browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || '';
		} else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
			browser = 'Safari';
			browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || '';
		} else if (/Firefox\//.test(ua)) {
			browser = 'Firefox';
			browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || '';
		} else if (/MSIE|Trident/.test(ua)) {
			browser = 'Internet Explorer';
			browserVersion = ua.match(/(?:MSIE |rv:)([\d.]+)/)?.[1] || '';
		} else if (/Opera|OPR/.test(ua)) {
			browser = 'Opera';
			browserVersion = ua.match(/(?:Opera|OPR)\/([\d.]+)/)?.[1] || '';
		}
	}

	// OS detection
	if (/Windows NT 10/.test(ua)) {
		os = 'Windows';
		osVersion = '10/11';
	} else if (/Windows NT 6.3/.test(ua)) {
		os = 'Windows';
		osVersion = '8.1';
	} else if (/Windows NT 6.2/.test(ua)) {
		os = 'Windows';
		osVersion = '8';
	} else if (/Windows NT 6.1/.test(ua)) {
		os = 'Windows';
		osVersion = '7';
	} else if (/Mac OS X ([\d_]+)/.test(ua)) {
		os = 'macOS';
		osVersion = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
	} else if (/Android ([\d.]+)/.test(ua)) {
		os = 'Android';
		osVersion = ua.match(/Android ([\d.]+)/)?.[1] || '';
		isMobile = true;
	} else if (/iPhone OS ([\d_]+)/.test(ua)) {
		os = 'iOS';
		osVersion = ua.match(/iPhone OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
		isMobile = true;
	} else if (/iPad/.test(ua)) {
		os = 'iOS';
		osVersion = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
		isTablet = true;
	} else if (/Linux/.test(ua)) {
		os = 'Linux';
	}

	// Device type
	if (isTablet) {
		device = 'Tablet';
	} else if (isMobile) {
		device = 'Mobile';
	} else if (!isBot) {
		device = 'Desktop';
		isDesktop = true;
	}

	// Specific device models
	if (/iPhone/.test(ua)) device = 'iPhone';
	else if (/iPad/.test(ua)) device = 'iPad';
	else if (/Android/.test(ua)) {
		const model = ua.match(/Android.*;\s*([^)]+)\s*Build/)?.[1];
		if (model) device = model.trim();
	}

	return {
		browser,
		browserVersion,
		os,
		osVersion,
		device,
		isBot,
		isMobile,
		isTablet,
		isDesktop
	};
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userAgent } = await request.json();

		if (!userAgent) {
			return json({ error: 'User agent string is required' }, { status: 400 });
		}

		const parsed = parseUserAgent(userAgent);

		return json(parsed);
	} catch {
		return json({ error: 'Failed to parse user agent' }, { status: 500 });
	}
};

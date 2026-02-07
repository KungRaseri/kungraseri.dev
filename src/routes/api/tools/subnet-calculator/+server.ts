import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function ipToInt(ip: string): number {
	return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet), 0) >>> 0;
}

function intToIp(int: number): string {
	return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
}

function calculateSubnet(ip: string, cidr: number) {
	const ipInt = ipToInt(ip);
	const maskInt = (-1 << (32 - cidr)) >>> 0;
	const networkInt = (ipInt & maskInt) >>> 0;
	const broadcastInt = (networkInt | ~maskInt) >>> 0;
	const firstHostInt = networkInt + 1;
	const lastHostInt = broadcastInt - 1;

	const totalHosts = Math.pow(2, 32 - cidr);
	const usableHosts = Math.max(0, totalHosts - 2);

	return {
		network: intToIp(networkInt),
		broadcast: intToIp(broadcastInt),
		mask: intToIp(maskInt),
		firstHost: cidr === 32 ? intToIp(networkInt) : intToIp(firstHostInt),
		lastHost: cidr === 32 ? intToIp(networkInt) : intToIp(lastHostInt),
		totalHosts,
		usableHosts,
		cidr,
		wildcardMask: intToIp(~maskInt >>> 0)
	};
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { ip, cidr } = await request.json();

		if (!ip) {
			return json({ error: 'IP address is required' }, { status: 400 });
		}

		if (cidr === undefined || cidr < 0 || cidr > 32) {
			return json({ error: 'CIDR must be between 0 and 32' }, { status: 400 });
		}

		// Validate IP
		const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
		if (!ipRegex.test(ip)) {
			return json({ error: 'Invalid IP address format' }, { status: 400 });
		}

		const octets = ip.split('.').map(Number);
		if (octets.some((octet: number) => octet < 0 || octet > 255)) {
			return json({ error: 'IP octets must be between 0 and 255' }, { status: 400 });
		}

		const result = calculateSubnet(ip, cidr);

		return json(result);
	} catch {
		return json({ error: 'Failed to calculate subnet' }, { status: 500 });
	}
};

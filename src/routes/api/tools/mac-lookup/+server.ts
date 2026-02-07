import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Common MAC address vendor prefixes (OUI - Organizationally Unique Identifier)
const macPrefixes: Record<string, string> = {
	'00:00:0C': 'Cisco Systems',
	'00:01:42': 'Cisco Systems',
	'00:03:47': 'Intel Corporation',
	'00:04:23': 'Apple, Inc.',
	'00:05:02': 'Apple, Inc.',
	'00:0A:95': 'Apple, Inc.',
	'00:0D:93': 'Apple, Inc.',
	'00:10:FA': 'Apple, Inc.',
	'00:11:24': 'Apple, Inc.',
	'00:13:72': 'Dell Inc.',
	'00:14:22': 'Dell Inc.',
	'00:15:5D': 'Microsoft Corporation',
	'00:16:CB': 'Apple, Inc.',
	'00:17:F2': 'Apple, Inc.',
	'00:18:8B': 'Dell Inc.',
	'00:19:5B': 'Apple, Inc.',
	'00:1A:A0': 'Dell Inc.',
	'00:1B:63': 'Apple, Inc.',
	'00:1C:42': 'Apple, Inc.',
	'00:1D:4F': 'Apple, Inc.',
	'00:1E:52': 'Apple, Inc.',
	'00:1F:5B': 'Apple, Inc.',
	'00:1F:F3': 'Apple, Inc.',
	'00:21:E9': 'Dell Inc.',
	'00:22:41': 'Apple, Inc.',
	'00:23:12': 'Apple, Inc.',
	'00:23:32': 'Apple, Inc.',
	'00:23:6C': 'Apple, Inc.',
	'00:23:DF': 'Apple, Inc.',
	'00:24:36': 'Apple, Inc.',
	'00:25:00': 'Apple, Inc.',
	'00:25:4B': 'Apple, Inc.',
	'00:25:BC': 'Apple, Inc.',
	'00:26:08': 'Apple, Inc.',
	'00:26:B0': 'Apple, Inc.',
	'00:26:BB': 'Apple, Inc.',
	'00:50:56': 'VMware, Inc.',
	'00:0C:29': 'VMware, Inc.',
	'00:1C:14': 'VMware, Inc.',
	'08:00:27': 'Oracle VirtualBox',
	'52:54:00': 'QEMU/KVM',
	'B8:27:EB': 'Raspberry Pi Foundation',
	'DC:A6:32': 'Raspberry Pi Foundation',
	'E4:5F:01': 'Raspberry Pi Foundation',
	'28:CD:C1': 'Raspberry Pi Foundation',
	'B4:2E:99': 'Amazon Technologies Inc.',
	'70:B3:D5': 'TP-Link Technologies',
	'F8:1A:67': 'TP-Link Technologies',
	'50:C7:BF': 'TP-Link Technologies',
	'00:50:F2': 'Microsoft Corporation',
	'AC:DE:48': 'Intel Corporation',
	'00:1B:77': 'Intel Corporation',
	'A4:5E:60': 'Intel Corporation'
};

function normalizeMac(mac: string): string {
	// Remove any separators and normalize
	const cleaned = mac.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
	
	if (cleaned.length !== 12) {
		throw new Error('Invalid MAC address length');
	}

	// Format as XX:XX:XX:XX:XX:XX
	return cleaned.match(/.{1,2}/g)?.join(':') || '';
}

function lookupVendor(mac: string): string {
	const prefix = mac.substring(0, 8); // First 3 octets (XX:XX:XX)
	return macPrefixes[prefix] || 'Unknown Vendor';
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { mac } = await request.json();

		if (!mac) {
			return json({ error: 'MAC address is required' }, { status: 400 });
		}

		try {
			const normalized = normalizeMac(mac);
			const vendor = lookupVendor(normalized);
			const prefix = normalized.substring(0, 8);

			return json({
				mac: normalized,
				vendor,
				prefix,
				note: 'This is a limited offline database. For complete lookups, use an online MAC address database.'
			});
		} catch (err) {
			return json({ error: err instanceof Error ? err.message : 'Invalid MAC address' }, { status: 400 });
		}
	} catch {
		return json({ error: 'Failed to lookup MAC address' }, { status: 500 });
	}
};

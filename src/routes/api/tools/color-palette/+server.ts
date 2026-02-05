import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function hexToHSL(hex: string): [number, number, number] {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;
	
	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		
		switch (max) {
			case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
			case g: h = ((b - r) / d + 2) / 6; break;
			case b: h = ((r - g) / d + 4) / 6; break;
		}
	}
	
	return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
	h = h / 360;
	s = s / 100;
	l = l / 100;
	
	let r, g, b;
	
	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1/6) return p + (q - p) * 6 * t;
			if (t < 1/2) return q;
			if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		};
		
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}
	
	const toHex = (x: number) => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { baseColor, mode, scheme } = await request.json();
		
		if (!baseColor) {
			return json({ error: 'Base color is required' }, { status: 400 });
		}
		
		const [h, s, l] = hexToHSL(baseColor);
		let colors: string[] = [];
		
		if (mode === 'material') {
			const shades = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10];
			colors = shades.map(lightness => hslToHex(h, s, lightness));
		} else {
			// Harmony mode
			switch (scheme) {
				case 'monochromatic':
					colors = [
						hslToHex(h, s, Math.max(10, l - 30)),
						hslToHex(h, s, Math.max(10, l - 15)),
						baseColor,
						hslToHex(h, s, Math.min(90, l + 15)),
						hslToHex(h, s, Math.min(90, l + 30))
					];
					break;
				
				case 'complementary':
					colors = [
						baseColor,
						hslToHex((h + 180) % 360, s, l)
					];
					break;
				
				case 'triadic':
					colors = [
						baseColor,
						hslToHex((h + 120) % 360, s, l),
						hslToHex((h + 240) % 360, s, l)
					];
					break;
				
				case 'analogous':
					colors = [
						hslToHex((h - 30 + 360) % 360, s, l),
						baseColor,
						hslToHex((h + 30) % 360, s, l)
					];
					break;
				
				case 'split-complementary':
					colors = [
						baseColor,
						hslToHex((h + 150) % 360, s, l),
						hslToHex((h + 210) % 360, s, l)
					];
					break;
				
				default:
					colors = [baseColor];
			}
		}
		
		return json({ colors });
	} catch {
		return json({ error: 'Failed to generate palette' }, { status: 500 });
	}
};

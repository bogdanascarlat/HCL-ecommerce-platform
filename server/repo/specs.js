import { readFileSync } from 'fs';

const specsData = readFileSync(new URL('./specs.json', import.meta.url));
export const specs = JSON.parse(specsData);
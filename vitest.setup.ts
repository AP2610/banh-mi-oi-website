import '@testing-library/jest-dom/vitest';

import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

if ((!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) && existsSync('.env.local')) {
    loadEnvFile('.env.local');
}

import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

// Clears the Draft Mode cookie so subsequent requests use published Sanity
// content again. Presentation knows this route, but it is also safe to open
// directly when a browser has been left in preview mode.
export const GET = async (request: Request) => {
    (await draftMode()).disable();

    return NextResponse.redirect(new URL('/', request.url));
};

'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

/**
 * PostHog para el sitio publico. El autocapture registra los clics en los
 * enlaces de WhatsApp, `tel:` y `mailto:` (las conversiones del dashboard).
 * Sin `NEXT_PUBLIC_POSTHOG_KEY` no hace nada.
 */
export const PostHogAnalytics = () => {
    useEffect(() => {
        if (!KEY || posthog.__loaded) return;

        posthog.init(KEY, {
            api_host: HOST,
            capture_pageview: 'history_change',
            autocapture: true,
            person_profiles: 'identified_only',
        });
    }, []);

    return null;
};

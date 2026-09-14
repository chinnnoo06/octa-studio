import type { Page } from 'playwright';

export interface DismissResult {
  dismissed: string[];
  failed: string[];
  hadOverlay: boolean;
}

const ACCEPT_SELECTORS = [
  '#onetrust-accept-btn-handler',
  '#onetrust-close-btn-container button',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '#CybotCookiebotDialogBodyButtonAccept',
  '[data-testid="uc-accept-all-button"]',
  'button:text-is("Accept all")',
  'button:text-is("Accept All")',
  'button:text-is("Accept All Cookies")',
  'button:text-is("Accept")',
  'button:text-is("I accept")',
  'button:text-is("Got it")',
  'button:text-is("Got It")',
  'button:text-is("OK")',
  'button:text-is("Agree")',
  'button:text-is("Agree & Close")',
  'button:text-is("Allow all")',
  'button:text-is("Allow All")',
  'button:text-is("Close")',
  'button:text-is("Cerrar")',
  'button:text-is("Aceptar")',
  'button:text-is("Aceptar todo")',
  'a:text-is("Accept")',
  '[aria-label="Close"]',
  '[aria-label="close"]',
  '[aria-label="Dismiss"]',
  '[aria-label="dismiss"]',
  '[data-dismiss="modal"]',
  '[data-close]',
  '[role="dialog"] button[aria-label*="close" i]',
  '[role="dialog"] button[aria-label*="cerrar" i]',
];

export async function dismissOverlays(page: Page): Promise<DismissResult> {
  const dismissed: string[] = [];
  const failed: string[] = [];

  const hadOverlay = await page.evaluate(() => {
    const sels = [
      '[role="dialog"]', '[role="alertdialog"]',
      '.cookie-banner', '.cookie-notice', '.cookie-consent',
      '#cookie-banner', '#cookie-notice', '#cookiebanner',
      '#onetrust-consent-sdk', '#CybotCookiebotDialog',
      '[class*="consent"]', '[class*="gdpr"]', '[class*="privacy-banner"]',
      '[class*="newsletter-modal"]',
    ];
    return sels.some((sel) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) return false;
      const s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
    });
  }).catch(() => false);

  if (hadOverlay) {
    for (const selector of ACCEPT_SELECTORS) {
      try {
        const el = page.locator(selector).first();
        const visible = await el.isVisible({ timeout: 400 }).catch(() => false);
        if (!visible) continue;
        await el.click({ timeout: 1500 });
        await page.waitForTimeout(500);
        dismissed.push(selector);
        break;
      } catch {
        /* siguiente */
      }
    }
  }

  // Fallback JS: ocultar overlays que sigan visibles
  const remaining = await page.evaluate(() => {
    const OVERLAY_SELECTORS = [
      '[id*="cookie"]', '[id*="consent"]', '[id*="gdpr"]',
      '[class*="cookie-banner"]', '[class*="cookie-notice"]', '[class*="consent"]',
      '[class*="gdpr"]', '[class*="newsletter-modal"]', '[class*="popup-overlay"]',
    ];
    const removed: string[] = [];
    for (const sel of OVERLAY_SELECTORS) {
      for (const el of Array.from(document.querySelectorAll(sel)) as HTMLElement[]) {
        const s = getComputedStyle(el);
        if (s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0') {
          el.style.display = 'none';
          removed.push(sel);
        }
      }
    }
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.touchAction = '';
    return removed;
  }).catch(() => [] as string[]);

  if (remaining.length > 0) {
    dismissed.push(...remaining.map((s) => `(JS) ${s}`));
    await page.waitForTimeout(300);
  }

  // Chat widgets: no bloquean pero salen en screenshots
  await page.evaluate(() => {
    const CHAT = [
      '#intercom-container', '#drift-widget', '.crisp-client',
      '#hubspot-messages-iframe-container', '#freshworks-container',
      '[id*="chat-widget"]', '[class*="chat-bubble"]',
    ];
    for (const sel of CHAT) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) el.style.display = 'none';
    }
  }).catch(() => {});

  return { dismissed, failed, hadOverlay };
}

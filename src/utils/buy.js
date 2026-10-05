import { PRETYPED_MESSAGE, INSTAGRAM_PROFILE_URL, DM_HANDLE } from '../config';

/**
 * Directly opens Instagram DMs with the pre-typed message asking for the book:
 * 1. Copies the pre-typed message to clipboard as an instant backup
 * 2. Directly opens https://ig.me/m/deepfocusacademy?text=... (Meta's official Instagram DM link)
 * 3. Emits event for clear on-screen confirmation
 */
export async function buyNow(customMessage) {
  const message = customMessage || PRETYPED_MESSAGE;
  const dmUrl = `https://ig.me/m/${DM_HANDLE}?text=${encodeURIComponent(message)}`;
  let copied = false;

  // 1. Copy the pre-typed message to clipboard
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(message);
      copied = true;
    } else {
      // Fallback for non-HTTPS / older webviews
      const textArea = document.createElement('textarea');
      textArea.value = message;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.warn('Clipboard write error:', err);
  }

  // 2. Directly open Instagram DMs with the pre-typed message
  try {
    window.open(dmUrl, '_blank', 'noopener,noreferrer');
  } catch (err) {
    console.warn('window.open blocked, falling back to window.location.href:', err);
    window.location.href = dmUrl;
  }

  // 3. Dispatch an event for on-screen Toast feedback
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('ebook:buy-now', {
        detail: {
          message,
          copied,
          url: dmUrl,
          profileUrl: INSTAGRAM_PROFILE_URL
        }
      })
    );
  }

  return { copied, message, url: dmUrl };
}

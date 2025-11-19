import React, { useState } from 'react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { useLang } from './LanguageProvider';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  /** Text content that will be copied to clipboard */
  text: string;
  /** Optional callback invoked after successful copy */
  onCopy?: () => void;
}

export default function CopyButton({
  text,
  onCopy,
  disabled,
  ...btnProps
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

  async function handleCopy() {
    if (!text) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      onCopy?.();
      window.setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // swallow copy errors; caller can still observe failure via UI
    }
  }

  return (
    <Button
      onClick={handleCopy}
      disabled={disabled || !text}
      {...btnProps}
    >
      {copied ? t('Copied') : t('Copy')}
    </Button>
  );
}

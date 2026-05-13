export const RELIGION_ICONS: Record<string, { emoji: string; label: string }> = {
  Masjid: { emoji: '🕌', label: 'Islam' },
  Mushalla: { emoji: '🕌', label: 'Islam' },
  Gereja: { emoji: '⛪', label: 'Kristen' },
  Pura: { emoji: '🕉️', label: 'Hindu' },
  Vihara: { emoji: '☸️', label: 'Buddha' },
  Klenteng: { emoji: '☯️', label: 'Konghucu' },
};

export const getReligionInfo = (type: string) => {
  return RELIGION_ICONS[type] || { emoji: '🛐', label: type };
};

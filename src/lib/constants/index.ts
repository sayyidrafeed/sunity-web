/**
 * Application constants and strings
 * Note: For future localization, migrate these strings to an i18n system
 */

export const APP_NAME = 'Sunity';

export const LOGIN_PAGE = {
  HEADING: 'Bersama Hadirkan Energi Bersih untuk Rumah Ibadah.',
  DESCRIPTION:
    'Akses panel administrator untuk mengelola sistem, memantau kontribusi, dan mendukung misi menghadirkan energi bersih yang berkelanjutan bagi rumah ibadah.',
  SIGN_IN_HEADING: 'Sign In',
  SIGN_IN_DESCRIPTION: 'Lanjutkan dengan akun Google untuk masuk sebagai administrator.',
  BUTTON_IDLE: 'Masuk dengan Google',
  BUTTON_LOADING: 'Memproses..',
  ERROR_MESSAGE: 'Gagal masuk dengan Google. Silakan coba lagi.',
} as const;

export const IMAGES = {
  BACKGROUND_THUNDER: '/thunder-bg.avif',
  SOLAR_PANEL: '/solar-panel.svg',
  GOOGLE_ICON: '/google-icon.avif',
  SUNITY_LOGO_GREY: '/sunity-grey.avif',
} as const;

/**
 * Curva de suavização compartilhada: todas as animações se movem com o mesmo caráter.
 * É uma tupla mutável porque o tipo Easing do Framer Motion espera isso.
 */
export const EASE_EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// src/hooks/useComposition.ts
import { useRef, useEffect } from "react";
import { usePersistFn } from "./usePersistFn";

export interface UseCompositionReturn<
  T extends HTMLInputElement | HTMLTextAreaElement
> {
  onCompositionStart: React.CompositionEventHandler<T>;
  onCompositionEnd: React.CompositionEventHandler<T>;
  onKeyDown: React.KeyboardEventHandler<T>;
  isComposing: () => boolean;
}

export interface UseCompositionOptions<
  T extends HTMLInputElement | HTMLTextAreaElement
> {
  onKeyDown?: React.KeyboardEventHandler<T>;
  onCompositionStart?: React.CompositionEventHandler<T>;
  onCompositionEnd?: React.CompositionEventHandler<T>;
}

/**
 * Hook para lidar corretamente com eventos de composição (IME).
 * Resolve problemas onde pressionar "Enter" para confirmar uma palavra no IME
 * dispara indevidamente o submit do formulário.
 */
export function useComposition<
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(options: UseCompositionOptions<T> = {}): UseCompositionReturn<T> {
  const {
    onKeyDown: originalOnKeyDown,
    onCompositionStart: originalOnCompositionStart,
    onCompositionEnd: originalOnCompositionEnd,
  } = options;

  const composingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpa timer ao desmontar para evitar memory leaks
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onCompositionStart = usePersistFn((e: React.CompositionEvent<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    composingRef.current = true;
    originalOnCompositionStart?.(e);
  });

  const onCompositionEnd = usePersistFn((e: React.CompositionEvent<T>) => {
    // Limpa timer anterior se houver
    if (timerRef.current) clearTimeout(timerRef.current);

    // O "Double Timeout" hack:
    // Garante que a flag 'composing' só seja desligada no próximo ciclo do Event Loop,
    // DEPOIS que qualquer evento de 'keydown' pendente (como o Enter) tenha sido processado.
    timerRef.current = setTimeout(() => {
      // Segundo timeout para garantir segurança extra em navegadores lentos/específicos
      timerRef.current = setTimeout(() => {
        composingRef.current = false;
      });
    });

    originalOnCompositionEnd?.(e);
  });

  const onKeyDown = usePersistFn((e: React.KeyboardEvent<T>) => {
    // Se estiver compondo (ou acabou de compor e o timer ainda não rodou), bloqueia.
    if (composingRef.current) {
      const isEnter = e.key === "Enter" && !e.shiftKey; // Permite Shift+Enter se necessário
      const isEscape = e.key === "Escape";

      if (isEnter || isEscape) {
        e.stopPropagation();
        // e.preventDefault(); // Descomente se quiser impedir a inserção do caractere também
        return;
      }
    }

    originalOnKeyDown?.(e);
  });

  // Retorna função estável para verificar o estado atual
  const isComposing = usePersistFn(() => composingRef.current);

  return {
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    isComposing,
  };
}
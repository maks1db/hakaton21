import { useCallback, useEffect, useRef, useState } from "react";

import { useDomHandler } from "./useHandlers";

const events: (keyof WindowEventMap)[] = ["scroll", "resize"];
const CHECK_VISIBILITY_TIMEOUT = 500;

export const useVisibility = (offset = 0, enableDefaultCheck = true) => {
    const [isVisible, updateState] = useState(false);
    /**
     * For mark active action
     */
    const [isActive, setActive] = useState(false);

    const ref = useRef<any>(null);

    const handleEvent = useCallback(() => {
        if ((isVisible && isActive) || !ref.current) {
            return;
        }

        const { scrollY, innerHeight } = window;

        const scrollElement = ref.current.offsetTop - innerHeight;

        if (scrollY + offset > scrollElement) {
            !isVisible && updateState(true);
        } else {
            isVisible && updateState(false);
        }
    }, [isVisible, isActive]);

    const unvisible = useCallback(() => updateState(false), []);
    const unsubscribe = useCallback(() => setActive(true), []);

    useDomHandler(window, events, handleEvent);

    useEffect(() => {
        if (enableDefaultCheck) handleEvent();
    }, [enableDefaultCheck]);

    return {
        isVisible,
        ref,
        unsubscribe,
        unvisible,
        onCheckVisibility: handleEvent,
    };
};

const useCheckVisibility = (enable: boolean, handler: Function) => {
    useEffect(() => {
        let timer = 0;

        if (enable) {
            timer = setTimeout(handler, CHECK_VISIBILITY_TIMEOUT);
        }

        return () => clearTimeout(timer);
    }, [enable, handler]);
};

interface UseActionOnVisibilityProps {
    action: Function;
    offset?: number;
    checkVisibility: boolean;
    disableDefaultCheck?: boolean;
}

export const useActionOnVisibility = ({
    action,
    checkVisibility,
    disableDefaultCheck,
    offset,
}: UseActionOnVisibilityProps) => {
    const { ref, isVisible, unvisible, onCheckVisibility } = useVisibility(
        offset,
        !disableDefaultCheck
    );

    useEffect(() => {
        isVisible && action();
        unvisible();
    }, [isVisible]);

    useCheckVisibility(checkVisibility, onCheckVisibility);

    return ref;
};

export const useOnceActionOnVisibility = (
    action: Function,
    offset?: number,
    checkVisibility = false
) => {
    const { ref, isVisible, unsubscribe, onCheckVisibility } =
        useVisibility(offset);

    useEffect(() => {
        if (isVisible) {
            action();
            unsubscribe();
        }
    }, [isVisible]);

    useCheckVisibility(checkVisibility, onCheckVisibility);

    return ref;
};

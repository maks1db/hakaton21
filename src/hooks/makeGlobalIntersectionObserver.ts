import { useState, useEffect, useRef } from "react";
import { pipe } from "ramda";
import debounce from "debounce";

type CallbackFnType = (
    isIntersecting: boolean,
    unregisterFn: () => void
) => void;

/**
 * Отложенный tick выполнения кастомной регистрации
 */
const DEBOUNCE_REGISTRATION = 50;

interface HookProps {
    /**
     * Функция ручной регистрации intersected события
     */
    intersectionHandler?: CallbackFnType;
    /**
     * Entries-ключ. При пустом значении будет использоваться dom-элемент
     */
    key?: any;
    /**
     * Очистка ключа при intersection-событии
     */
    unmountIntersectedKey?: boolean;
    /**
     * Любое значение, к которому можем приципиться для повторного срабатывания регистрации
     */
    forceUpdate?: boolean | string | number;
}

export const makeGlobalIntersectionObserver = (
    config: IntersectionObserverInit
) => {
    /**
     * Функции зарегистрированных элементов
     */
    const entriesFnMap = new Map();
    /**
     * Ключи элементов, добавленных в обзервер
     */
    const observeredKeys = new Set();

    let observer;

    if ("IntersectionObserver" in window) {
        observer = new window.IntersectionObserver((entriesList) => {
            entriesList.forEach(({ target, isIntersecting }) => {
                const callbackFn = entriesFnMap.get(target);
                callbackFn?.(isIntersecting);
            });
        }, config);
    } else {
        observer = {
            disconnect: () => null,
            observe: () => null,
            unobserve: () => null,
        };
    }

    function useGlobalIntersectionObserver(props?: HookProps) {
        const {
            key,
            intersectionHandler,
            unmountIntersectedKey = true,
            forceUpdate,
        } = props || {};

        const ref = useRef(null);
        const [state, setState] = useState(false);

        useEffect(() => {
            /**
             * Уникальный ключ элемента.
             * Может быть как параметр key пропсов хука, так и сам элемент (если не передали key)
             */
            const mapKey = key || ref.current;
            /**
             * Функция фиксации стейта компонента
             */
            const setIntersected = () => setState(true);
            /**
             * Отписка от observer'a
             */
            const unregister = () => {
                /**
                 * Если повторная регистрация по ключу не требуется
                 */
                if (unmountIntersectedKey) {
                    observeredKeys.delete(mapKey);
                }

                if (ref.current) {
                    entriesFnMap.delete(ref.current);
                    observer.unobserve(ref.current);
                }
            };

            /**
             * Для компонента отписка - зафикисровать результат в стейте + выполнить функцию unregister
             */
            const setIntersectedAction = pipe(setIntersected, unregister);

            /**
             *  Действие при попадании в "лапы" обзервера
             */
            const entriesAction = (isIntersecting: boolean) => {
                if (intersectionHandler) {
                    /**
                     * При переданном колббеки надо самому решить, когда отписываться
                     */
                    intersectionHandler(isIntersecting, setIntersectedAction);
                } else if (isIntersecting) {
                    /**
                     * Иначе сразу отписываемся
                     */
                    setIntersectedAction();
                }
            };

            if (!observeredKeys.has(mapKey)) {
                /**
                 * Регистрируем функцию текущего элемента
                 */
                entriesFnMap.set(
                    ref.current,
                    debounce(entriesAction, DEBOUNCE_REGISTRATION)
                );
                /**
                 * Регистриурем ключ текущего элемента для фиксации во всем жизненном цикле приложения
                 */
                observeredKeys.add(mapKey);
                observer.observe(ref.current);
            }

            return () => {
                setState(false);
                unregister();
            };
        }, [forceUpdate]);

        return {
            isIntersecting: state,
            ref,
        };
    }

    return { useGlobalIntersectionObserver, observer };
};

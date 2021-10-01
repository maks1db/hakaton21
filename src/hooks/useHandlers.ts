import { useEffect, useRef, MutableRefObject } from 'react';

type ElementType = Window | Document | HTMLElement;

const makeHandlers = (types: string[], handler: Function) => types.reduce(
    (accum, type) => ({ ...accum, [type]: handler }),
    {},
);

const manageHanders = (
    method: 'addEventListener' | 'removeEventListener',
) => (element: ElementType, handlers: object) => (
    Object.keys(handlers).forEach(type => element[method](type, handlers[type]))
);

const attach = manageHanders('addEventListener');
const remove = manageHanders('removeEventListener');

export const useHandler = (types: (keyof WindowEventMap)[], handler: Function) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        const handlers = makeHandlers(types, handler);

        attach(ref.current, handlers);

        return () => remove(ref.current, handlers);
    }, [handler]);

    return ref;
};

export const useHandlers = (handlers: object) => {
    const ref = useRef<any>(null);

    useEffect(() => {
        attach(ref.current, handlers);

        return () => remove(ref.current, handlers);
    }, [handlers]);

    return ref;
};

export const useDomHandler = (
    element: ElementType,
    types: (keyof WindowEventMap)[],
    handler: Function,
) => {
    useEffect(() => {
        const handlers = makeHandlers(types, handler);

        attach(element, handlers);

        return () => remove(element, handlers);
    }, [handler]);
};

export const useDomHandlers = (element: ElementType, handlers: object) => {
    useEffect(() => {
        attach(element, handlers);

        return () => remove(element, handlers);
    }, [handlers]);
};

export const useRefHandler = (
    element: MutableRefObject<ElementType>,
    types: (keyof WindowEventMap)[],
    handler: Function,
) => {
    useEffect(() => {
        const handlers = makeHandlers(types, handler);

        attach(element.current, handlers);

        return () => remove(element.current, handlers);
    }, [handler]);
};

export const useRefHandlers = (
    element: MutableRefObject<ElementType>, handlers: object,
) => {
    useEffect(() => {
        attach(element.current, handlers);

        return () => remove(element.current, handlers);
    }, [handlers]);
};

export default useHandlers;

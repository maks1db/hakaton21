/* eslint-disable jsx-a11y/alt-text */
import cn from 'classnames';
import {
    FunctionComponent, HTMLAttributes, useCallback, useEffect, useRef, useState,
} from 'react';
import { makeGlobalIntersectionObserver } from '../../hooks';

import styles from './ObserveredImage.module.css';

export type ImageComponentType = 'div' | 'img';

export interface ObserveredImageProps {
    /**
     * Dom element
     */
    element: ImageComponentType;
    /**
     * Image source
     */
    url: string;

    bg?: string;
    backgroundColor?: string;
}

const { useGlobalIntersectionObserver } = makeGlobalIntersectionObserver({
    rootMargin: '200px',
    threshold: 0,
});

export const ObserveredImage: FunctionComponent<ObserveredImageProps & HTMLAttributes<HTMLElement>> = ({
    element: Component,
    url,
    children,
    className,
    bg,
    backgroundColor,
    ...rest
}) => {
    const { isIntersecting, ref } = useGlobalIntersectionObserver();
    const [isLoaded, imgLoad] = useState(false);
    const imgRef = useRef<any>(null);

    const onLoad = useCallback(() => imgLoad(true), []);

    useEffect(() => {
        if (!isIntersecting) {
            return;
        }

        const { current: componentNode } = ref as any;
        const { current: imgNode } = imgRef;

        if (Component !== 'img' && imgNode) {
            imgNode.src = url;
        }

        if (Component === 'div' && componentNode) {
            componentNode.style.backgroundImage = `url(${url})`;
        } else {
            componentNode.src = url;
        }
    }, [isIntersecting, url]);

    return (
        <div
            {...rest}
            className={className}
            style={{ backgroundColor: bg || backgroundColor }}
        >
            <Component
                ref={ref}
                className={cn(styles.component, isLoaded && styles.componentLoaded)}
                onLoad={Component === 'img' ? onLoad : undefined}
            >
                {children}
            </Component>
            {!isLoaded && Component !== 'img' && <img onLoad={onLoad} ref={imgRef} className={styles.image} />}
        </div>
    );
};


'use client';

import React, {
	useState,
	useRef,
	useCallback,
	useEffect,
	RefObject,
	PropsWithChildren,
	useMemo
} from 'react';

import { createPortal } from 'react-dom';

type UsePortalProps = {
	containerId?: string;
	defaultShow?: boolean;
	onShow?: (e?: Event | React.SyntheticEvent) => void;
	onHide?: (e?: Event | React.SyntheticEvent) => void;
	closeOnClickOutside?: boolean;
	className?: string | string[];
};

export interface PortalProps extends PropsWithChildren {
	className?: string | string[];
}

const createEl = (id: string): HTMLElement => {
	const el = document.createElement('div');
	el.setAttribute('id', id);
	return el;
};

const portal = (
	id: string,
	isShow: boolean,
	ref: RefObject<HTMLDivElement | null>,
	className?: string | string[]
): React.FC<PortalProps> => {
	return ({ children }: PortalProps) => {
		const [container, setContainer] = useState<HTMLElement | null>(null);
		const classes = Array.isArray(className) ? className.join(' ') : className;

		useEffect(() => {
			if (isShow) {
				const el = document.getElementById(id) || createEl(id);
				document.body.appendChild(el);
				el.className = classes || '';
				setContainer(el);
			} else {
				if (container) {
					container.remove();
					setContainer(null);
				}
			}

			return () => {
				if (container) container.remove();
			};
		}, [classes, container]);

		return isShow && container
			? createPortal(<section ref={ref}>{children}</section>, container)
			: null;
	};
};

const usePortal = ({
	containerId = 'portal',
	defaultShow = false,
	onShow = () => {},
	onHide = () => {},
	closeOnClickOutside = true,
	className // Aceptamos className aquí también
}: UsePortalProps) => {
	const [isShow, setIsShow] = useState<boolean>(defaultShow);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const isShowRef = useRef<boolean>(defaultShow);

	const handleIsShow = useCallback((value: boolean) => setIsShow(value), []);

	const show = useCallback(
		(e?: Event | React.SyntheticEvent) => {
			handleIsShow(true);
			isShowRef.current = true;
			onShow(e);
		},
		[handleIsShow, onShow]
	);

	const hide = useCallback(
		(e?: Event | React.SyntheticEvent) => {
			handleIsShow(false);
			isShowRef.current = false;
			onHide(e);
		},
		[handleIsShow, onHide]
	);

	const toggle = useCallback(
		(e?: Event | React.SyntheticEvent) => {
			if (isShowRef.current) hide(e);
			else show(e);
		},
		[hide, show]
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				hide();
			}
		};

		if (isShow && closeOnClickOutside) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isShow, closeOnClickOutside, hide]);

	const Portal = useMemo(() => {
		const PortalComponent = portal(containerId, isShow, modalRef, className);
		return PortalComponent;
	}, [containerId, isShow, className]);

	return { Portal, isShow, show, hide, toggle };
};

export { usePortal };

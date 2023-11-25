import React from 'react';


type placementType =
    'topLeft'
    | 'top'
    | 'topRight'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom';

export interface TriggerWrapProps {
    popupPlacement: placementType;
    action: Array<'hover' | 'click'>;
    popupTransitionName: string;
    popupVisible?: boolean;
    popup: React.ReactNode;
    onPopupVisibleChange?: (visible: boolean) => void;
    popupClassName?: string;
    popupAlign?: object;
    getPopupContainer?: () => HTMLElement;
    onPopupAlign?: (domNode: HTMLElement, align: object) => void;
    children: React.ReactNode;
}

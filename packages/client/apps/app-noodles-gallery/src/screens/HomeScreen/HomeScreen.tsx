import { Display } from '@noodlestan/ui-atoms';
import { NutIcon } from 'lucide-solid';
import { Component } from 'solid-js';

import { ModalView } from '@/organisms/ModalView/ModalView';

import './HomeScreen.css';

export const HomeScreen: Component = () => {
    const handleModalClose = () => {
        // navigationBus?.emit({ name: 'closeModal' });
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <main tab-index="0">
            <div class="HomeScreen">
                <Display>
                    <NutIcon /> Welcome
                </Display>
                <ModalView show={false} onClose={handleModalClose} />
            </div>
        </main>
    );
};

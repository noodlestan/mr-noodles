import { NavLink } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { findComponent } from '@/data/components';
import { ComponentMeta } from '@/ui/components/ComponentMeta';
import { DemoGroup } from '@/ui/components/DemoGroup';
import { DemoItem } from '@/ui/components/DemoItem';
import { DemoPage } from '@/ui/components/DemoPage';

import './NavLinkPage.css';

export const NavLinkPage: Component = () => {
    const handleClick = () => console.info('Click');
    const handleTap = () => console.info('Tap');

    const COMPONENT = findComponent('NavLink');

    return (
        <DemoPage classList={{ NavLinkPage: true }} title="NavLink">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem row>
                    <NavLink active={false}>Foobar</NavLink>
                    <NavLink active={false}>Foobar</NavLink>
                    <NavLink active={false}>Foobar</NavLink>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="active">
                <DemoItem title="true" row>
                    <NavLink active={false}>Foobar</NavLink>
                    <NavLink active>Foobar</NavLink>
                    <NavLink active={false}>Foobar</NavLink>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem title="true">
                    <NavLink active={false} disabled>
                        Foobar
                    </NavLink>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="active + disabled">
                <DemoItem title="true">
                    <NavLink active disabled>
                        Foobar
                    </NavLink>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onClick">
                <DemoItem note="See console log">
                    <NavLink active={false} onClick={handleClick}>
                        Foobar
                    </NavLink>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onTap">
                <DemoItem note="See console log">
                    <NavLink active={false} onTap={handleTap}>
                        Foobar
                    </NavLink>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override text color">
                    <NavLink active={false} classList={{ override: true }}>
                        Foobar
                    </NavLink>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};

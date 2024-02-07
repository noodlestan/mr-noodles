import { Select } from '@noodlestan/ui-forms';
import { Component, createSignal } from 'solid-js';

import { ComponentMeta } from '@/components/ComponentMeta';
import { DemoGroup } from '@/components/DemoGroup';
import { DemoItem } from '@/components/DemoItem';
import { DemoPage } from '@/components/DemoPage';
import { findComponent } from '@/data/components';

import './SelectPage.css';

const Options: Component = () => {
    return (
        <>
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
            <option value="3">Foobarbazqux</option>
        </>
    );
};

export const SelectPage: Component = () => {
    const [emptyValue, setEmptyValue] = createSignal('');
    const [value, setValue] = createSignal('foo');

    const handleValueChange = (value: string) => {
        console.info('onValueChange', value);
        setValue(value);
    };

    const COMPONENT = findComponent('Select');

    return (
        <DemoPage classList={{ SelectPage: true }} title="Select">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <Select value={emptyValue()} onValueChange={setEmptyValue}>
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="value">
                <DemoItem title="updated via onValueChange()">
                    <Select value={value()} onValueChange={setValue}>
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="placeholder">
                <DemoItem>
                    <Select placeholder="Chose wisely">
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="l">
                    <Select value={value()} onValueChange={setValue} size="l">
                        <Options />
                    </Select>
                </DemoItem>
                <DemoItem title="m">
                    <Select value={value()} onValueChange={setValue} size="m">
                        <Options />
                    </Select>
                </DemoItem>
                <DemoItem title="s">
                    <Select value={value()} onValueChange={setValue} size="s">
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="length">
                <DemoItem title="full">
                    <Select value={value()} onValueChange={setValue} length="full">
                        <Options />
                    </Select>
                </DemoItem>
                <DemoItem title="l">
                    <Select value={value()} onValueChange={setValue} length="l">
                        <Options />
                    </Select>
                </DemoItem>
                <DemoItem title="m">
                    <Select value={value()} onValueChange={setValue} length="m">
                        <Options />
                    </Select>
                </DemoItem>
                <DemoItem title="s">
                    <Select value={value()} onValueChange={setValue} length="s">
                        <Options />
                    </Select>
                </DemoItem>
                <DemoItem title="3" row>
                    <Select value={value()} onValueChange={setValue} length={3}>
                        <Options />
                    </Select>
                </DemoItem>
                <DemoItem title="auto">
                    <Select value={value()} onValueChange={setValue} length="auto">
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem>
                    <Select value={value()} disabled>
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onValueChange">
                <DemoItem note="see console log">
                    <Select value={value()} onValueChange={handleValueChange}>
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override text color">
                    <Select value={value()} classList={{ override: true }}>
                        <Options />
                    </Select>
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};

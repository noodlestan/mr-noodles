import { TextInput } from '@noodlestan/ui-forms';
import { Component, createSignal } from 'solid-js';

import { ComponentMeta } from '@/components/ComponentMeta';
import { DemoGroup } from '@/components/DemoGroup';
import { DemoItem } from '@/components/DemoItem';
import { DemoPage } from '@/components/DemoPage';
import { findComponent } from '@/data/components';

import './TextInputPage.css';

export const TextInputPage: Component = () => {
    const [emptyValue, setEmptyValue] = createSignal('');
    const [value, setValue] = createSignal('Foobar');
    const [numValue, setNumValue] = createSignal('15');
    const [passwordValue, setPasswordValue] = createSignal('Foobar');
    const [emailValue, setEmailValue] = createSignal('foo@bar.com');

    const handleValueChange = (value: string) => {
        console.info('onValueChange', value);
        setValue(value);
    };

    const handleConfirmValue = (value: string) => {
        console.info('onConfirmValue', value);
        setValue(value);
    };

    const handleCancelValue = () => {
        console.info('onCancelValue');
    };

    const COMPONENT = findComponent('TextInput');

    return (
        <DemoPage classList={{ TextInputPage: true }} title="TextInput">
            <ComponentMeta component={COMPONENT} />
            <DemoGroup title="defaults">
                <DemoItem>
                    <TextInput value={emptyValue()} onValueChange={setEmptyValue} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="value">
                <DemoItem title="updated via onValueChange()">
                    <TextInput value={value()} onValueChange={setValue} />
                </DemoItem>
                <DemoItem title="updated via onConfirmValue()" note="press ENTER or ESC">
                    <TextInput value={value()} onConfirmValue={handleConfirmValue} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="type">
                <DemoItem title="number">
                    <TextInput type="number" value={numValue()} onValueChange={setNumValue} />
                </DemoItem>
                <DemoItem title="password">
                    <TextInput
                        type="password"
                        value={passwordValue()}
                        onValueChange={setPasswordValue}
                    />
                </DemoItem>
                <DemoItem title="email">
                    <TextInput type="email" value={emailValue()} onValueChange={setEmailValue} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="placeholder">
                <DemoItem>
                    <TextInput placeholder="E.g.: Foobar" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="size">
                <DemoItem title="l">
                    <TextInput value={value()} onValueChange={setValue} size="l" />
                </DemoItem>
                <DemoItem title="m">
                    <TextInput value={value()} onValueChange={setValue} size="m" />
                </DemoItem>
                <DemoItem title="s">
                    <TextInput value={value()} onValueChange={setValue} size="s" />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="length">
                <DemoItem title="full">
                    <TextInput value={value()} onValueChange={setValue} length="full" />
                </DemoItem>
                <DemoItem title="l">
                    <TextInput value={value()} onValueChange={setValue} length="l" />
                </DemoItem>
                <DemoItem title="m">
                    <TextInput value={value()} onValueChange={setValue} length="m" />
                </DemoItem>
                <DemoItem title="s">
                    <TextInput value={value()} onValueChange={setValue} length="s" />
                </DemoItem>
                <DemoItem title="3">
                    <TextInput value={value()} onValueChange={setValue} length={3} />
                </DemoItem>
                <DemoItem title="auto" note="maxLength set to 3">
                    <TextInput
                        value={value()}
                        onValueChange={setValue}
                        length="auto"
                        maxLength={3}
                    />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="maxLength">
                <DemoItem title="6" note="input resized when length='auto'">
                    <TextInput value={value()} onValueChange={setValue} maxLength={6} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="min/max">
                <DemoItem title="1/10">
                    <TextInput
                        type="number"
                        value={numValue()}
                        onValueChange={setNumValue}
                        min={1}
                        max={10}
                    />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="disabled">
                <DemoItem>
                    <TextInput value={value()} disabled />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onValueChange">
                <DemoItem note="see console log">
                    <TextInput value={value()} onValueChange={handleValueChange} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onConfirmValue">
                <DemoItem note="see console log">
                    <TextInput value={value()} onConfirmValue={handleConfirmValue} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="onCancelValue">
                <DemoItem note="see console log">
                    <TextInput value={value()} onCancelValue={handleCancelValue} />
                </DemoItem>
            </DemoGroup>
            <DemoGroup title="classList">
                <DemoItem note="Should override text color">
                    <TextInput value="Foobar" classList={{ override: true }} />
                </DemoItem>
            </DemoGroup>
        </DemoPage>
    );
};

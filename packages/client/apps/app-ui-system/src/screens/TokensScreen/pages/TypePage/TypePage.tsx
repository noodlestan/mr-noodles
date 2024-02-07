import { Flex } from '@noodlestan/ui-layouts';
import { listTypeFamilies, listTypeFamilyVariants } from '@noodlestan/ui-theme-base';
import { Component, For } from 'solid-js';

import { DemoGroup } from '@/components/DemoGroup';
import { DemoItem } from '@/components/DemoItem';
import { DemoPage } from '@/components/DemoPage';

import './TypePage.css';

export const TypePage: Component = () => {
    return (
        <DemoPage classList={{ TypePage: true }} title="Type">
            <For each={listTypeFamilies()}>
                {family => (
                    <DemoGroup title={`${family.name}: ${family.value}`}>
                        <Flex wrap gap="l">
                            <For each={listTypeFamilyVariants(family.name)}>
                                {variant => (
                                    <DemoItem>
                                        <p
                                            style={{
                                                'font-family': family.value,
                                                'line-height': variant.height[0],
                                                'font-size': variant.size[0],
                                                'font-weight': variant.weight[0],
                                            }}
                                        >
                                            {variant.name} Lorem ipsum dolor sit amet
                                        </p>
                                    </DemoItem>
                                )}
                            </For>
                        </Flex>
                    </DemoGroup>
                )}
            </For>
        </DemoPage>
    );
};

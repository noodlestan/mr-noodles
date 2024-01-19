import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { FolderPlusIcon } from 'lucide-solid';
import { Component, For, Show, createSignal } from 'solid-js';

import { UserSettingsCreateRoot } from './UserSettingsCreateRoot';
import { UserSettingsEditRoot } from './UserSettingsEditRoot';

import { useCurrentUserContext } from '@/providers/CurrentUser';

export const UserSettingsRoots: Component = () => {
    const { currentUser } = useCurrentUserContext();

    const [showAddForm, setShowAddForm] = createSignal(false);
    const handleAddFormDone = () => setShowAddForm(false);

    return (
        <Flex gap="l">
            <Flex direction="row" gap="m" justify="between">
                <Display level={3}>User folders</Display>
                <Show when={!showAddForm()}>
                    <IconButton
                        variant="plain"
                        icon={FolderPlusIcon}
                        onClick={() => setShowAddForm(true)}
                    />
                </Show>
            </Flex>
            <Flex gap="s">
                <Show when={showAddForm()}>
                    <Flex direction="row" gap="m" justify="between">
                        <Display level={4}>Add folder</Display>
                    </Flex>
                    <UserSettingsCreateRoot
                        onCancel={handleAddFormDone}
                        onDone={handleAddFormDone}
                    />
                </Show>
            </Flex>
            <Flex gap="s">
                <For each={currentUser()?.roots}>
                    {root => <UserSettingsEditRoot root={root} />}
                </For>
            </Flex>
        </Flex>
    );
};

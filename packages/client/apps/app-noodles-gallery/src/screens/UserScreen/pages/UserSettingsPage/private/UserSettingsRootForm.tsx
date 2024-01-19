import type { Root, UserRoot } from '@noodlestan/shared-types';
import { Banner, Button, DataValue, Icon, IconButton, Label } from '@noodlestan/ui-atoms';
import { TextInput } from '@noodlestan/ui-forms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { EditIcon, FolderIcon, FolderPlusIcon, Save, TrashIcon, X } from 'lucide-solid';
import { Component, Show, createEffect, createSignal } from 'solid-js';

import { mediumDate } from '@/functions/mediumDate';

type UserSettingsRootFormProps = {
    root: UserRoot;
    editing: boolean;
    saving: boolean;
    error: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onCancel?: () => void;
    onSave: (root: Root) => void;
};

export const UserSettingsRootForm: Component<UserSettingsRootFormProps> = props => {
    const [name, setName] = createSignal<string>('');
    const [path, setPath] = createSignal<string>('');

    const modified = () => name() !== props.root.name || path() !== props.root.path;
    const disabled = () => !modified() || props.saving;
    const icon = () => (props.root.id ? FolderIcon : FolderPlusIcon);

    createEffect(() => setName(props.root.name));
    createEffect(() => setPath(props.root.path));

    const handleSaveClick = () => {
        const root = { ...props.root, name: name(), path: path() };
        props.onSave(root);
    };

    return (
        <Surface variant="card">
            <Flex gap="xl" align="stretch" padding="m">
                <Flex direction="row" gap="m" align="center" justify="between">
                    <Flex direction="row" gap="m" align="center">
                        <Icon icon={icon()} size="l" />
                        <Show when={!props.root.id}>
                            <DataValue size="m">{props.root.name || 'Untitled'}</DataValue>
                        </Show>
                        <DataValue>{props.root.name}</DataValue>
                    </Flex>

                    <Show when={!props.editing}>
                        <Flex direction="row" gap="m" justify="between">
                            <IconButton
                                icon={TrashIcon}
                                variant="danger"
                                onClick={props.onDelete}
                            />
                            <IconButton
                                icon={EditIcon}
                                variant="plain"
                                onClick={props.onEdit}
                                label="Modify"
                            />
                        </Flex>
                    </Show>
                </Flex>

                <Flex direction="row" gap="m" align="baseline">
                    <Flex gap="s" align="baseline">
                        <Label size="s">Created</Label>
                        <DataValue size="s">{mediumDate(new Date(props.root.date))}</DataValue>
                    </Flex>

                    <Show when={props.root.id}>
                        <Flex gap="s" align="baseline">
                            <Label size="s">Id</Label>
                            <DataValue size="s">{props.root.id}</DataValue>
                        </Flex>
                    </Show>
                </Flex>

                <Show when={props.editing}>
                    <Flex gap="s" align="stretch">
                        <Label>Name</Label>
                        <TextInput
                            disabled={props.saving}
                            value={name()}
                            onValueChange={setName}
                            length="m"
                        />
                    </Flex>
                </Show>

                <Flex gap="s" align="stretch">
                    <Label>Path</Label>
                    <Show when={props.editing}>
                        <TextInput disabled={props.saving} value={path()} onValueChange={setPath} />
                    </Show>
                    <Show when={!props.editing}>
                        <DataValue length="full" wrap>
                            {props.root.path}
                        </DataValue>
                    </Show>
                </Flex>

                <Show when={props.error && !props.saving}>
                    <Banner variant="danger">Shoot</Banner>
                </Show>

                <Show when={props.editing}>
                    <Flex direction="row" gap="m" justify="end">
                        <Button variant="plain" onClick={props.onCancel}>
                            <Icon icon={X} /> Cancel
                        </Button>
                        <Button disabled={disabled()} onClick={handleSaveClick}>
                            <Icon icon={Save} /> Save
                        </Button>
                    </Flex>
                </Show>
            </Flex>
        </Surface>
    );
};

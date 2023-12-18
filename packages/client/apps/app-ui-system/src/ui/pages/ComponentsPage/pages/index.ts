import { Component } from 'solid-js';

import { BannerPage } from './BannerPage';
import { ButtonPage } from './ButtonPage';
import { DataItemPage } from './DataItemPage';
import { DataValuePage } from './DataValuePage';
import { DisplayPage } from './DisplayPage';
import { FlexPage } from './FlexPage';
import { IconButtonPage } from './IconButtonPage';
import { IconPage } from './IconPage';
import { LabelPage } from './LabelPage';
import { LinkPage } from './LinkPage';
import { NavLinkPage } from './NavLinkPage';
import { SelectPage } from './SelectPage';
import { SurfacePage } from './SurfacePage';
import { TextInputPage } from './TextInputPage';
import { TextPage } from './TextPage';

export const COMPONENT_PAGE_MAP: Record<string, Component> = {
    Button: ButtonPage,
    Banner: BannerPage,
    DataItem: DataItemPage,
    DataValue: DataValuePage,
    Display: DisplayPage,
    Flex: FlexPage,
    Icon: IconPage,
    IconButton: IconButtonPage,
    Label: LabelPage,
    Link: LinkPage,
    NavLink: NavLinkPage,
    Select: SelectPage,
    Surface: SurfacePage,
    Text: TextPage,
    TextInput: TextInputPage,
};

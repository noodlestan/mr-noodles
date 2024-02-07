import { Component } from 'solid-js';

import { BannerPage } from '@/screens/ComponentsScreen/pages/BannerPage';
import { ButtonPage } from '@/screens/ComponentsScreen/pages/ButtonPage';
import { DataItemPage } from '@/screens/ComponentsScreen/pages/DataItemPage';
import { DataValuePage } from '@/screens/ComponentsScreen/pages/DataValuePage';
import { DisplayPage } from '@/screens/ComponentsScreen/pages/DisplayPage';
import { FlexPage } from '@/screens/ComponentsScreen/pages/FlexPage';
import { IconButtonPage } from '@/screens/ComponentsScreen/pages/IconButtonPage';
import { IconPage } from '@/screens/ComponentsScreen/pages/IconPage';
import { LabelPage } from '@/screens/ComponentsScreen/pages/LabelPage';
import { LinkPage } from '@/screens/ComponentsScreen/pages/LinkPage';
import { NavLinkPage } from '@/screens/ComponentsScreen/pages/NavLinkPage';
import { SelectPage } from '@/screens/ComponentsScreen/pages/SelectPage';
import { SurfacePage } from '@/screens/ComponentsScreen/pages/SurfacePage';
import { TextInputPage } from '@/screens/ComponentsScreen/pages/TextInputPage';
import { TextPage } from '@/screens/ComponentsScreen/pages/TextPage';
import { ThemeBasePage } from '@/screens/ThemesScreen/pages/ThemeBasePage';
import { ColorPage } from '@/screens/TokensScreen/pages/ColorPage';
import { SpacePage } from '@/screens/TokensScreen/pages/SpacePage';
import { TypePage } from '@/screens/TokensScreen/pages/TypePage';

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

export const THEMES_PAGE_MAP: Record<string, Component> = {
    base: ThemeBasePage,
};

export const TOKEN_PAGE_MAP: Record<string, Component> = {
    Color: ColorPage,
    Space: SpacePage,
    Type: TypePage,
};

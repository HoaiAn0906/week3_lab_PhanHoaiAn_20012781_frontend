import {
  AlertCircleIcon,
  AppsIcon,
  BorderAllIcon,
  BrandTablerIcon,
  CircleDotIcon,
  ClipboardIcon,
  FileDescriptionIcon,
  HomeIcon,
  LoginIcon,
  RotateIcon,
  SettingsIcon, ShoppingCartIcon,
  UserPlusIcon,
  ZoomCodeIcon,
} from 'vue-tabler-icons'

export interface menu {
  header?: string
  title?: string
  icon?: any
  to?: string
  divider?: boolean
  chip?: string
  chipColor?: string
  chipVariant?: string
  chipIcon?: string
  children?: menu[]
  disabled?: boolean
  subCaption?: string
  class?: string
  extraclass?: string
  type?: string
}

const horizontalItems: menu[] = [
  {
    title: 'Dashboard',
    icon: HomeIcon,
    to: '/admin',
  },
  {
    title: 'Products',
    icon: ShoppingCartIcon,
    to: '/admin/products',
  }
]

export default horizontalItems

export const navItems = [
  {
    name: 'Dashboard',
    icon: '/assets/icons/Dashboard Icon.png',
    url: '/',
  },
  {
    name: 'Documents',
    icon: '/assets/icons/Documents Icon.png',
    url: '/documents',
  },
  {
    name: 'Images',
    icon: '/assets/icons/Image from Flaticon.png',
    url: '/images',
  },
  {
    name: 'Media',
    icon: '/assets/icons/Video icon.png',
    url: '/media',
  },
  {
    name: 'Others',
    icon: '/assets/icons/Chart Pie Graph.png',
    url: '/others',
  },
];

export const actionsDropdownItems = [
  {
    label: 'Rename',
    icon: '/assets/icons/edit.svg',
    value: 'rename',
  },
  {
    label: 'Details',
    icon: '/assets/icons/info.svg',
    value: 'details',
  },
  {
    label: 'Share',
    icon: '/assets/icons/share.svg',
    value: 'share',
  },
  {
    label: 'Download',
    icon: '/assets/icons/download.svg',
    value: 'download',
  },
  {
    label: 'Delete',
    icon: '/assets/icons/delete.svg',
    value: 'delete',
  },
];

export const sortTypes = [
  {
    label: 'Date created (newest)',
    value: '$createdAt-desc',
  },
  {
    label: 'Created Date (oldest)',
    value: '$createdAt-asc',
  },
  {
    label: 'Name (A-Z)',
    value: 'name-asc',
  },
  {
    label: 'Name (Z-A)',
    value: 'name-desc',
  },
  {
    label: 'Size (Highest)',
    value: 'size-desc',
  },
  {
    label: 'Size (Lowest)',
    value: 'size-asc',
  },
];

export const avatarPlaceholderUrl =
  'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

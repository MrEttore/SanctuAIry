import { MessageCircle, SearchCheck, Settings } from 'lucide-react';

import { NavigationItem } from '../types/navigation';

export const navigationItems: NavigationItem[] = [
    { icon: MessageCircle, name: 'Chat', to: '/app/chat' },
    { icon: Settings, name: 'Account Settings', to: '/app/user' },
    {
        icon: SearchCheck,
        name: 'Verify Privacy & Security',
        to: '/app/attestation',
    },
];

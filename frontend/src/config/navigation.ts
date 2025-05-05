import { MessageCircle, SearchCheck, Settings } from 'lucide-react';

import { NavigationItem } from '../types/navigation';

export const navigationItems: NavigationItem[] = [
    { icon: MessageCircle, name: 'Chat', to: '/app/chat' },
    { icon: SearchCheck, name: 'Attestation', to: '/app/attestation' },
    { icon: Settings, name: 'Account Settings', to: '/app/user' },
];

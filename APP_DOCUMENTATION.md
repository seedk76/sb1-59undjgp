# ServiceHub - Local Services Marketplace Documentation

## Project Overview

ServiceHub is a bilingual (English/Romanian) marketplace platform connecting local service providers with clients. The application facilitates service discovery, booking, messaging, and reviews while supporting both client and provider user roles.

### Key Features
- Bilingual interface (English/Romanian)
- User authentication and role-based access
- Service provider profiles and portfolios
- Real-time messaging
- Booking system
- Reviews and ratings
- Admin panel for platform management

## Technical Architecture

### Technology Stack
- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom configurations
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **UI Components**: Custom components with Lucide icons
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Date Handling**: date-fns with locale support

### Directory Structure
```
src/
├── components/
│   ├── admin/         # Admin panel components
│   ├── auth/          # Authentication components
│   ├── home/          # Home page components
│   ├── layout/        # Layout components
│   ├── messages/      # Messaging components
│   ├── provider/      # Provider-related components
│   ├── reviews/       # Review components
│   └── ui/            # Reusable UI components
├── lib/
│   ├── firebase.ts    # Firebase configuration
│   ├── translations.ts # Translation strings
│   └── utils.ts       # Utility functions
├── store/
│   ├── useAuthStore.ts    # Authentication state
│   ├── useLanguageStore.ts # Language state
│   ├── useMessagesStore.ts # Messaging state
│   └── useToastStore.ts   # Toast notifications
└── types/             # TypeScript type definitions
```

## Authentication & User Management

### Firebase Integration
- Email/password authentication
- Google Sign-In
- Custom user profiles in Firestore
- Role-based authorization (client/provider/admin)

### User Roles
```typescript
type UserRole = 'client' | 'provider' | 'admin';
```

### Protected Routes
Routes are protected using React Router and custom hooks:
```typescript
const PrivateRoute = ({ children }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/auth/login" />;
};
```

## Bilingual Support

### Translation System
Translations are stored in a structured object:
```typescript
export const translations = {
  services: {
    plumbers: {
      en: 'Plumbers',
      ro: 'Instalatori'
    },
    // ...
  }
};
```

### Language Toggle
Language state is managed globally using Zustand:
```typescript
const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language })
}));
```

## UI/UX Design System

### Colors
Primary brand color: #4A90E2
```javascript
colors: {
  primary: {
    50: '#f0f7ff',
    500: '#4A90E2',
    900: '#003974',
  }
}
```

### Typography
- Font: System font stack
- Sizes: Tailwind's default scale
- Weights: Regular (400), Medium (500), Semibold (600), Bold (700)

### Animations
Using Framer Motion for:
- Page transitions
- Component mounting
- Hover effects
- Loading states

## Core Features

### Service Categories
- 15 predefined categories
- Each category has:
  - Unique identifier
  - Bilingual names
  - Associated icon
  - Optional metadata

### Provider Profiles
```typescript
interface ProviderProfile {
  uid: string;
  businessName: string;
  description: TranslationKey;
  services: string[];
  location: string;
  pricing: {
    baseRate: number;
    currency: 'RON' | 'EUR';
  };
  availability: {
    weekdays: {
      [key: string]: {
        start: string;
        end: string;
        available: boolean;
      };
    };
  };
  portfolio: {
    id: string;
    imageUrl: string;
    caption: TranslationKey;
  }[];
  rating: number;
  reviewCount: number;
}
```

### Booking System
- Date and time selection
- Service selection
- Pricing calculation
- Confirmation flow
- Email notifications

### Messaging System
```typescript
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}
```

### Reviews & Ratings
```typescript
interface Review {
  id: string;
  providerId: string;
  clientId: string;
  rating: number;
  content: string;
  timestamp: string;
}
```

## State Management

### Zustand Stores
- `useAuthStore`: User authentication state
- `useLanguageStore`: Language preference
- `useMessagesStore`: Chat messages
- `useToastStore`: Notifications
- `useAdminStore`: Admin panel state

### Data Flow
1. User actions trigger store methods
2. Store methods update Firebase/Firestore
3. Real-time listeners sync state
4. Components react to state changes

## Testing

### Unit Tests
- Component testing with Vitest
- Store testing
- Utility function testing

### Integration Tests
- User flows
- API integration
- Authentication flows

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project

### Environment Variables
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Future Enhancements

### Planned Features
- Advanced search and filtering
- Payment integration
- Provider verification system
- Mobile applications
- Analytics dashboard
- Multi-language support beyond EN/RO

### Technical Improvements
- Performance optimization
- SEO enhancements
- Accessibility improvements
- Progressive Web App (PWA)
- End-to-end testing

## Contact & Resources

### Documentation
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Design Resources
- [Lucide Icons](https://lucide.dev)
- [Tailwind UI Components](https://tailwindui.com)

### Support
For technical support or feature requests, please contact the development team.
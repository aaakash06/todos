# Todoist Clone

A full-featured task management application built with React, Tailwind CSS, and modern companion libraries.

## Features

- Projects & Sections management
- Task creation and organization
- Due dates, priorities, and labels
- Drag and drop functionality (coming soon)
- Offline support (coming soon)
- Real-time collaboration (coming soon)

## Tech Stack

- **Frontend Framework**: React
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Drag & Drop**: DND Kit

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/todoist-clone.git
cd todoist-clone

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

```
src/
├── components/      # shared UI components
├── features/        # domain features (tasks, projects, auth)
├── hooks/           # custom React hooks
├── lib/             # API client, utils, enums
├── state/           # Zustand stores
├── styles/          # Tailwind config & global CSS
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [Todoist](https://todoist.com/)
- Built with [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Zustand](https://github.com/pmndrs/zustand)

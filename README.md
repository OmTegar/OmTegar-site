# OmTegar's Website v1.0.0

A modern, high-performance portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project follows **SOLID principles** and features a clean, responsive design with interactive elements like a built-in Snake game.

![Banner](/thumbnail.png)

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Logic**: Clean Architecture with SOLID principles
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Email**: [EmailJS](https://www.emailjs.com/) for contact form integration

## ✨ Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Interactive Snake Game**: Built from scratch using React hooks and a custom game engine.
- **Dynamic Content**: Projects and certificates are managed via clean JSON data structures.
- **Type Safety**: Full TypeScript implementation for robust and maintainable code.
- **Performance**: Optimized images and server-side rendering benefits via Next.js.

> [!TIP]
> 📖 **Documentation**: Detailed architecture and feature documentation can be found in the [`docs/`](docs/) directory.

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & Layouts)
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks (logic abstraction)
├── lib/            # Business logic (Services & Game Engine)
└── data/           # Static data (JSON)
public/             # Static assets (images, icons, etc.)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OmTegar/OmTegar-site.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```env
   NEXT_PUBLIC_EMAIL_SERVICE=your_service_id
   NEXT_PUBLIC_EMAIL_TEMPLATE=your_template_id
   NEXT_PUBLIC_EMAIL_JS_USER_ID=your_public_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [OmTegar](https://github.com/OmTegar)

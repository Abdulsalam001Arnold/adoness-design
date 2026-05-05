# 🚀 AGENTS.md - Adoness AI Development Guidelines

## 🎯 Project Overview

**Adoness** is a next-generation AI-powered content generation platform designed to help users create high-quality, engaging content effortlessly. The platform features a modular architecture with distinct AI agents for different content types, a robust content management system, and a seamless user experience.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (via Prisma)
- **Deployment**: Vercel

### Backend
- **Framework**: Next.js API Routes
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

### AI Agents
- **Core Framework**: LangChain.js
- **LLMs**: OpenAI (GPT-4o, GPT-3.5-turbo)
- **Vector Stores**: Pinecone
- **Embedding Models**: OpenAI Embeddings
- **Tools**: Custom tools for content generation, image creation, and data processing

## 📂 Project Structure

```
adoness/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard pages
│   ├── auth/               # Authentication pages
│   ├── templates/          # Template pages
│   └── ...
├── components/             # React components
│   ├── ui/                 # Reusable UI components (Shadcn)
│   ├── dashboard/          # Dashboard-specific components
│   ├── templates/          # Template components
│   └── ...
├── lib/                    # Utility functions and helpers
│   ├── agents/             # AI agent implementations
│   ├── db/                 # Database utilities
│   ├── auth/               # Authentication helpers
│   ├── utils/              # General utilities
│   └── ...
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
├── scripts/                # Automation scripts
├── .env.local              # Environment variables
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🧩 AI Agent Architecture

### Agent Types

| Agent Type | Purpose | Key Features |
|------------|---------|--------------|
| **Blog Agent** | Generates long-form blog posts | SEO optimization, tone control, outline generation |
| **Social Media Agent** | Creates social media content | Platform-specific formatting, hashtag generation |
| **Email Agent** | Writes marketing and sales emails | Subject line optimization, CTA generation |
| **Ad Copy Agent** | Generates ad copy | A/B testing variations, platform targeting |
| **Image Agent** | Creates AI-generated images | Style control, aspect ratio options |
| **Video Script Agent** | Generates video scripts | Scene breakdown, voiceover text |

### Agent Workflow

1. **Input Processing**: User provides topic, keywords, and preferences
2. **Outline Generation**: Agent creates a structured outline
3. **Content Generation**: Agent generates content based on outline
4. **Review & Refine**: User reviews and requests revisions
5. **Final Output**: Approved content is saved to database

## 🎨 Design System

### Color Palette

| Color | Usage | CSS Variable |
|-------|-------|--------------|
| **Primary** | Main CTAs, active states | `--primary` |
| **Secondary** | Secondary actions | `--secondary` |
| **Accent** | Highlights, badges | `--accent` |
| **Background** | Page backgrounds | `--background` |
| **Card** | Card backgrounds | `--card` |
| **Text** | Primary text | `--foreground` |
| **Muted** | Secondary text | `--muted` |

### Typography

- **Headings**: Inter, 600-800 weight
- **Body Text**: Inter, 400-500 weight
- **Code**: JetBrains Mono

### Spacing

- Use Tailwind spacing utilities (e.g., `p-4`, `m-2`, `gap-4`)
- Maintain consistent spacing between elements
- Use `gap-*` utilities for flex/grid layouts

### Border Radius

- **Default**: `rounded-lg`
- **Buttons**: `rounded-md`
- **Cards**: `rounded-xl`
- **Input Fields**: `rounded-md`

## 🔐 Authentication

### Authentication Flow

1. **Sign Up**: User provides email and password
2. **Verification**: Email verification (optional)
3. **Login**: User logs in with credentials
4. **Session Management**: NextAuth.js handles sessions
5. **Protected Routes**: Middleware protects authenticated routes

### Environment Variables

```env
# NextAuth.js
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# OpenAI
OPENAI_API_KEY=your-openai-key

# Pinecone
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX_NAME=your-index-name
PINECONE_ENVIRONMENT=your-environment
```

## 💾 Database

### Prisma Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  contents  Content[]
}

model Content {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  title       String
  type        ContentType
  content     Json
  status      ContentStatus @default(DRAFT)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum ContentType {
  BLOG
  SOCIAL_MEDIA
  EMAIL
  AD_COPY
  IMAGE
  VIDEO_SCRIPT
}

enum ContentStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

### Database Commands

```bash
# Generate Prisma client
cd prisma
npx prisma generate

# Apply migrations
npx prisma migrate dev --name init

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

## 🤖 AI Agent Development

### Creating a New Agent

1. **Create Agent File**: Create a new file in `lib/agents/`
2. **Define Tools**: Create necessary tools in `lib/agents/tools/`
3. **Implement Agent**: Use LangChain.js to create the agent
4. **Add to Registry**: Register the agent in `lib/agents/index.ts`
5. **Create UI**: Build corresponding UI components in `components/templates/`

### Agent Implementation Example

```typescript
// lib/agents/blog-agent.ts
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { BlogOutlineTool, BlogContentTool } from "./tools/blog-tools";

export async function createBlogAgent() {
  const model = new ChatOpenAI({ model: "gpt-4o", temperature: 0.7 });
  
  const tools = [
    new BlogOutlineTool(),
    new BlogContentTool(),
  ];
  
  const agent = createReactAgent({ model, tools });
  
  return new AgentExecutor({ agent, tools });
}
```

### Tool Development

```typescript
// lib/agents/tools/blog-tools.ts
import { BaseTool } from "@langchain/core/tools";

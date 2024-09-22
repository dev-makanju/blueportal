This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Some important reasons to know for the technologies that was used in this project

### Zustand for state management
Zustand is a very simple and lightweight state management library for react / it's easy to set up and very easy to use. Also, any new developer can quickly adopt it.
The typical state management tool is to create store -> create an action -> create a mutation to update the state. Zustand already made this simple by allowing a direct update using the set keyword in the store. I can directly made an update to my store data.

### SSG and SSR Implementation

SSR and SSG have their use cases so you don't just use them anyhow, when an update is needed often it's best to adopt SSR which means that everyrequest is looking for new update. pages like dashboard that needs frequent update needs this page - I use this is the product **preview page** Although, content here too can need constant update - assuming a user wants to buy stuff and admin is constantly updating the stock price or programantically update it when someone buy.

It has trade offs, can be slow because of the server rendering.


SSG From the name static side generation, it generate static HTML files during build time, pages that actually do not need any update like the product creation page will adopt SSG - it's better suite for them.


**MY OPINION**: Both can be used hands in hands when building a complex application, you can't choose one over another because they serve different purposes on App creation. The most important thing is making sure that any page that work as a server component should not be using an interaction states like use state or click event - put them in a separate component and apply 'use client' appropriately indicating that it's a client component.

## How the middleware works
When you route to anywhere with the path matching '/products' routes by default you will be redirected to the onboarding screen - when you click the 3 steps at the 3rd click on continue (3rd page of onboarding) a cookie is set showing that you are loggedIn.

This method help us validate the login process.


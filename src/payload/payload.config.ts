import dotenv from 'dotenv';
import type { Configuration } from 'webpack';
import path from 'path';
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import stripePlugin from '@payloadcms/plugin-stripe';
import { slateEditor } from '@payloadcms/richtext-slate';

import Users from './collections/Users';
import { priceUpdated } from './stripe/webhooks/priceUpdated';
import { productUpdated } from './stripe/webhooks/productUpdated';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {},
    webpack: (config: Configuration): Configuration => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        dotenv: path.resolve(__dirname, './dotenv.js'),
      };
      return config;// <-- This line resolves your "editor is missing" error
     },
  },
  editor: slateEditor({}), // Add this line to include the editor configuration
  collections: [
    Users,
  ],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
      rest: false,
      webhooks: {
        price: priceUpdated,
        product: productUpdated,
      },
    }),
  ],
});

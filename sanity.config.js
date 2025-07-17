// sanity.config.js
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes'; 

export default defineConfig({
  basePath: '/studio',
  name: 'arcarea_studio',
  title: 'Arcarea CMS',
  projectId: 'zgtxw8fc',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schema,
  },
});

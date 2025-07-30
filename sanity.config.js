import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure'; // ✅ fixed path

export default defineConfig({
  basePath: '/studio',
  name: 'arcarea_studio',
  title: 'Arcarea CMS',
  projectId: 'zgtxw8fc',
  dataset: 'production',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schema,
  },
});

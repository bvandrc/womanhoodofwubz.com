import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { SANITY_DATASET, SANITY_PROJECT_ID } from '../sanity-constants'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Womanhood of Wubz',

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

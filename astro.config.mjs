// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// El panel de carga solo se activa cuando trabajás en tu computadora
const esDesarrollo = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  integrations: esDesarrollo ? [react(), markdoc(), keystatic()] : [],
  output: 'static',
});
import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  singletons: {
    reguladores: singleton({
      label: 'Organismos',
      path: 'src/data/reguladores',
      format: 'json',
      schema: {
        items: fields.array(
          fields.object({
            id: fields.text({
              label: 'ID (minúsculas y sin espacios, ej: nrc)',
              validation: { isRequired: true },
            }),
            nombre: fields.text({ label: 'Nombre', validation: { isRequired: true } }),
            sigla: fields.text({ label: 'Sigla' }),
            pais: fields.text({ label: 'País' }),
            tipo: fields.select({
             label: 'Tipo de organismo',
             options: [
              { label: 'Regulador', value: 'regulador' },
             { label: 'Organismo internacional', value: 'internacional' },
              ],
             defaultValue: 'regulador',
            }),
            descripcion: fields.text({ label: 'Descripción', multiline: true }),
            sitioWeb: fields.url({ label: 'Sitio web' }),
            iniciativas: fields.array(
              fields.object({
                titulo: fields.text({ label: 'Título' }),
                descripcion: fields.text({ label: 'Descripción', multiline: true }),
                anio: fields.integer({ label: 'Año' }),
                enlace: fields.url({ label: 'Enlace' }),
                estado: fields.select({
                  label: 'Estado',
                  options: [
                    { label: 'En curso', value: 'en curso' },
                    { label: 'Finalizada', value: 'finalizada' },
                    { label: 'Planificada', value: 'planificada' },
                  ],
                  defaultValue: 'en curso',
                }),
              }),
              {
                label: 'Iniciativas',
                itemLabel: (props) => props.fields.titulo.value || 'Nueva iniciativa',
              }
            ),
            documentos: fields.array(
              fields.object({
                titulo: fields.text({ label: 'Título' }),
                anio: fields.integer({ label: 'Año' }),
                enlace: fields.url({ label: 'Enlace' }),
                archivo: fields.file({
                  label: 'Archivo (PDF, Word, Excel, etc.)',
                  directory: 'public/archivos',
                  publicPath: '/archivos/',
                }),
                tipo: fields.select({
                  label: 'Tipo',
                  options: [
                    { label: 'Guía', value: 'guía' },
                    { label: 'Informe', value: 'informe' },
                    { label: 'Norma', value: 'norma' },
                    { label: 'Comunicado', value: 'comunicado' },
                  ],
                  defaultValue: 'informe',
                }),
              }),
              {
                label: 'Documentos',
                itemLabel: (props) => props.fields.titulo.value || 'Nuevo documento',
              }
            ),
            ultimaActualizacion: fields.date({ label: 'Última actualización' }),
          }),
          {
            label: 'Organismos',
            itemLabel: (props) => props.fields.nombre.value || 'Nuevo organismo',
          }
        ),
      },      
    }),
    aplicaciones: singleton({
      label: 'Casos de aplicación de IA',
      path: 'src/data/aplicaciones',
      format: 'json',
      schema: {
        items: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
            organismo: fields.text({ label: 'Organismo que lo usa (ej: NRC)' }),
            area: fields.select({
              label: 'Área de aplicación',
              options: [
                { label: 'Evaluación de seguridad', value: 'evaluación de seguridad' },
                { label: 'Inspección', value: 'inspección' },
                { label: 'Licenciamiento', value: 'licenciamiento' },
                { label: 'Gestión documental', value: 'gestión documental' },
                { label: 'Otra', value: 'otra' },
              ],
              defaultValue: 'otra',
            }),
            descripcion: fields.text({ label: 'Descripción', multiline: true }),
            anio: fields.integer({ label: 'Año' }),
            estado: fields.select({
              label: 'Estado',
              options: [
                { label: 'En exploración', value: 'en exploración' },
                { label: 'Piloto', value: 'piloto' },
                { label: 'En uso', value: 'en uso' },
              ],
              defaultValue: 'en exploración',
            }),
            enlace: fields.url({ label: 'Enlace a la fuente' }),
          }),
          {
            label: 'Casos',
            itemLabel: (props) => props.fields.titulo.value || 'Nuevo caso',
          }
        ),
      },
    }),
    contexto: singleton({
      label: 'Contexto internacional',
      path: 'src/data/contexto',
      format: 'json',
      schema: {
        items: fields.array(
          fields.object({
            fecha: fields.date({ label: 'Fecha', validation: { isRequired: true } }),
            titulo: fields.text({ label: 'Título', validation: { isRequired: true } }),
            descripcion: fields.text({ label: 'Descripción breve', multiline: true }),
            categoria: fields.select({
              label: 'Categoría',
              options: [
                { label: 'Normativa', value: 'normativa' },
                { label: 'Tecnología', value: 'tecnología' },
                { label: 'Evento', value: 'evento' },
                { label: 'Publicación', value: 'publicación' },
                { label: 'Otra', value: 'otra' },
              ],
              defaultValue: 'otra',
            }),
            enlace: fields.url({ label: 'Enlace a la fuente' }),
          }),
          {
            label: 'Hechos',
            itemLabel: (props) => props.fields.titulo.value || 'Nuevo hecho',
          }
        ),
      },
    }),
  },
});
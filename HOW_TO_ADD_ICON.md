# 💌 Cómo Agregar el Icono del Sobre Rosado

## Opción 1: Método Rápido (Recomendado)

### 1. Guarda tu imagen
Guarda la imagen del sobre rosado que me mostraste en tu escritorio o en la carpeta del proyecto.

### 2. Usa el script automático

```bash
# Si tu imagen se llama "sobre-rosado.png"
./generate-icons.sh sobre-rosado.png
```

¡Listo! El script creará todos los iconos necesarios automáticamente.

## Opción 2: Conversión Online (Sin instalar nada)

### Paso 1: Preparar la imagen
1. Guarda la imagen del sobre rosado
2. Ve a [https://www.iloveimg.com/resize-image](https://www.iloveimg.com/resize-image)

### Paso 2: Crear icon-192x192.png
1. Sube tu imagen
2. Cambia el tamaño a: **192 x 192 píxeles**
3. Descarga como `icon-192x192.png`
4. Muévela a la carpeta `public/`

### Paso 3: Crear icon-512x512.png
1. Sube tu imagen de nuevo
2. Cambia el tamaño a: **512 x 512 píxeles**
3. Descarga como `icon-512x512.png`
4. Muévela a la carpeta `public/`

### Paso 4: (Opcional) Crear favicon
1. Sube tu imagen de nuevo
2. Cambia el tamaño a: **32 x 32 píxeles**
3. Descarga como `favicon.ico`
4. Muévela a la carpeta `public/`

## Opción 3: Usar Herramienta PWA

1. Ve a [https://www.pwabuilder.com/imageGenerator](https://www.pwabuilder.com/imageGenerator)
2. Sube tu imagen del sobre rosado
3. Descarga el paquete completo de iconos
4. Extrae los archivos a la carpeta `public/`

## Verificar que Funciona

Después de agregar los iconos:

```bash
# Inicia el servidor
npm run dev

# Abre en el navegador
open http://localhost:3000

# Revisa que:
# 1. El icono aparece en la pestaña del navegador
# 2. Cuando instalas la PWA, usa el icono correcto
```

## Archivos que Necesitas Crear

```
public/
  ├── icon-192x192.png    ← Icono estándar (REQUERIDO)
  ├── icon-512x512.png    ← Icono alta resolución (REQUERIDO)
  ├── favicon.ico         ← Icono navegador (Opcional)
  └── apple-touch-icon.png ← Icono iOS (Opcional, 180x180)
```

## Tips

- **Usa PNG con fondo transparente** para mejor resultado
- **La imagen debe ser cuadrada** (mismo ancho y alto)
- **Mantén el diseño simple** - debe verse bien pequeño
- **Colores brillantes** funcionan mejor en pantallas

## ¿Necesitas Ayuda?

Si tienes problemas:

1. Verifica que los archivos estén en `public/`
2. Los nombres deben ser exactos: `icon-192x192.png` y `icon-512x512.png`
3. Reinicia el servidor de desarrollo después de agregar los iconos
4. Limpia el caché del navegador (Cmd+Shift+R en Mac)

---

Una vez que agregues los iconos, la app usará tu sobre rosado en:
- 📱 Icono de la app cuando se instala
- 🌐 Pestaña del navegador
- 📲 Pantalla de inicio en móviles
- 💕 Splash screen al abrir la PWA

¡Tu app se verá hermosa con el sobre rosado! 💌

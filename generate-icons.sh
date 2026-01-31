#!/bin/bash

# Script to generate PWA icons from source image
# Usage: ./generate-icons.sh your-image.png

if [ -z "$1" ]; then
    echo "❌ Error: Please provide an image file"
    echo "Usage: ./generate-icons.sh your-envelope-icon.png"
    exit 1
fi

SOURCE_IMAGE=$1

if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ Error: File '$SOURCE_IMAGE' not found"
    exit 1
fi

echo "🎨 Generating PWA icons from: $SOURCE_IMAGE"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Installing..."
    brew install imagemagick
fi

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Generate 192x192 icon
echo "📱 Creating 192x192 icon..."
convert "$SOURCE_IMAGE" -resize 192x192 -gravity center -extent 192x192 public/icon-192x192.png

# Generate 512x512 icon
echo "📱 Creating 512x512 icon..."
convert "$SOURCE_IMAGE" -resize 512x512 -gravity center -extent 512x512 public/icon-512x512.png

# Generate favicon
echo "🌐 Creating favicon..."
convert "$SOURCE_IMAGE" -resize 32x32 public/favicon.ico

# Generate Apple Touch Icon (180x180)
echo "🍎 Creating Apple Touch Icon..."
convert "$SOURCE_IMAGE" -resize 180x180 -gravity center -extent 180x180 public/apple-touch-icon.png

echo ""
echo "✅ Icons generated successfully!"
echo ""
echo "Generated files:"
echo "  - public/icon-192x192.png"
echo "  - public/icon-512x512.png"
echo "  - public/favicon.ico"
echo "  - public/apple-touch-icon.png"
echo ""
echo "🎉 Your PWA icons are ready!"

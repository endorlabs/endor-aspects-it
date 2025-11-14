# Image Resizer - React Application

A modern React application that resizes any image to exactly 100×100 pixels, built with Material-UI and following Atomic Design principles.

## Features

- 🖼️ **Drag & Drop Upload** - Easy image upload with drag-and-drop support
- 📏 **Precise Resizing** - Resizes any image to exactly 100×100 pixels
- 👀 **Side-by-Side Comparison** - View original and resized images together
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Material-UI Design** - Beautiful, modern interface
- 📥 **Download Support** - Download the resized image instantly
- 🔄 **Real-time Processing** - Client-side image processing using Canvas API

## Technology Stack

- **React 19** - Modern React with hooks
- **Material-UI v5** - Component library and theming
- **Vite** - Fast build tool and dev server
- **PNPM** - Fast, disk space efficient package manager
- **React Dropzone** - Drag-and-drop file upload
- **File Saver** - Client-side file downloads
- **React Hot Toast** - Toast notifications
- **Canvas API** - Image processing and resizing

## Project Structure (Atomic Design)

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   │   ├── ImagePreview.jsx
│   │   └── FileUploadButton.jsx
│   ├── molecules/      # Simple component combinations
│   │   ├── ImageUploader.jsx
│   │   └── ImageComparison.jsx
│   ├── organisms/      # Complex UI sections
│   │   └── ImageResizerCard.jsx
│   └── templates/      # Page layouts
│       └── MainLayout.jsx
├── utils/
│   └── imageResizer.js # Image processing utilities
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
pnpm run build
```

## Usage

1. **Upload an Image**: Drag and drop an image file or click "Browse Files"
2. **View Comparison**: See both original and resized images side-by-side
3. **Download Result**: Click "Download Resized Image" to save the 100×100 version

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- BMP (.bmp)

## How It Works

The application uses the HTML5 Canvas API to:
1. Load the uploaded image
2. Create a 100×100 pixel canvas
3. Scale the image to fit within the canvas while maintaining aspect ratio
4. Center the image on a white background
5. Export as a PNG file

## Development

The project follows Atomic Design methodology:
- **Atoms**: Basic UI elements (buttons, image previews)
- **Molecules**: Simple combinations (uploader, comparison)
- **Organisms**: Complex sections (main resizer card)
- **Templates**: Page layouts (main layout wrapper)

## License

MIT License - see LICENSE file for details.
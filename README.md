# C. elegans Neurotoxicity Screening Demo

A web-based demo for high-throughput morphological analysis of *C. elegans* dopaminergic neurons, based on self-supervised learning.

## Features

Four analysis modules covering 10 key metrics:

1. **Bead Analysis** — bead count, mean bead size
2. **Soma Analysis** — CEP count & size, ADE count & size
3. **Dendrite Analysis** — dendrite length
4. **Morphology Analysis** — breakage, overgrowth, abnormal bending

Also includes a BSR (Basal Slowing Response) scoring overview linking morphology to behavioral function.

## Usage

1. Select a sample (8 demo samples available)
2. Click **Preprocess** to view the 3-step preprocessing pipeline (crop → rotate → HE stain)
3. Click **Generate** to see the task result with metrics and overlay visualization

Supports Chinese / English i18n and dark / light theme.

## Project Structure

```
├── index.html              # Landing page
├── analysis.html           # Analysis workspace
├── settings.html           # Theme & language settings
├── styles.css              # Stylesheet
├── prefs.js                # Theme & language initialization
├── i18n.js                 # Chinese / English strings
├── data.js                 # Sample data, metrics, task metadata
├── home.js                 # Landing page logic
├── analysis.js             # Workspace logic (preprocess, result, export)
├── quick-start-guide.js    # First-visit guided tour
├── tooltip.js              # Terminology tooltips
├── image-zoom.js            # Pan & zoom for workspace images
├── scroll-reveal.js        # Scroll-triggered animations
├── images/
│   ├── original/           # Raw neuron images (8 samples)
│   ├── preprocessed/       # Crop, rotate, HE stain outputs
│   └── results/            # Analysis result overlays (4 tasks × 8 samples)
└── README.md
```

## Tech Stack

- HTML5, CSS3 (responsive, custom properties, animations)
- Vanilla JavaScript (no framework)
- WebP images for optimized loading

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+

## License

For academic demonstration purposes only.

## Reference

Lv Shenchong, Sun Yutao, Tu Zijian, et al. *High-throughput neurotoxicity screening in Caenorhabditis elegans dopaminergic neurons with self-supervised learning.*
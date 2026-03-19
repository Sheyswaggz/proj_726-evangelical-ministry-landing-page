# Evangelical Ministry Landing Page

A simple, accessible, and welcoming static landing page for Grace Community Church, designed to establish an online presence and connect with the community.

## Project Overview

This landing page serves as a digital front door for our evangelical ministry, providing essential information to visitors, members, and those seeking spiritual guidance. The site is built with semantic HTML5, ensuring accessibility and optimal performance across all devices.

## Ministry Mission

At Grace Community Church, we are dedicated to sharing the Gospel of Jesus Christ and building a loving community of believers. Our mission is to:

- Proclaim the Good News of salvation through Jesus Christ
- Nurture spiritual growth through biblical teaching
- Serve our community with compassion and love
- Create a welcoming environment for all who seek God

## Features

- **Semantic HTML5 Structure**: Built with accessibility-first principles using proper ARIA labels and semantic elements
- **SEO Optimized**: Complete meta tags, Open Graph tags, and structured data markup
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Performance Optimized**: Fast loading times with optimized assets
- **Accessibility Compliant**: WCAG 2.1 guidelines adherence with skip navigation and proper heading hierarchy

## Deployment Instructions

### GitHub Pages Deployment

1. **Initial Setup**
   - Ensure all files (index.html, styles.css, main.js) are in the repository root or appropriate directories
   - Commit all changes to the main branch

2. **Enable GitHub Pages**
   - Navigate to your repository on GitHub
   - Go to Settings → Pages
   - Under "Source", select the branch you want to deploy (usually `main`)
   - Select the root folder `/` (or `/docs` if you organize files there)
   - Click "Save"

3. **Access Your Site**
   - Your site will be available at: `https://[username].github.io/[repository-name]/`
   - GitHub Pages typically deploys within 1-2 minutes
   - Check the Pages settings for the exact URL

4. **Custom Domain (Optional)**
   - In GitHub Pages settings, you can add a custom domain
   - Update your DNS records to point to GitHub Pages
   - Add a CNAME file to your repository with your custom domain

### Alternative Hosting Options

- **Netlify**: Drag and drop deployment or connect to GitHub
- **Vercel**: Zero-configuration deployment from GitHub
- **Cloudflare Pages**: Fast global CDN with automatic deployments

## Content Update Guidelines

### For Ministry Staff

This section helps non-technical staff update the website content safely.

#### Updating Service Times

1. Open the `index.html` file
2. Locate the contact section (search for "Service Times")
3. Update the times between the `<p>` tags
4. Save the file and commit changes

#### Updating Contact Information

1. Open `index.html`
2. Find the contact section (near the bottom of the page)
3. Update the following:
   - **Address**: Located in the structured data and contact section
   - **Phone**: Update the `tel:` link and displayed number
   - **Email**: Update the `mailto:` link and displayed email
4. Save and commit changes

#### Adding Testimonials or Updates

1. Locate the appropriate section in `index.html`
2. Copy the existing HTML structure for consistency
3. Paste and modify with new content
4. Maintain the same HTML tags for proper styling

#### Best Practices

- **Test locally**: Open the HTML file in a browser before committing
- **Keep backups**: Download a copy before making major changes
- **Small changes**: Make one change at a time for easier troubleshooting
- **Ask for help**: Contact technical support if unsure about any changes

## Technical Specifications

### Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile, Samsung Internet
- **Legacy Support**: Graceful degradation for older browsers

### Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with responsive design
- **JavaScript**: Progressive enhancement for interactive features
- **No Framework Dependencies**: Pure HTML/CSS/JS for maximum compatibility

### File Structure

```
/
├── index.html          # Main landing page
├── styles.css          # Stylesheet (to be created)
├── main.js            # JavaScript functionality (to be created)
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

### Accessibility Features

- **Skip Navigation**: Quick access to main content
- **ARIA Labels**: Descriptive labels for screen readers
- **Semantic HTML**: Proper heading hierarchy (h1-h6)
- **Keyboard Navigation**: Full keyboard accessibility
- **Alt Text**: Descriptive alternative text for all images
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Indicators**: Visible focus states for interactive elements

### SEO Features

- **Meta Tags**: Title, description, and viewport tags
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema.org markup for search engines
- **Semantic HTML**: Proper content structure for search crawlers
- **Canonical URL**: Prevents duplicate content issues

## Contact Information for Technical Support

For technical assistance with the website:

- **Primary Contact**: Web Ministry Team
- **Email**: webmaster@gracecommunitychurch.org
- **Phone**: (555) 123-4567
- **Response Time**: Within 24-48 hours

For urgent issues affecting site availability:
- **Emergency Contact**: (555) 123-4567 (ext. 100)

## Development

### Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Make changes to HTML, CSS, or JavaScript files
4. Refresh the browser to see changes

### Testing

- Test in multiple browsers
- Verify mobile responsiveness
- Check accessibility with screen readers
- Validate HTML using W3C validator
- Test all links and forms

## License

This website is developed for Grace Community Church. All rights reserved.

## Version History

- **v1.0** - Initial release with foundational structure
  - Semantic HTML5 structure
  - Complete meta tags and SEO optimization
  - Accessibility features
  - Contact section with service times
  - About section with ministry mission

---

**Grace Community Church** - Sharing God's Love, Building God's Kingdom

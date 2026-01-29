import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOSTNAME = 'https://groupify.dev';

// 1. Get static routes from src/routes
function getStaticRoutes(dir, base = '') {
    const routes = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Skip directories starting with $ (dynamic) or __ (root)
            if (item.startsWith('$') || item.startsWith('__')) continue;
            
            // Handle pathless layouts (starting with _)
            const nextBase = item.startsWith('_') ? base : `${base}/${item}`;
            routes.push(...getStaticRoutes(fullPath, nextBase));
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            // Skip files starting with $ or __
            if (item.startsWith('$') || item.startsWith('__')) continue;
            
            let routeName = item.replace(/\.(tsx|ts)$/, '');
            
            // Handle index files
            if (routeName === 'index') {
                routes.push(base || '/');
            } else if (routeName === 'route') {
                // route.tsx is usually a layout or a base route
                if (base) routes.push(base);
            } else if (!routeName.startsWith('_')) {
                routes.push(`${base}/${routeName}`);
            }
        }
    }
    return [...new Set(routes)];
}

// 2. Get blog posts from API
async function getBlogPosts() {
    try {
        const response = await fetch('https://coolify.groupify.dev/directus/items/posts?limit=-1');
        
        if (!response.ok) {
            console.warn('Failed to fetch blog posts from API:', response.status);
            return [];
        }
        
        const data = await response.json();
        
        // Only include published posts in sitemap
        return data.data
            .filter(post => post.status === 'published')
            .map(post => `/blog/${post.slug}`);
            
    } catch (error) {
        console.warn('Error fetching blog posts from API:', error.message);
        return [];
    }
}

async function generate() {
    console.log('Generating sitemap...');

    const routesDir = path.join(rootDir, 'src/routes');
    const staticRoutes = getStaticRoutes(routesDir);
    const blogPosts = await getBlogPosts();

    // Filter out some internal or dashboard routes that shouldn't be indexed
    const excludedPrefixes = ['/subscriptions/confirm', '/share'];
    const filteredStaticRoutes = staticRoutes.filter(route => 
        !excludedPrefixes.some(prefix => route.startsWith(prefix)) &&
        route !== ''
    );

    const allRoutes = [...new Set(['/', ...filteredStaticRoutes, ...blogPosts])];
    
    console.log(`📝 Found ${blogPosts.length} published blog posts from API`);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.sort().map(route => `  <url>
    <loc>${HOSTNAME}${route === '/' ? '' : route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/blog') ? '0.8' : '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;

    const publicDir = path.join(rootDir, 'public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(publicDir, 'sitemap.txt'), sitemap);

    console.log(`✅ Sitemap generated with ${allRoutes.length} routes!`);
    console.log(`📍 Saved to: ${path.join(publicDir, 'sitemap.xml')}`);
}

generate().catch(console.error);
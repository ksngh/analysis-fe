import { RankingItemOut, GraphNode, GraphEdge } from '@/types';

export function createGraphData(items: RankingItemOut[], showFlags: boolean = true) {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  
  // Track unique brands and flags to avoid duplicates
  const brandNodes = new Map<string, GraphNode>();
  const flagNodes = new Map<string, GraphNode>();
  
  // Create product nodes and collect brands/flags
  items.forEach((item, index) => {
    const productId = item.goods_no || `product-${item.name.replace(/\s+/g, '-')}-${index}`;
    
    // Create product node
    const productNode: GraphNode = {
      id: `product:${productId}`,
      type: 'product',
      data: {
        label: item.name,
        item,
      },
      position: { x: 0, y: 0 }, // Will be positioned by layout
    };
    nodes.push(productNode);
    
    // Create brand node if not exists
    if (item.brand) {
      const brandId = `brand:${item.brand}`;
      if (!brandNodes.has(brandId)) {
        const brandNode: GraphNode = {
          id: brandId,
          type: 'brand',
          data: {
            label: item.brand,
            brand: item.brand,
            products: [],
          },
          position: { x: 0, y: 0 },
        };
        brandNodes.set(brandId, brandNode);
      }
      
      // Add product to brand's product list
      const brandNode = brandNodes.get(brandId)!;
      brandNode.data.products = brandNode.data.products || [];
      brandNode.data.products.push(item);
      
      // Create edge from brand to product
      edges.push({
        id: `${brandId}-${productNode.id}`,
        source: brandId,
        target: productNode.id,
      });
    }
    
    // Create flag nodes and edges if enabled
    if (showFlags && item.flags.length > 0) {
      item.flags.forEach(flag => {
        const flagId = `flag:${flag}`;
        if (!flagNodes.has(flagId)) {
          const flagNode: GraphNode = {
            id: flagId,
            type: 'flag',
            data: {
              label: flag,
              flag,
              products: [],
            },
            position: { x: 0, y: 0 },
          };
          flagNodes.set(flagId, flagNode);
        }
        
        // Add product to flag's product list
        const flagNode = flagNodes.get(flagId)!;
        flagNode.data.products = flagNode.data.products || [];
        flagNode.data.products.push(item);
        
        // Create edge from product to flag
        edges.push({
          id: `${productNode.id}-${flagId}`,
          source: productNode.id,
          target: flagId,
        });
      });
    }
  });
  
  // Add brand and flag nodes to the main nodes array
  nodes.push(...Array.from(brandNodes.values()));
  if (showFlags) {
    nodes.push(...Array.from(flagNodes.values()));
  }
  
  // Apply basic circular layout
  const centerX = 400;
  const centerY = 300;
  const radius = 200;
  
  nodes.forEach((node, index) => {
    const angle = (index / nodes.length) * 2 * Math.PI;
    const nodeRadius = node.type === 'brand' ? radius * 0.7 : 
                      node.type === 'flag' ? radius * 1.3 : radius;
    
    node.position = {
      x: centerX + Math.cos(angle) * nodeRadius,
      y: centerY + Math.sin(angle) * nodeRadius,
    };
  });
  
  return { nodes, edges };
}

export function filterItems(items: RankingItemOut[], filters: {
  searchTerm: string;
  rankRange: [number, number];
  sortBy: 'rank_asc' | 'rank_desc' | 'discount_desc';
}): RankingItemOut[] {
  let filtered = items.filter(item => {
    // Search filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(term);
      const matchesBrand = item.brand?.toLowerCase().includes(term) || false;
      if (!matchesName && !matchesBrand) return false;
    }
    
    // Rank range filter
    if (item.rank !== null) {
      if (item.rank < filters.rankRange[0] || item.rank > filters.rankRange[1]) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'rank_asc':
        return (a.rank || 999) - (b.rank || 999);
      case 'rank_desc':
        return (b.rank || 0) - (a.rank || 0);
      case 'discount_desc':
        const discountA = a.org_price && a.cur_price ? 
          ((a.org_price - a.cur_price) / a.org_price) * 100 : 0;
        const discountB = b.org_price && b.cur_price ? 
          ((b.org_price - b.cur_price) / b.org_price) * 100 : 0;
        return discountB - discountA;
      default:
        return 0;
    }
  });
  
  return filtered;
}
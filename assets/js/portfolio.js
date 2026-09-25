/**
 * Altair Sign & Light - Portfolio Filtering & Lightbox Modal Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  initProjectLightbox();
});

/* --------------------------------------------------------------------------
   1. Portfolio Filtering System
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterCategory === 'all' || itemCategory === filterCategory || item.classList.contains('pinned-stadium')) {
          item.style.display = 'flex';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2. Project Lightbox Modal
   -------------------------------------------------------------------------- */
const projectData = {
  'mercedes-benz': {
    title: 'Mercedes-Benz Stadium Illuminated Channel Letters & Signage',
    category: 'Sports & Venues / Stadium Scale',
    location: 'Downtown Atlanta, GA',
    scope: 'Turnkey Design, Engineering, In-House Fabrication, High-Rise Crane Installation, & Ongoing Warrantied Maintenance.',
    specs: [
      { label: 'Sign Type', value: 'High-Rise Halo-Lit Channel Letters & LED Displays' },
      { label: 'Scale', value: '180+ Feet Total Frontage Height' },
      { label: 'Illumination', value: 'Custom 6500K High-Output LED Modules' },
      { label: 'Permitting', value: '100% In-House Atlanta Expedited Commercial Permit' },
      { label: 'Warranty', value: '5-Year Complete Labor + Materials Warranty' }
    ],
    placeholderLabel: '[Placeholder: Mercedes-Benz Stadium Illuminated Halo-Lit Signage at Night]'
  },
  'truist-park': {
    title: 'Truist Park Main Gateway Pylon & Tenant Signage System',
    category: 'Sports & Venues / Commercial Pylon',
    location: 'Cobb County / Atlanta, GA',
    scope: 'Heavy-duty steel structural fabrication, digital LED message boards, tenant panel grid, and crane installation.',
    specs: [
      { label: 'Sign Type', value: 'Monument Pylon & Multi-Tenant Illuminated Cabinets' },
      { label: 'Height', value: '45 Feet Steel Column Structure' },
      { label: 'Technology', value: 'Full-Color 10mm Pitch Outdoor LED Matrix' },
      { label: 'Permitting', value: 'Cobb County Commercial Variance & Permitting' },
      { label: 'Warranty', value: '5-Year Labor + Materials Coverage' }
    ],
    placeholderLabel: '[Placeholder: Truist Park Main Entrance Monument & LED Message Center]'
  },
  'state-farm-arena': {
    title: 'State Farm Arena Architectural Wayfinding & Exterior Signage',
    category: 'Sports & Venues / Interior & Architectural',
    location: 'Atlanta, GA',
    scope: 'Interior lobby signs, concourse wayfinding pylons, illuminated vomitory signage, and premium architectural graphics.',
    specs: [
      { label: 'Sign Type', value: 'Architectural Wayfinding & Custom Fabricated Metal Letters' },
      { label: 'Materials', value: 'Brushed Aluminum, Acrylic Edge Lighting' },
      { label: 'Installation', value: 'Multi-crew In-House Nighttime Install' },
      { label: 'Warranty', value: '5-Year Comprehensive Warranty' }
    ],
    placeholderLabel: '[Placeholder: State Farm Arena Concourse Wayfinding & Architectural Signage]'
  }
};

function initProjectLightbox() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const clickableCards = document.querySelectorAll('[data-project-id]');
  
  clickableCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = card.getAttribute('data-project-id');
      const data = projectData[projectId];

      if (data) {
        modal.querySelector('#modal-project-title').textContent = data.title;
        modal.querySelector('#modal-project-category').textContent = data.category;
        modal.querySelector('#modal-project-location').textContent = data.location;
        modal.querySelector('#modal-project-scope').textContent = data.scope;
        modal.querySelector('#modal-placeholder-label').textContent = data.placeholderLabel;

        const specsContainer = modal.querySelector('#modal-project-specs');
        specsContainer.innerHTML = data.specs.map(spec => `
          <div class="stadium-spec-item" style="padding: 0.4rem 0; border-bottom: 1px solid var(--color-border);">
            <span style="color: var(--color-muted);">${spec.label}:</span>
            <strong style="color: var(--color-navy);">${spec.value}</strong>
          </div>
        `).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

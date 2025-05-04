/* collapse-summary.js  ------------------------------------------------
   Makes the “Read More / Read Less” button work on every
   .collapse-summary block.  Works with Toha’s default HTML (which
   already carries the .collapsed class in the markup).
--------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.collapse-summary').forEach(container => {
      const text   = container.querySelector('.summary-text');
      const button = container.querySelector('.toggle-summary');
  
      /* --- 1. Measure full height (temporarily un-clamp if needed) ---- */
      const hadClass = text.classList.contains('collapsed');
      if (hadClass) text.classList.remove('collapsed');
      const fullHeight = text.scrollHeight;
      if (hadClass) text.classList.add('collapsed');   // put it back
  
      /* --- 2. Compare with the clamped height ------------------------ */
      const clampedHeight = text.clientHeight;
  
      if (fullHeight > clampedHeight) {
        button.style.display = 'inline-block';
      } else {
        /* Summary is ≤2 lines → leave it expanded, hide button */
        text.classList.remove('collapsed');
        return;
      }

    // Helper: ask Filterizr (or any resize listener) to recalculate layout
    function relayoutGrid() {
        // 🔹 If Filterizr v2 is present -------------------------------
        if (window.Filterizr && typeof window.Filterizr.refresh === 'function') {
        // The container has class .container-filter in Toha
        const filterInstance = window.Filterizr.getInstance('.container-filter');
        filterInstance?.refresh();        // v2 API
        return;
        }
    
        // 🔹 Fallback: broadcast a resize event -----------------------
        // Lots of libraries (Filterizr v1, Isotope, Masonry) listen for this
        window.dispatchEvent(new Event('resize'));
    }
        
  
      /* --- 3. Toggle on click ---------------------------------------- */
      button.addEventListener('click', () => {
        const collapsed = text.classList.toggle('collapsed');
        button.textContent = collapsed ? 'Read More' : 'Read Less';
        
        /* wait for the CSS transition to finish before re-laying out */
        if (!collapsed) {          // just expanded
            text.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        setTimeout(relayoutGrid, 0);   // 20 ms transition buffer
      });
    });
  });
  
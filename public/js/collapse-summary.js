/* collapse-summary.js  ------------------------------------------------
   Makes the "Read More / Read Less" button work on every
   .collapse-summary block.  Works with Toha's default HTML (which
   already carries the .collapsed class in the markup).
--------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    console.log('[collapse-summary] Script loaded and running');
    
    const summaries = document.querySelectorAll('.collapse-summary');
    console.log('[collapse-summary] Found summaries:', summaries.length);

    summaries.forEach((container, index) => {
        const text = container.querySelector('.summary-text');
        const button = container.querySelector('.toggle-summary');
        
        console.log(`[collapse-summary] Summary ${index + 1}:`, {
            hasText: !!text,
            hasButton: !!button
        });

        if (!text || !button) {
            console.warn('[collapse-summary] Missing required elements for summary', index + 1);
            return;
        }

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

        /* --- 3. Toggle on click ---------------------------------------- */
        button.addEventListener('click', () => {
            const collapsed = text.classList.toggle('collapsed');
            button.textContent = collapsed ? 'Read More' : 'Read Less';
        });
    });
});

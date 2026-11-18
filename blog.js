// Lògica compartida de la Sala de premsa (pàgina d'inici i pàgina de totes les notícies)
window.CBBlog = (function(){
  const fmt = d => new Date(d+'T12:00:00').toLocaleDateString('ca-ES',{day:'numeric',month:'long',year:'numeric'});
  const esc = s => String(s).replace(/[&<>"]/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const sorted = () => BLOG_POSTS.slice().sort((a,b)=> b.date.localeCompare(a.date));
  let modal;
  function initModal(){
    modal = document.getElementById('postModal');
    if(!modal) return;
    const close = ()=>{ modal.hidden = true; document.body.style.overflow=''; };
    document.getElementById('postClose').addEventListener('click', close);
    modal.addEventListener('click', e=>{ if(e.target===modal) close(); });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
  }
  function openPost(p){
    document.getElementById('postTag').textContent = p.tag||'Club';
    document.getElementById('postTitle').textContent = p.title;
    document.getElementById('postDate').textContent = fmt(p.date);
    const img = document.getElementById('postImg');
    if(p.image){ img.src = p.image; img.hidden = false; } else { img.hidden = true; }
    const t = document.getElementById('postText'); t.innerHTML='';
    (p.body||[p.excerpt||'']).forEach(par=>{ const el=document.createElement('p'); el.textContent=par; t.appendChild(el); });
    modal.hidden = false; document.body.style.overflow='hidden';
  }
  function render(grid, posts){
    grid.innerHTML = '';
    posts.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'blog-card';
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="blog-thumb">${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy"${p.pos ? ` style="object-position:${esc(p.pos)}"` : ''}>` : '<div class="ph-icon">🏀</div>'}</div>
        <div class="blog-body">
          <span class="blog-tag">${esc(p.tag||'Club')}</span>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.excerpt||'')}</p>
          <span class="blog-date">${fmt(p.date)}</span>
          <span class="blog-more">Llegir més →</span>
        </div>`;
      const open = ()=> openPost(p);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e=>{ if(e.key==='Enter') open(); });
      grid.appendChild(card);
    });
  }
  initModal();
  return {sorted, render};
})();

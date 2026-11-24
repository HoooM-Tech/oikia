(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)');
  const motionButton = $('.motion-control');
  const stage = $('.media-stage');
  const hero = $('.hero');
  const ambient = $('.ambient-video');
  let motionPaused = reduce.matches;
  let heroVisible = true;
  let activeStory = 0;
  let scrollFrame = null;
  let pointerFrame = null;
  let lastPointer = {x: 0, y: 0};

  // Keep the sentence readable and preserve its semantic emphasis.
  const reading = $('.reading-text');
  if (reading) {
  const walker = document.createTreeWalker(reading, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).filter(Boolean).forEach(word => {
      if (/^\s+$/.test(word)) fragment.append(document.createTextNode(word));
      else {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        fragment.append(span);
      }
    });
    node.replaceWith(fragment);
  });
  }
  const words = reading ? $$('.word', reading) : [];

  function updateScroll() {
    scrollFrame = null;
    const full = document.documentElement.scrollHeight - innerHeight;
    $('.scroll-progress').style.transform = 'scaleX(' + (full > 0 ? scrollY / full : 0) + ')';
    if (stage && !motionPaused && !reduce.matches) stage.style.setProperty('--spread', clamp(scrollY / 650));
    $('.site-header').classList.toggle('scrolled', scrollY > 20);
    if (!reading) return;
    const rect = reading.getBoundingClientRect();
    const p = motionPaused || reduce.matches ? 1 : clamp((innerHeight * .85 - rect.top) / (rect.height + innerHeight * .24));
    words.forEach((word, index) => word.classList.toggle('is-read', p > (index / words.length)));
  }
  const scheduleScroll = () => {
    if (scrollFrame === null) scrollFrame = requestAnimationFrame(updateScroll);
  };
  window.addEventListener('scroll', scheduleScroll, {passive: true});
  window.addEventListener('resize', scheduleScroll, {passive: true});
  updateScroll();

  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        reveals.unobserve(entry.target);
      }
    });
  }, {threshold: .08, rootMargin: '0px 0px -20px 0px'});
  $$('.reveal').forEach((el, i) => {
    if (el.classList.contains('perspective-card')) el.style.transitionDelay = ((i % 2) * 80) + 'ms';
    reveals.observe(el);
  });

  function ambientPlayback() {
    if (!ambient) return;
    const shouldPlay = heroVisible && !motionPaused && !reduce.matches && !document.hidden && !$('dialog[open]');
    if (shouldPlay) {
      const source = $('source', ambient);
      if (!source.src) {
        source.src = source.dataset.src;
        ambient.load();
      }
      ambient.muted = true;
      ambient.play().catch(() => {}); // Use the poster if autoplay is unavailable.
    } else ambient.pause();
  }
  function updateMotion() {
    if (reduce.matches) motionPaused = true;
    document.documentElement.classList.toggle('motion-paused', motionPaused);
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.disabled = reduce.matches;
    const label = reduce.matches ? 'Reduced motion' : motionPaused ? 'Resume motion' : 'Pause motion';
    motionButton.setAttribute('aria-label', label);
    $('.motion-label', motionButton).textContent = label;
    $('.motion-icon', motionButton).textContent = motionPaused ? '▷' : 'Ⅱ';
    if (motionPaused && stage) {
      stage.style.setProperty('--mx', 0);
      stage.style.setProperty('--my', 0);
    }
    ambientPlayback();
    const storyVideo = $('#story-video');
    if (motionPaused && !storyVideo.hidden) {
      storyVideo.pause();
      $('.story-play').textContent = '▶';
      $('.story-play').setAttribute('aria-label', 'Play video');
    }
    updateScroll();
  }
  motionButton.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
  reduce.addEventListener('change', () => { motionPaused = reduce.matches; updateMotion(); });
  document.addEventListener('visibilitychange', () => {
    ambientPlayback();
    if (document.hidden) $('#story-video').pause();
  });
  if (hero) new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    ambientPlayback();
  }, {threshold: .05}).observe(hero);
  updateMotion();

  if (hero && stage) hero.addEventListener('pointermove', event => {
    if (coarse.matches || motionPaused || reduce.matches) return;
    const rect = hero.getBoundingClientRect();
    lastPointer = {x: ((event.clientX - rect.left) / rect.width - .5) * 2, y: ((event.clientY - rect.top) / rect.height - .5) * 2};
    if (pointerFrame === null) pointerFrame = requestAnimationFrame(() => {
      stage.style.setProperty('--mx', lastPointer.x.toFixed(3));
      stage.style.setProperty('--my', lastPointer.y.toFixed(3));
      pointerFrame = null;
    });
  });
  if (hero && stage) hero.addEventListener('pointerleave', () => {
    stage.style.setProperty('--mx', 0);
    stage.style.setProperty('--my', 0);
  });

  $$('.service').forEach(details => details.addEventListener('toggle', () => {
    if (!details.open) return;
    $$('.service').forEach(other => { if (other !== details) other.open = false; });
    const art = $('.service-art');
    art.style.background = details.dataset.color;
    art.dataset.tone = details.dataset.tone || 'dark';
    const image = $('#service-image');
    const nextSource = '/assets/' + details.dataset.art;
    if (!image.src.endsWith(nextSource)) {
      image.src = nextSource;
      if (!motionPaused && !reduce.matches) image.animate([{opacity: .3, transform: 'scale(1.04)'}, {opacity: 1, transform: 'scale(1)'}], {duration: 650, easing: 'ease-out'});
    }
    const [first, second] = details.dataset.word.split('|');
    const word = $('#service-art-word');
    word.replaceChildren(document.createTextNode(first), document.createElement('br'));
    const italic = document.createElement('i');
    italic.textContent = second;
    word.append(italic);
  }));

  const menuToggle = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
  }
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
  });
  $$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); }
  });

  function showDialog(dialog) {
    $$('dialog[open]').forEach(other => { if (other !== dialog) other.close(); });
    closeMenu();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
    ambientPlayback();
  }
  $$('dialog').forEach(dialog => {
    $('[data-close]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => {
      if (e.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      requestAnimationFrame(() => {
        document.body.classList.toggle('modal-open', !!$('dialog[open]'));
        ambientPlayback();
      });
    });
  });

  const storyDialog = $('.story-dialog');
  const storyVideo = $('#story-video');
  const storyImage = $('#story-image');
  const storyPlay = $('.story-play');
  const stories = [
    {category: '01 / PEOPLE', title: 'People make<br><em>the story.</em>', text: 'An idea becomes something more when people connect with it. OIKIA is a home for that creative exchange — for perspectives, conversations and stories worth sharing.', image: 'portrait.jpg', alt: 'A smiling woman with an expressive sense of style'},
    {category: '02 / PERSPECTIVES', title: 'Ideas,<br><em>out loud.</em>', text: 'A conversation can open up a whole new way of seeing. Podcasting is where our story begins, with space for more voices, fresh perspectives and meaningful connections.', image: 'conversation.jpg', video: true, alt: 'A woman sharing ideas in a conversation'},
    {category: '03 / POSSIBILITY', title: 'Beyond<br><em>the frame.</em>', text: 'Our roots are in podcasting. Our ambition reaches into a wider world of media, where ideas have room to develop, take new forms and find different ways to connect.', image: 'filmmaker.webp', alt: 'A filmmaker working with a cinema camera'},
    {category: '04 / CULTURE', title: 'A different<br><em>way of seeing.</em>', text: 'Africa is full of perspectives worth paying attention to. People, places and culture shape the stories we tell — and the possibilities we see in the world around us.', image: 'culture.webp', alt: 'The National Theatre in Lagos seen from below'}
  ];
  function syncStoryPlay() {
    storyPlay.textContent = storyVideo.paused ? '▶' : 'Ⅱ';
    storyPlay.setAttribute('aria-label', storyVideo.paused ? 'Play video' : 'Pause video');
  }
  function renderStory(index) {
    activeStory = (index + stories.length) % stories.length;
    const story = stories[activeStory];
    storyVideo.pause();
    storyVideo.hidden = !story.video;
    storyImage.hidden = !!story.video;
    storyPlay.hidden = !story.video;
    storyImage.src = '/assets/' + story.image;
    storyImage.alt = story.alt;
    $('.story-category').textContent = story.category;
    $('#story-title').innerHTML = story.title;
    $('.story-text').textContent = story.text;
    $('.story-count').textContent = String(activeStory + 1).padStart(2, '0') + ' / ' + String(stories.length).padStart(2, '0');
    if (!motionPaused && !reduce.matches) {
      $('.story-copy').animate([{opacity: 0, transform: 'translateY(10px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 450, easing: 'ease-out'});
      storyImage.animate([{opacity: .3}, {opacity: 1}], {duration: 500});
    }
    if (story.video && !motionPaused && !reduce.matches) {
      storyVideo.muted = true;
      storyVideo.play().then(syncStoryPlay).catch(syncStoryPlay);
    } else syncStoryPlay();
  }
  $$('[data-story]').forEach(button => button.addEventListener('click', () => {
    showDialog(storyDialog);
    renderStory(Number(button.dataset.story));
  }));
  $('.story-prev').addEventListener('click', () => renderStory(activeStory - 1));
  $('.story-next').addEventListener('click', () => renderStory(activeStory + 1));
  storyDialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); renderStory(activeStory + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); renderStory(activeStory - 1); }
  });
  storyDialog.addEventListener('close', () => storyVideo.pause());
  storyPlay.addEventListener('click', () => {
    if (storyVideo.paused) storyVideo.play().then(syncStoryPlay).catch(syncStoryPlay);
    else { storyVideo.pause(); syncStoryPlay(); }
  });
  storyVideo.addEventListener('pause', syncStoryPlay);
  storyVideo.addEventListener('play', syncStoryPlay);

  $$('[data-community]').forEach(button => button.addEventListener('click', () => showDialog($('.community-dialog'))));
  const contactDialog = $('.contact-dialog');
  const enquiryForm = $('#enquiry-form');
  const enquiryPreview = $('.enquiry-preview', contactDialog);
  const tabs = $$('.contact-tabs [role="tab"]');
  function selectTab(id, focus = false) {
    tabs.forEach(tab => {
      const selected = tab.id === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      $('#' + tab.getAttribute('aria-controls')).hidden = !selected;
      if (selected && focus) tab.focus();
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab.id));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (index + 1) % tabs.length;
      selectTab(tabs[next].id, true);
    });
  });
  function openContact(interest = '', booking = false) {
    const inline = $('#page-enquiry-form');
    if (inline && !booking) {
      if (interest) inline.elements.service.value = interest;
      inline.hidden = false;
      $('[data-enquiry-preview]', inline.parentElement).hidden = true;
      $('#send-enquiry').scrollIntoView({behavior: motionPaused || reduce.matches ? 'instant' : 'smooth'});
      inline.elements.name.focus({preventScroll: true});
      closeMenu();
      return;
    }
    if (interest) enquiryForm.elements.service.value = interest;
    selectTab(booking ? 'booking-tab' : 'enquiry-tab');
    enquiryForm.hidden = false;
    enquiryPreview.hidden = true;
    showDialog(contactDialog);
  }
  $$('[data-booking]').forEach(button => button.addEventListener('click', () => openContact('', true)));
  $$('[data-contact]').forEach(button => button.addEventListener('click', () => openContact(button.dataset.interest || '')));
  $('[data-story-contact]').addEventListener('click', () => openContact());
  $('#enquiry-instead').addEventListener('click', () => selectTab('enquiry-tab', true));

  $$('[data-enquiry-form]').forEach(form => {
    const container = form.parentElement;
    const preview = $('[data-enquiry-preview]', container);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const list = $('dl', preview);
      list.replaceChildren();
      [['name','Your name'],['email','Email address'],['company','Company or podcast'],['service','Service interest'],['project','Your idea']].forEach(([key,label]) => {
        const value = String(data.get(key) || '').trim();
        if (!value) return;
        const term = document.createElement('dt');
        const description = document.createElement('dd');
        term.textContent = label;
        description.textContent = value;
        list.append(term, description);
      });
      form.hidden = true;
      preview.hidden = false;
      $('h3', preview).focus();
    });
    $('[data-edit-enquiry]', preview).addEventListener('click', () => {
      preview.hidden = true;
      form.hidden = false;
      form.elements.name.focus();
    });
  });

  const infoDialog = $('.info-dialog');
  const legalCopy = {
    privacy: {title: 'Privacy policy', copy: '<p class="preview-notice">Sample policy copy for design review. OIKIA’s approved policy will replace this text before launch.</p><h3>Information you choose to share</h3><p>When you contact OIKIA, you may provide your name, email, company or podcast name, and project details. These details would be used to respond to your enquiry and discuss your project.</p><h3>Your choices</h3><p>Enquiring about a project does not automatically subscribe you to a newsletter. Any newsletter subscription would be handled separately through Substack.</p><h3>Tools and providers</h3><p>Final booking, enquiry and newsletter providers, retention periods and privacy contact details will be described in the approved policy. This design preview does not send enquiry form information.</p><p>Sample privacy contact: hello@oikia.example.</p>'},
    terms: {title: 'Terms', copy: '<p class="preview-notice">Sample terms for design review. Final terms require OIKIA’s approval before launch.</p><h3>Using this website</h3><p>This website introduces OIKIA, its interests and its services. Website information does not form a project agreement. Service scope, fees, deliverables and timelines would be agreed separately in writing.</p><h3>Content and creative work</h3><p>Branding, writing and media remain the property of their respective rights holders. Illustrative media in this preview does not represent commissioned client work or an endorsement.</p><h3>Availability and external platforms</h3><p>Booking and newsletter platforms have their own terms. Final information about those providers and any applicable conditions will be included in the approved terms.</p>'},
    cookies: {title: 'Cookie notice', copy: '<p class="preview-notice">Sample cookie notice for design review. The final notice will reflect the tools used on the live website.</p><h3>Essential access</h3><p>The hosting service may use cookies to provide access to this private preview. The OIKIA page itself does not add analytics or marketing cookies.</p><h3>Future integrations</h3><p>If analytics, an embedded scheduling tool or newsletter features are added, their cookies and controls will be described here. Optional cookies should follow the choices set out in OIKIA’s approved notice.</p><h3>Enquiry previews</h3><p>Form information in this design preview is displayed only in the current page. It is not sent to OIKIA or saved by the page.</p>'}
  };
  const sampleCopy = {
    email: {title: 'Say hello.', value: 'hello@oikia.example', text: 'A sample email address for the footer. OIKIA’s approved public contact address will replace it.'},
    instagram: {title: 'A little of our world.', value: 'Instagram / @oikia.sample', text: 'A sample Instagram handle. The final OIKIA profile link will be added when supplied.'},
    linkedin: {title: 'Keep in good company.', value: 'LinkedIn / OIKIA', text: 'Sample profile wording. OIKIA’s official LinkedIn destination is still to be confirmed.'},
    substack: {title: 'The OIKIA Letter', value: 'Ideas, perspectives and stories worth sharing.', text: 'Sample newsletter name and description. The confirmed Substack address, publication name and subscription link will replace this preview.'}
  };
  $$('[data-legal]').forEach(button => button.addEventListener('click', () => {
    const copy = legalCopy[button.dataset.legal];
    if (!copy) return;
    $('#info-eyebrow').textContent = 'THE SMALL PRINT / SAMPLE COPY';
    $('#info-title').textContent = copy.title;
    $('.info-copy').innerHTML = copy.copy;
    showDialog(infoDialog);
  }));
  $$('[data-sample]').forEach(button => button.addEventListener('click', () => {
    const copy = sampleCopy[button.dataset.sample];
    if (!copy) return;
    $('#info-eyebrow').textContent = 'STAY IN THE LOOP / SAMPLE DETAILS';
    $('#info-title').textContent = copy.title;
    $('.info-copy').innerHTML = '<p class="sample-value">' + copy.value + '</p><p>' + copy.text + '</p><p class="preview-notice">This is a design sample. No external link or subscription is connected.</p>';
    showDialog(infoDialog);
  }));

  const overview = $('#blog-overview');
  const reader = $('#blog-reader');
  if (overview && reader) {
    const articles = $$('[data-article]', reader);
    let previousScroll = 0;
    function renderArticle(id, navigate = false) {
      const article = articles.find(item => item.dataset.article === id);
      if (article) {
        if (!overview.hidden) previousScroll = scrollY;
        overview.hidden = true;
        reader.hidden = false;
        articles.forEach(item => item.hidden = item !== article);
        if (navigate) history.pushState(null, '', '#' + article.dataset.article);
        window.scrollTo({top: 0, behavior: 'instant'});
        $('h1', article).focus({preventScroll: true});
        document.title = $('h1', article).textContent + ' — OIKIA Blog';
      } else {
        overview.hidden = false;
        reader.hidden = true;
        articles.forEach(item => item.hidden = true);
        if (navigate) history.pushState(null, '', location.pathname);
        window.scrollTo({top: previousScroll, behavior: 'instant'});
        document.title = 'Blog — OIKIA';
      }
      scheduleScroll();
    }
    $$('[data-read-article]').forEach(button => button.addEventListener('click', () => renderArticle(button.dataset.readArticle, true)));
    $$('[data-close-article]').forEach(button => button.addEventListener('click', () => {
      const id = location.hash.slice(1);
      renderArticle('', true);
      const trigger = $$('[data-read-article]').find(item => item.dataset.readArticle === id);
      if (trigger) trigger.focus({preventScroll: true});
    }));
    const filters = $$('[data-filter]');
    filters.forEach(button => button.addEventListener('click', () => {
      filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      $$('.journal-card').forEach(card => card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter);
      scheduleScroll();
    }));
    window.addEventListener('popstate', () => renderArticle(location.hash.slice(1)));
    window.addEventListener('hashchange', () => renderArticle(location.hash.slice(1)));
    if (location.hash) renderArticle(location.hash.slice(1));
  }
})();

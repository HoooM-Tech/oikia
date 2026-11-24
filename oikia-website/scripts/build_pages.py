"""Build the five static OIKIA pages with a shared header, footer and dialogs."""
from pathlib import Path
from html import escape

root=Path(__file__).resolve().parents[1]
src=root/'src'
pages={
    'home':('','OIKIA — A home for bold stories.','A home for storytelling, creativity and new possibilities in media.'),
    'about':('about','About OIKIA — A home for ideas.','Meet OIKIA, a podcasting-first media company exploring new possibilities across Africa.'),
    'services-work':('services-work','Services & Work — OIKIA','Podcast marketing, podcast management and consultation. Explore OIKIA services and start a conversation.'),
    'pod-creators-africa':('pod-creators-africa','POD Creators Africa — OIKIA','Independent creators, brands and the possibilities of Africa’s podcasting ecosystem.'),
    'blog':('blog','Blog — OIKIA','Perspectives on podcasting, media and the creative ecosystem.'),
}
for page,(path,title,description) in pages.items():
    header=(src/'header.html').read_text()
    footer=(src/'footer.html').read_text()
    header=header.replace('data-page="'+page+'"','data-page="'+page+'" aria-current="page"')
    footer=footer.replace('data-page="'+page+'"','data-page="'+page+'" aria-current="page"')
    document='''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f4f0e8">
  <meta name="description" content="'''+escape(description,quote=True)+'''">
  <title>'''+escape(title)+'''</title>
  <link rel="icon" href="/assets/mark.svg?v=brand-v2-20261119" type="image/svg+xml">
  <link rel="preload" href="/assets/font-0.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/assets/brand.css?v=brand-v2-20261119">
  <link rel="stylesheet" href="/assets/fonts.css">
  <link rel="stylesheet" href="/style.css?v=brand-v2-20261119">
  <link rel="stylesheet" href="/pages.css?v=brand-v2-20261119">
  <script src="/app.js" defer></script>
</head>
<body data-current-page="'''+page+'''">
<a class="skip-link" href="#main">Skip to content</a><div class="scroll-progress" aria-hidden="true"></div>
'''+header+'''
<main id="main">'''+(src/(page+'.html')).read_text()+'''</main>
'''+footer+'\n'+(src/'dialogs.html').read_text()+'''
<noscript><style>.reveal{opacity:1;transform:none}.reading-text{color:var(--ink)}.motion-control{display:none}body[data-current-page="blog"] [data-article]{display:block!important}body[data-current-page="blog"] #blog-reader{display:block!important}</style></noscript>
</body></html>
'''
    destination=root/'dist'/path/'index.html'
    destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_text(document)
    print(destination.relative_to(root))

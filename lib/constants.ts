import { Story, ServiceItem, Article, ValueItem } from './types';

export const STORIES: Story[] = [
  {
    id: 0,
    category: '01 / PEOPLE',
    title: 'People make<br><em>the story.</em>',
    text: 'An idea becomes something more when people connect with it. OIKIA is a home for that creative exchange — for perspectives, conversations and stories worth sharing.',
    image: '/assets/portrait.jpg',
    alt: 'A smiling woman with an expressive sense of style'
  },
  {
    id: 1,
    category: '02 / PERSPECTIVES',
    title: 'Ideas,<br><em>out loud.</em>',
    text: 'A conversation can open up a whole new way of seeing. Podcasting is where our story begins, with space for more voices, fresh perspectives and meaningful connections.',
    image: '/assets/conversation.jpg',
    video: true,
    alt: 'A woman sharing ideas in a conversation'
  },
  {
    id: 2,
    category: '03 / POSSIBILITY',
    title: 'Beyond<br><em>the frame.</em>',
    text: 'Our roots are in podcasting. Our ambition reaches into a wider world of media, where ideas have room to develop, take new forms and find different ways to connect.',
    image: '/assets/filmmaker.webp',
    alt: 'A filmmaker working with a cinema camera'
  },
  {
    id: 3,
    category: '04 / CULTURE',
    title: 'A different<br><em>way of seeing.</em>',
    text: 'Africa is full of perspectives worth paying attention to. People, places and culture shape the stories we tell — and the possibilities we see in the world around us.',
    image: '/assets/culture.webp',
    alt: 'The National Theatre in Lagos seen from below'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'podcast-marketing',
    number: '01',
    title: 'Podcast marketing',
    description: 'Your podcast has something to say. We focus on the marketing, social media and audience-growth questions that help you connect with the people it’s for.',
    ctaText: 'Let’s find your audience',
    interest: 'Podcast marketing',
    art: 'portrait.jpg',
    wordFirst: 'Find your',
    wordSecond: 'people.',
    color: '#f27a42',
    tone: 'dark'
  },
  {
    id: 'podcast-management',
    number: '02',
    title: 'Podcast management',
    description: 'There’s a whole world behind every podcast. Let’s explore the support your show needs, where you’re feeling stretched, and how OIKIA can fit into the picture.',
    ctaText: 'Tell us about your podcast',
    interest: 'Podcast management',
    art: 'behind-the-scenes.webp',
    wordFirst: 'Behind every',
    wordSecond: 'good story.',
    color: '#a8b79b',
    tone: 'dark'
  },
  {
    id: 'consultation',
    number: '03',
    title: 'Consultation',
    description: 'A sounding board for your next move. Bring your podcast questions, ideas and challenges. We’ll explore them together, with knowledge of the African podcasting landscape.',
    ctaText: 'Start a conversation',
    interest: 'Consultation',
    art: 'culture.webp',
    wordFirst: 'A fresh',
    wordSecond: 'perspective.',
    color: '#d7f205',
    tone: 'dark'
  },
  {
    id: 'media-strategy',
    number: '04',
    title: 'Media strategy',
    description: 'Our ambition goes beyond podcasting. We’re developing a broader approach to media strategy and consultation — a new chapter in how OIKIA helps ideas take shape.',
    ctaText: 'Talk about what’s next',
    interest: 'Media strategy',
    art: 'filmmaker.webp',
    wordFirst: 'Room for',
    wordSecond: 'what’s next.',
    color: '#345bff',
    tone: 'light',
    tag: 'OUR NEXT CHAPTER'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'finding-your-people',
    category: 'podcasting',
    categoryLabel: 'PODCASTING / DRAFT PREVIEW',
    title: 'A good story needs a way to find its people.',
    titleHtml: 'A good story needs a way<br><em>to find its people.</em>',
    standfirst: 'Podcast marketing begins with a question: who is this story for, and where might they be listening?',
    summary: 'Thinking about podcast marketing as part of the story.',
    image: '/assets/portrait.jpg',
    alt: 'A creative smiling against a vibrant orange background',
    featured: true,
    paragraphs: [
      { type: 'p', text: 'A thoughtful episode can open a conversation. But first, someone has to discover it. That makes marketing part of how a podcast meets the world, rather than something that happens only after the recording is finished.' },
      { type: 'h2', text: 'Start with the people.' },
      { type: 'p', text: 'What matters to the audience you have in mind? Which questions are they asking? What would make them stop, listen and return? Those questions can guide how you talk about a show and which parts of its story you choose to share.' },
      { type: 'h2', text: 'Make the invitation clear.' },
      { type: 'p', text: 'A short clip, a social post or an episode description is an invitation into a longer conversation. It helps when that invitation gives people a clear sense of the perspective they’ll find inside.' },
      { type: 'p', text: 'There is no single route to every listener. Paying attention to the audience, testing an approach and learning from the response can give the next decision a little more direction.' }
    ]
  },
  {
    id: 'more-than-one-medium',
    category: 'media',
    categoryLabel: 'MEDIA / DRAFT PREVIEW',
    title: 'Room for more than one medium.',
    titleHtml: 'Room for more<br><em>than one medium.</em>',
    standfirst: 'An idea can begin in one format and find another way to connect.',
    summary: 'What changes when an idea is allowed to take another form?',
    image: '/assets/filmmaker.webp',
    alt: 'A filmmaker developing a visual perspective',
    paragraphs: [
      { type: 'p', text: 'Some stories begin with a voice. Others begin with a photograph, a sentence or a place. The first form an idea takes does not have to define every possibility it holds.' },
      { type: 'h2', text: 'Let the idea lead.' },
      { type: 'p', text: 'Before choosing a format, it helps to ask what the story needs. Is its strength in the intimacy of a conversation? The detail of a written reflection? The way a moving image can bring a moment into focus?' },
      { type: 'p', text: 'Each medium offers a different experience. A story can change as it moves between them, revealing something that was less visible before.' },
      { type: 'h2', text: 'Keep the connection in view.' },
      { type: 'p', text: 'Exploring a new format is a creative decision, but it is also a question about the audience. The important connection is between the idea, the way it is expressed and the people it hopes to reach.' },
      { type: 'p', text: 'For OIKIA, podcasting is a foundation from which to look toward a wider world of media. That next chapter starts with curiosity about what else a story can become.' }
    ]
  },
  {
    id: 'between-people',
    category: 'community',
    categoryLabel: 'COMMUNITY / DRAFT PREVIEW',
    title: 'An ecosystem is built between people.',
    titleHtml: 'An ecosystem is built<br><em>between people.</em>',
    standfirst: 'The spaces between individual projects can be places where a creative community grows.',
    summary: 'The conversations behind a stronger creative community.',
    image: '/assets/culture.webp',
    alt: 'The National Theatre in Lagos',
    paragraphs: [
      { type: 'p', text: 'A creator may work on a single show, but the questions around that work are often shared. How do people discover it? Where can a new perspective be heard? Who has already learned something that could help?' },
      { type: 'h2', text: 'Knowledge becomes more useful when it moves.' },
      { type: 'p', text: 'Sharing a lesson, a question or an approach can give someone else a starting point. Conversations between independent creators and brands can make different kinds of knowledge visible.' },
      { type: 'h2', text: 'Connection is part of the infrastructure.' },
      { type: 'p', text: 'A creative ecosystem is more than a collection of outputs. It also includes the relationships, learning and opportunities that allow people to continue their work.' },
      { type: 'p', text: 'OIKIA’s interest in Africa’s podcasting ecosystem comes from paying attention to these connections. POD Creators Africa brings that interest into focus: more people in the conversation, with more possibility to explore.' }
    ]
  }
];

export const ABOUT_VALUES: ValueItem[] = [
  {
    number: '01',
    category: 'EXCELLENCE',
    titleFirst: 'Care in',
    titleEm: 'the craft.',
    description: 'Thoughtful work, made with attention. We bring care to the decisions behind every idea.'
  },
  {
    number: '02',
    category: 'CREATIVITY',
    titleFirst: 'Room to',
    titleEm: 'see differently.',
    description: 'We work with creative people. Curiosity and fresh perspectives belong at the centre of what we do.'
  },
  {
    number: '03',
    category: 'EMOTIONAL RESONANCE',
    titleFirst: 'Something',
    titleEm: 'you can feel.',
    description: 'Stories mean more when they make a connection. We care about how an idea resonates with its audience.'
  }
];

export const PCA_VALUES: ValueItem[] = [
  {
    number: '01',
    category: 'CONNECT',
    titleFirst: 'Find',
    titleEm: 'your people.',
    description: 'Independent creators and brands have different perspectives to share. There’s value in bringing them into the same conversation.'
  },
  {
    number: '02',
    category: 'LEARN',
    titleFirst: 'Exchange',
    titleEm: 'what you know.',
    description: 'Knowledge and best practices help build a stronger podcasting ecosystem. Learning is part of the story.'
  },
  {
    number: '03',
    category: 'EXPLORE',
    titleFirst: 'Imagine',
    titleEm: 'what’s next.',
    description: 'New ideas become possible when more voices are part of the picture. Together, there’s more to explore.'
  }
];

export const LEGAL_COPY = {
  privacy: {
    title: 'Privacy policy',
    eyebrow: 'THE SMALL PRINT / SAMPLE COPY',
    copy: `
      <p class="preview-notice">Sample policy copy for design review. OIKIA’s approved policy will replace this text before launch.</p>
      <h3>Information you choose to share</h3>
      <p>When you contact OIKIA, you may provide your name, email, company or podcast name, and project details. These details would be used to respond to your enquiry and discuss your project.</p>
      <h3>Your choices</h3>
      <p>Enquiring about a project does not automatically subscribe you to a newsletter. Any newsletter subscription would be handled separately through Substack.</p>
      <h3>Tools and providers</h3>
      <p>Final booking, enquiry and newsletter providers, retention periods and privacy contact details will be described in the approved policy. This design preview does not send enquiry form information.</p>
      <p>Sample privacy contact: hello@oikia.example.</p>
    `
  },
  terms: {
    title: 'Terms',
    eyebrow: 'THE SMALL PRINT / SAMPLE COPY',
    copy: `
      <p class="preview-notice">Sample terms for design review. Final terms require OIKIA’s approval before launch.</p>
      <h3>Using this website</h3>
      <p>This website introduces OIKIA, its interests and its services. Website information does not form a project agreement. Service scope, fees, deliverables and timelines would be agreed separately in writing.</p>
      <h3>Content and creative work</h3>
      <p>Branding, writing and media remain the property of their respective rights holders. Illustrative media in this preview does not represent commissioned client work or an endorsement.</p>
      <h3>Availability and external platforms</h3>
      <p>Booking and newsletter platforms have their own terms. Final information about those providers and any applicable conditions will be included in the approved terms.</p>
    `
  },
  cookies: {
    title: 'Cookie notice',
    eyebrow: 'THE SMALL PRINT / SAMPLE COPY',
    copy: `
      <p class="preview-notice">Sample cookie notice for design review. The final notice will reflect the tools used on the live website.</p>
      <h3>Essential access</h3>
      <p>The hosting service may use cookies to provide access to this private preview. The OIKIA page itself does not add analytics or marketing cookies.</p>
      <h3>Future integrations</h3>
      <p>If analytics, an embedded scheduling tool or newsletter features are added, their cookies and controls will be described here. Optional cookies should follow the choices set out in OIKIA’s approved notice.</p>
      <h3>Enquiry previews</h3>
      <p>Form information in this design preview is displayed only in the current page. It is not sent to OIKIA or saved by the page.</p>
    `
  }
};

export const SAMPLE_DETAILS = {
  email: {
    title: 'Say hello.',
    value: 'hello@oikia.example',
    text: 'A sample email address for the footer. OIKIA’s approved public contact address will replace it.'
  },
  instagram: {
    title: 'A little of our world.',
    value: 'Instagram / @oikia.sample',
    text: 'A sample Instagram handle. The final OIKIA profile link will be added when supplied.'
  },
  linkedin: {
    title: 'Keep in good company.',
    value: 'LinkedIn / OIKIA',
    text: 'Sample profile wording. OIKIA’s official LinkedIn destination is still to be confirmed.'
  },
  substack: {
    title: 'The OIKIA Letter',
    value: 'Ideas, perspectives and stories worth sharing.',
    text: 'Sample newsletter name and description. The confirmed Substack address, publication name and subscription link will replace this preview.'
  }
};

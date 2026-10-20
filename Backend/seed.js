import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Poll from './models/Poll.js';
import Comment from './models/Comment.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pollify';

async function seed() {
  console.log('Connecting to database:', MONGO_URI);
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  console.log('Clearing old data (polls, comments, seeded users)...');
  await Comment.deleteMany({});
  await Poll.deleteMany({});
  await User.deleteMany({ email: { $in: [
    'alex@pollify.com',
    'sarah@pollify.com',
    'david@pollify.com',
    'emma@pollify.com',
    'liam@pollify.com',
    'tester@pollify.com'
  ] } });

  console.log('Hashing passwords...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  console.log('Creating users...');
  const usersData = [
    {
      name: 'Tester Account',
      email: 'tester@pollify.com',
      username: 'tester',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      bio: 'Fullstack developer & Pollify enthusiast 🚀',
      isVerified: true,
    },
    {
      name: 'Alex Rivera',
      email: 'alex@pollify.com',
      username: 'alex_dev',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      bio: 'Frontend architect | React & Tailwind lover 💻',
      isVerified: true,
    },
    {
      name: 'Sarah Chen',
      email: 'sarah@pollify.com',
      username: 'sarah_ux',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      bio: 'Product Designer @ Figma community | Minimalism & typography ✨',
      isVerified: true,
    },
    {
      name: 'David Miller',
      email: 'david@pollify.com',
      username: 'david_ai',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'AI researcher & open source contributor 🤖',
      isVerified: true,
    },
    {
      name: 'Emma Watson',
      email: 'emma@pollify.com',
      username: 'emma_w',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      bio: 'Coffee lover ☕ | Tech journalist & gamer 🎮',
      isVerified: true,
    },
    {
      name: 'Liam Vance',
      email: 'liam@pollify.com',
      username: 'liam_cloud',
      password: hashedPassword,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      bio: 'DevOps & Cloud Engineer | Docker, K8s, Cloudflare ☁️',
      isVerified: true,
    },
  ];

  const createdUsers = [];
  for (const u of usersData) {
    // Create using raw schema to preserve pre-hashed password
    const user = new User(u);
    user.isModified = () => false; // avoid re-hashing
    await user.save();
    createdUsers.push(user);
  }

  const [uTester, uAlex, uSarah, uDavid, uEmma, uLiam] = createdUsers;

  // Setup follow network
  uTester.following = [uAlex._id, uSarah._id, uDavid._id];
  uAlex.followers = [uTester._id];
  uSarah.followers = [uTester._id];
  uDavid.followers = [uTester._id];
  await Promise.all([uTester.save(), uAlex.save(), uSarah.save(), uDavid.save()]);

  console.log('Creating polls with realistic votes...');

  const pollsData = [
    {
      creator: uAlex._id,
      question: 'Which frontend framework do you prefer for building modern web applications in 2026?',
      type: 'single',
      category: 'Technology',
      options: [
        { text: 'React / Next.js' },
        { text: 'Vue / Nuxt' },
        { text: 'Svelte / SvelteKit' },
        { text: 'Astro' },
      ],
      views: 142,
      votes: [
        { user: uTester._id, value: 'React / Next.js' },
        { user: uSarah._id, value: 'React / Next.js' },
        { user: uDavid._id, value: 'Svelte / SvelteKit' },
        { user: uEmma._id, value: 'React / Next.js' },
        { user: uLiam._id, value: 'Astro' },
      ],
    },
    {
      creator: uSarah._id,
      question: 'Do you prefer Dark Mode or Light Mode for daily coding and browsing?',
      type: 'yesno',
      category: 'Design',
      options: [
        { text: 'Yes' }, // In yesno, represents Dark mode / preference
        { text: 'No' },
      ],
      views: 98,
      votes: [
        { user: uTester._id, value: 'Yes' },
        { user: uAlex._id, value: 'Yes' },
        { user: uDavid._id, value: 'Yes' },
        { user: uEmma._id, value: 'No' },
      ],
    },
    {
      creator: uDavid._id,
      question: 'Rate your satisfaction with AI coding assistants (GitHub Copilot, Cursor, Gemini, Claude):',
      type: 'rating',
      category: 'Technology',
      options: [],
      views: 215,
      votes: [
        { user: uTester._id, value: 5 },
        { user: uAlex._id, value: 5 },
        { user: uSarah._id, value: 4 },
        { user: uEmma._id, value: 4 },
        { user: uLiam._id, value: 5 },
      ],
    },
    {
      creator: uLiam._id,
      question: 'Where is your team primarily hosting web applications nowadays?',
      type: 'single',
      category: 'Technology',
      options: [
        { text: 'Vercel / Netlify' },
        { text: 'AWS (ECS / Lambda / S3)' },
        { text: 'Render / Railway' },
        { text: 'Self-hosted VPS / Docker' },
      ],
      views: 110,
      votes: [
        { user: uTester._id, value: 'Vercel / Netlify' },
        { user: uAlex._id, value: 'Vercel / Netlify' },
        { user: uSarah._id, value: 'Render / Railway' },
        { user: uDavid._id, value: 'AWS (ECS / Lambda / S3)' },
      ],
    },
    {
      creator: uEmma._id,
      question: 'What is your single most favorite mechanical keyboard switch type?',
      type: 'open',
      category: 'Gaming',
      options: [],
      views: 76,
      votes: [
        { user: uTester._id, value: 'Gateron Oil Kings' },
        { user: uAlex._id, value: 'Cherry MX Brown' },
        { user: uDavid._id, value: 'Boba U4T Tactiles' },
        { user: uLiam._id, value: 'Topre 45g' },
      ],
    },
    {
      creator: uTester._id,
      question: 'Should remote work stay as the default work standard for tech companies?',
      type: 'yesno',
      category: 'General',
      options: [
        { text: 'Yes' },
        { text: 'No' },
      ],
      views: 184,
      votes: [
        { user: uAlex._id, value: 'Yes' },
        { user: uSarah._id, value: 'Yes' },
        { user: uDavid._id, value: 'Yes' },
        { user: uEmma._id, value: 'Yes' },
        { user: uLiam._id, value: 'No' },
      ],
    },
  ];

  const createdPolls = await Poll.insertMany(pollsData);
  console.log(`Created ${createdPolls.length} polls`);

  // Add bookmarks to tester user
  uTester.bookmarks = [createdPolls[0]._id, createdPolls[2]._id];
  await uTester.save();

  console.log('Adding discussions and comments...');
  const commentsData = [
    {
      poll: createdPolls[0]._id,
      user: uSarah._id,
      text: 'Next.js 15 with App Router has been fantastic once you get used to Server Components!',
    },
    {
      poll: createdPolls[0]._id,
      user: uAlex._id,
      text: 'Totally agree, the ecosystem and developer experience around React is still unmatched.',
    },
    {
      poll: createdPolls[1]._id,
      user: uDavid._id,
      text: 'Dark mode is non-negotiable for my eyes at 2 AM 😄',
    },
    {
      poll: createdPolls[2]._id,
      user: uEmma._id,
      text: 'It cut down my boilerplate writing by at least 60%. Highly recommend pairing it with good tests.',
    },
    {
      poll: createdPolls[5]._id,
      user: uAlex._id,
      text: 'Flexibility and no commute makes life so much better for deep work!',
    },
  ];

  await Comment.insertMany(commentsData);
  console.log(`Created ${commentsData.length} comments`);

  console.log('\n--- SEED COMPLETE ---');
  console.log('You can now log in with any of these accounts:');
  console.log('1. Email: tester@pollify.com | Password: password123');
  console.log('2. Email: alex@pollify.com   | Password: password123');
  console.log('3. Email: sarah@pollify.com  | Password: password123');
  console.log('4. Email: david@pollify.com  | Password: password123');
  console.log('5. Email: emma@pollify.com   | Password: password123');
  console.log('6. Email: liam@pollify.com   | Password: password123');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});

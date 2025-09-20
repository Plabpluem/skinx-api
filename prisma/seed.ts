import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import posts from './json/posts.json';

type Post = {
   title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: string[];
}

async function main() {
  const typePost: Post[] = posts as Post[]
  for (const item of typePost) {
    let tagStored = [] as any
    for (const tags of item.tags) {
      const data = await prisma.tags.upsert({
        where: { name: tags },
        update: {},
        create: { name: tags },
      });
      tagStored.push(data)
    }

    await prisma.posts.create({
      data:{
        title:item.title,
        content: item.content,
        postedAt: item.postedAt,
        postedBy: item.postedBy,
        tags:{
          connect: tagStored.map(tag => ({id:tag.id}))
        }
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

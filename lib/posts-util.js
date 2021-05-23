import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDir = path.join(process.cwd(), 'posts');

export function getPostData(fileIdentifier) {
    const postSlug = fileIdentifier.replace(/\.md$/, ''); // remove file extension
    const filePath = path.join(postDir, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const postData = {
        slug: postSlug,
        ...data,
        content
    };

    return postData;
}

export function getAllPosts() {
    const postFiles = fs.readdirSync(postDir);

    const allPosts = postFiles.map(postFile => getPostData(postFile));
    return allPosts.sort((p1, p2) => p1.date > p2.date ? -1 : 1);
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.isFeatured);
}
import Head from 'next/head';
import { Fragment } from 'react';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

export default function AllPostsPage({ posts }) {
    return (
        <Fragment>
            <Head>
                <title>All Posts</title>
            </Head>
            <AllPosts posts={posts} />
        </Fragment>
    );
}

export async function getStaticProps() {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts
        }
    }
}

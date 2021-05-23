import Head from 'next/head';
import { Fragment } from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData } from '../../lib/posts-util';

export default function PostDetailsPage({ post }) {
    return (
        <Fragment>
            <Head>
                <title>{post.title}</title>
            </Head>
            <PostContent post={post} />
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const { params: { slug } } = context;

    const post = getPostData(slug);

    return {
        props: {
            post: post
        },
        revalidate: 600
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

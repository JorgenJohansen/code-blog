const { default: PageLayout } = require("@/components/PageLayout")
import { useRouter } from "next/router";
import { getBlogBySlug, getAllBlogs } from "@/lib/api";
import { Row, Col } from 'react-bootstrap'
import BlogHeader from 'components/BlogHeader';

import BlogContent from "@/components/BlogContent";
import { urlFor } from '@/lib/api'
import moment from 'moment';
import ErrorPage from 'next/error';
import PreviewAlert from "@/components/PreviewAlert";


const BlogDetail = ({blog, preview}) => {
    const router = useRouter();

    if(!router.isFallback && !blog?.slug){
        return <ErrorPage statusCode="404"/>
    }

    if(router.isFallback){
        return (<PageLayout className="blog-detail-page">
            Loading...
        </PageLayout>);
    }
    return (
        <PageLayout className="blog-detail-page">
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    {preview && <PreviewAlert />}
                <BlogHeader
                    title={blog.title}
                    subtitle={blog.subtitle}
                    coverImage={urlFor(blog.coverImage).height(500).url()}
                    author={blog.author}
                    date={moment(blog.date).format('LL')}
                />
                <hr/>
                {/* Blog Content Here */}
                {
                    blog.content && 
                    <BlogContent content={blog.content} />
                }
                
                </Col>
            </Row>
    </PageLayout>
    )
}

export async function getStaticProps({params, preview = false, previewData}) {
    const blog = await getBlogBySlug(params.slug, preview);
    return {
      props: {blog, preview},
      revalidate: 1
    }
  }

export async function getStaticPaths(){
    const blogs = await getAllBlogs();
    const paths = blogs?.map(b => (
        {
            params: {slug: b.slug}
        })
    )
    return {
        paths, 
        fallback: true
    }
}

export default BlogDetail;
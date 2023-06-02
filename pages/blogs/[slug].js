const { default: PageLayout } = require("@/components/PageLayout")
import { useRouter } from "next/router";
import { getBlogBySlug, getAllBlogs } from "@/lib/api";
import { Row, Col } from 'react-bootstrap'
import BlogHeader from 'components/BlogHeader';

import BlogContent from "@/components/BlogContent";



const BlogDetail = ({blog}) => {
    const {query} = useRouter();
    return (
        <PageLayout className="blog-detail-page">
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                <BlogHeader
                    title={blog.title}
                    subtitle={blog.subtitle}
                    coverImage={blog.coverImage}
                    author={blog.author}
                    date={blog.date}
                />
                <hr/>
                {/* Blog Content Here */}
                <BlogContent content={blog.content} />
                </Col>
            </Row>
    </PageLayout>
    )
}

export async function getStaticProps({params}) {
    const blog = await getBlogBySlug(params.slug);
    return {
      props: {blog}
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
        fallback: false
    }
}

export default BlogDetail;
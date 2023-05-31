const { default: PageLayout } = require("@/components/PageLayout")
import { useRouter } from "next/router";
import { getBlogBySlug, getAllBlogs } from "@/lib/api";

const BlogDetail = ({blog}) => {
    const {query} = useRouter();
    return (
        <PageLayout>
            <h1>Hello Detail Page - {blog?.slug}</h1>
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
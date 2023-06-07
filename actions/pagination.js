import { useEffect } from "react";
import { useSWRPages } from "swr";
import { useGetBlogs } from "actions";
import CardItem from '@/components/CardItem';
import CardListItem from '@/components/CardListItem';
import CardItemBlank from "@/components/CardItemBlank";
import { Col } from 'react-bootstrap';

export const useGetBlogsPages = ({blogs, filter}) => {

    useEffect(() => {
        window.__pagination__init = true;
    }, [])

    return useSWRPages('index-page',
    ({offset, withSWR}) => {
        let initialData = !offset && blogs;

        if(typeof window !== 'undefined' && window.__pagination__init){
            initialData = null;
        }

        const { data: paginatedBlogs } = withSWR(useGetBlogs({offset, filter}, initialData));
        
        if(!paginatedBlogs) { return (
        <Col md="4">
            <CardItemBlank />
        </Col>
        )}

        return paginatedBlogs
            .map(blog =>
            filter.view.list ?
            <Col key={`${blog.slug}-list`} md="9">
                <CardListItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                link={{
                    href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                }}
                />
            </Col>
            :
            <Col key={blog.slug} md="4">
                <CardItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                image={blog.coverImage}
                link={{
                    href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                }}
                />
            </Col>
        )
    },
    (SWR, index) => {
        if(SWR.data && SWR.data.length === 0){ return null}
        return (index + 1) * 3;
    },
    [filter]
    )
}
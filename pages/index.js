import Head from 'next/head'

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Row, Col } from 'react-bootstrap';

import PageLayout from '@/components/PageLayout';
import AuthorIntro from '@/components/AuthorIntro';
import CardItem from '@/components/CardItem';
import CardListItem from '@/components/CardListItem';
import FilteringMenu from '@/components/FilteringMenu';
import { getAllBlogs } from '@/lib/api';
import { useState } from 'react';
import { useGetBlogs } from '@/actions';
const inter = Inter({ subsets: ['latin'] })



export default function Home({blogs: initialData}) {

  const [filter, setFilter] = useState({
    view: {list: 1}
  });

  const { data: blogs, error} = useGetBlogs(initialData);

  console.log(blogs);
  return (
  <>
  <PageLayout>
    <AuthorIntro />
    <hr/>
    <FilteringMenu 
    filter={filter}
    onChange={(option, value) => {
      setFilter({...filter, [option]: value})
    }}/>
    {/* className from props */}
      <Row className="mb-5">
        {/* <Col md="10">
          <CardListItem />
        </Col> */}

        {blogs && blogs.map(blog =>
          filter.view.list ?
          <Col key={`${blog.slug}-list`} md="9">
            <CardListItem 
            
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              link={{
                href:'/blogs/[slug]',
                as: `/blogs/${blog.slug}`
              }}/>
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
                href:'/blogs/[slug]',
                as: `/blogs/${blog.slug}`
              }}
              />
          </Col>
        )}
      </Row>
    </PageLayout>
    </>
  )
}
//This function is called during the build (build time)
//Provides props to your page, it will create static page
export async function getStaticProps(){
  const blogs = await getAllBlogs({offset: 0});
  return {
    props: {
      blogs
    }
  }
}

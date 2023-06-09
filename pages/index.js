import Head from 'next/head'

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Row, Button } from 'react-bootstrap';

import PageLayout from '@/components/PageLayout';
import AuthorIntro from '@/components/AuthorIntro';

import FilteringMenu from '@/components/FilteringMenu';
import { getPaginatedBlogs } from '@/lib/api';
import { useState } from 'react';
import { useGetBlogs } from '@/actions';
const inter = Inter({ subsets: ['latin'] });

import { useGetBlogsPages } from '@/actions/pagination';
import PreviewAlert from "@/components/PreviewAlert";


export default function Home({blogs, preview}) {

  const [filter, setFilter] = useState({
    view: {list: 1},
    date: { asc: 0}
  });

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore
   } = useGetBlogsPages({blogs, filter});

  console.log(blogs);
  return (
  <>
  <PageLayout>
    {preview && <PreviewAlert />}
    <AuthorIntro />
    
    <FilteringMenu 
    filter={filter}
    onChange={(option, value) => {
      setFilter({...filter, [option]: value})
    }}/>
    <hr/>
    {/* className from props */}
      <Row className="mb-5">
        {pages}
      </Row>
      <div style={{textAlign: 'center'}}>
        <Button 
        onClick={loadMore}
        disabled={isReachingEnd || isLoadingMore}
        size='lg'
        variant='outline-secondary'>
          {isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'More blogs'}
        </Button>

      </div>
    </PageLayout>
    </>
  )
}
//This function is called during the build (build time)
//Provides props to your page, it will create static page
export async function getStaticProps({preview = false}){
  const blogs = await getPaginatedBlogs({offset: 0, date: 'desc'});
  return {
    props: {
      blogs, preview
    },
    revalidate: 1
  }
}

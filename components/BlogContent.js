import React from 'react'
import BlockContent from '@sanity/block-content-to-react';
import HighlightCode from './HighlightCode';

import { urlFor } from '@/lib/api';
const serializers = {
    types: {
        code: ({node: {language, code, filename}}) => {
            return (
                <HighlightCode language={language}>
                    {code}
                    <div className='code-filename'>{filename}</div>
                </HighlightCode>
            )
        },
        image: ({node: {asset, alt}}) => {
            return(
                <div className='blog-image'>
                    <img src={urlFor(asset.url).height(300).fit('max')}/>
                    <div className='image-alt'>{alt}</div>

                </div>
            )
        }
    }
}

const BlogContent = ({content}) => {
  return (
    <BlockContent 
        
        serializers={serializers}
        blocks={content}
    />
  )
}

export default BlogContent
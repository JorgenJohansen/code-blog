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
        image: ({node: {asset, alt, position}}) => {
            let style = {};
            if(position === 'left'){
                style.float = position;
                style.marginRight = '30px'
            }
            if(position === 'right'){
                style.float = position;
                style.marginLeft = '30px'
            }
            
            return(
                <div className='blog-image' style={{...style}}>
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
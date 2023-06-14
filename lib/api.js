
import client, { previewClient } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const blogFields = `
    title,
    subtitle,
    'slug': slug.current,
    date,
    'author': author->{name, 'avatar': avatar.asset->url},
    'coverImage': coverImage.asset->url,
`

export function urlFor(source){
  return imageUrlBuilder(client).image(source)
}
const getClient = preview => preview ? previewClient : client;

export async function getAllBlogs(){
    const results = await client.fetch(`*[_type == "blog"] | order(date desc){${blogFields}}`);
    return results;
}

export async function getPaginatedBlogs({offset = 0, date = 'desc'} = {offset: 0, date:'desc'}){
    const results = await client.fetch(`*[_type == "blog"] | order(date ${date}){${blogFields}}[${offset}...${offset+9}]`);
    return results;
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getCleint(preview);
    const result = await currentClient
      .fetch(`*[_type == "blog" && slug.current == $slug] {
        ${blogFields}
        content[]{..., "asset":asset->}
      }`, {slug})
      .then(res => preview ? res?.[1] : res?.[0])
  
    return result;
}

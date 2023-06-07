import {createClient} from "@sanity/client";

const client = createClient({
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_NAME,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-14",
    useCdn: process.env.NODE_ENV === 'production'
    // useCdn === true, gives you faster response, it will get you cached data
    // useCdn === false, gives you little bit slower response, but latest data
})

export default client;
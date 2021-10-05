import React from 'react'
import {getCategories,getCategoryPost} from "../../services";
import {PostCard,Categories} from "../../components"


const CategoryPost = ({posts}) => {
    console.log("posts compo",posts)
    return (
        <>
        <div className="container mx-auto px-10">
            <div className="grid grid-cols-12 gap-12">
            <div className="col-span-8">
              {posts.map((post,index) =>(
                <PostCard key={index} post={post.node}/>
              ))}
            </div>
            <div className="col-span-4">
              <div className="sticky top-8">
                <Categories/>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default CategoryPost

export async function getStaticProps({ params}) {
    console.log("params category",params)
    const posts = await getCategoryPost(params.slug)
    return {
      props: { posts },
    }
}

export async function getStaticPaths() {
    const categories = await getCategories()
    return {
        paths: categories.map( ({slug}) => (
            {
            params: { slug },
        })),
        fallback: true,
    }
}
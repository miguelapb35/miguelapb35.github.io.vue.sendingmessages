/*
Above, you'll see that we can use v-bind to dynamically pass
props. This is especially useful when you don't know the
exact content you're going to render ahead of time, like when
fetching posts from an API.

That's all you need to know about props for now, but once
you've finished reading this page and feel comfortable
with its content, we recommend coming back later to read
the full guide on Props

A Single Root Element

When building out a <blog-post> component, your template
will eventually contain more than just the title:

At the very least, you'll want to include the post's content:

<h3>{{ title }}</h3>
<div v-html="content"></div>

If you try this in your template however, Vue will show
an error, explaining that every component must have a 
single root element. You can fix this error by wrapping the
template in a parent element, such as:

<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>

As our component grows, it's likely we'll not only need the
title and content of a post, but also the published date, 
comments, and more. Defining a prop for each related piece
of information could become very annoying:

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>

So this might be a good time to refactor the <blog-post>
component to accept a single post prop instead:

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
  ></blog-post>

*/


/*
  Now, whenever a new property is added to post objects, 
  it will automatically be available inside <blog-post>
  */

  /*
As we develop our <blog-post> component, some features may
require communicating back up to the parent. For example,
we may decide to include an accessibility feature to enlarge
the text of blog posts, while leaving the rest of the page
its default size:

In the parent, we can support this feature by adding a 
postFontSize data property:
  */


/*
Which can be used in the template to control the font size
of all blog posts:

<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>

*/

/*
Now let's add a button to enlarge the text right before the
content of every post:

*/

Vue.component('blog-post',{
	props: ['post'],
	template: `
		<div class="blog-post">
      <h3> {{ post.title }} </h3>
      <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
			<div v-html="post.content"></div>
		</div>
		`
})

new Vue({
	el: '#blog-posts-events-demo',
	data: {
	  posts: [
		{ id: 1, title: 'HTML', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores eum aut vel doloribus officiis maiores consequatur expedita minima laudantium ducimus molestiae error aspernatur aliquid, ab deleniti dolore! Aspernatur, voluptatem labore.' },
		{ id: 2, title: 'Blogging with Vue', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores eum aut vel doloribus officiis maiores consequatur expedita minima laudantium ducimus molestiae error aspernatur aliquid, ab deleniti dolore! Aspernatur, voluptatem labore.' },
		{ id: 3, title: 'Why Vue is so fun', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores eum aut vel doloribus officiis maiores consequatur expedita minima laudantium ducimus molestiae error aspernatur aliquid, ab deleniti dolore! Aspernatur, voluptatem labore.' }
    ],
    postFontSize: 1
	}
  })

  /*
The problem is, this button doesn't do anything:
      <button>
        Enlarge text
      </button>
When we click on the button, we need to communicate to the
parent that it should enlarge the text of all posts.
Fortunately, Vue instances provide a custom events system
to solve this problem. To emit an event to the parent, 
we can call the built-in $emit method, passing the name
of the event:

<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
  

Then on our blog post, we can listen for this event with
v-on, just as we would with a native DOM event:

v-on:enlarge-text="postFontSize +=0.1"

      */


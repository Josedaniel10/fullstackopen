const findTheLongWord = (arr) => {
  let longWord;
  let maxLong = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > maxLong) {
      maxLong = arr[i].length;
      longWord = arr[i];
    }
  }
  return longWord;
}

const countWordsInString = (word, str) => {
  let count = 0;
  let transformStr = word.length === 1 ?
    str.split('') : str.split(' ')
  transformStr.map(el => {
    if (el.toLowerCase().includes(word.toLowerCase())) {
      count++;
    }
  })
  return count;
}

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
  let blog;
  let maxLikes = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      blog = {
        title: blogs[i].title,
        author: blogs[i].author,
        likes: blogs[i].likes
      };
      maxLikes = blogs[i].likes;
    }
  }
  return blog;
}

const mostBlogs = (blogs) => {
  let authors = [];
  let info = [];
  let maxBlogs = 0;
  blogs.map(b => {
    if (authors.includes(b.author)) {
      return;
    }
    authors.push(b.author);
  });

  const counts = authors.map(a => {
    let count = 0;
    blogs.map(b => {
      if (b.author === a) {
        return count++;
      }
    })
    return count;
  })

  maxBlogs = Math.max(...counts);

  for (let i in authors) {
    info[i] = { author: authors[i], blogs: counts[i] }
  }

  return info.find(i => i.blogs === maxBlogs)
}

const mostLikes = (blogs) => {
  let authors = [];
  let info = [];
  let maxLikes = 0;

  blogs.map(b => {
    if (authors.includes(b.author)) {
      return;
    }
    authors.push(b.author);
  });

  const likes = authors.map(a => {
    let like = 0;
    blogs.map(b => {
      if (b.author === a) {
        like += b.likes;
        return;
      }
    })
    return like;
  })

  maxLikes = Math.max(...likes);

  for (let i in authors) {
    info[i] = { author: authors[i], likes: likes[i] }
  }

  return info.find(i => i.likes === maxLikes)
}

module.exports = { 
  findTheLongWord, 
  countWordsInString, 
  dummy, 
  totalLikes, 
  favoriteBlog, 
  mostBlogs,
  mostLikes
}
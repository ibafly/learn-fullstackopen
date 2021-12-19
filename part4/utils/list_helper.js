const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (bigger, item) => {
    return bigger.likes > item.likes ? bigger : item
  }
  const biggest = blogs.reduce(reducer, blogs[0])
  return { title: biggest.title, author: biggest.author, likes: biggest.likes }
}
module.exports = { dummy, totalLikes, favoriteBlog }

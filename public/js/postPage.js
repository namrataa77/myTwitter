$(document).ready(() => {
    $.get("/api/posts/" + postId, results => {
        outputPostsWithReplies(results, $(".postContainer"));
    })
})
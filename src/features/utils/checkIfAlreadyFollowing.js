export const checkIfAlreadyFollowing = (profile,post) => {
    // console.log("Running chcekIfAlradyFollowing", profile.following);
    if (profile.following.find((id) => id == post.userId._id)) {
      return "Unfollow";
    }
    return "Follow";
  };
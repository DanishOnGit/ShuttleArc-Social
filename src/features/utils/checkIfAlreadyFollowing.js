export const checkIfAlreadyFollowing = (list,id) => {
   return list.includes(id)?"Unfollow":"Follow"
  };
export const checkIfAlreadyFollowing = (list,id) => {
    console.log("Running chcekIfAlradyFollowing",list,id);
   return list.includes(id)?"Unfollow":"Follow"
  };
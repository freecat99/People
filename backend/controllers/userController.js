import User from "../models/userModel.js";

//read

export const getUser = async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById({id});
        res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({"message": error.message}) 
    }
}

export const getFriends = async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById({id});
 
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const friendList = friends.map({_id, firstName, lastName, occupation, location, picturePath});
        res.status(200).json(friendList);

    } catch (error) {
        return res.status(500).json({"message": error.message}) 
    }    

}

//update

export const toggleFriend = async(req, res)=>{
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        let wasFriend = false;

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id!==friendId);
            friend.friends = friend.friends.filter((id) => id!==id);
            wasFriend = true;
            
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const friendList = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => ({
            id:_id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
            }));
        res.status(200).json({friendList, 'wasFriend':wasFriend});
        
    } catch (error) {
        return res.status(500).json({"message": error.message}) 
    } 
}
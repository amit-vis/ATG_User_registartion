module.exports.home = async (req, res)=>{
    try {
        return res.status(200).json({
            message: "User registration app working successfully!!",
            success: true
        })
    } catch (error) {
        console.log("error in home page", error)
    }
}
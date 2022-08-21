import user from "../model/user.js";

// create new review as a tenant
export const createReview = async (req, res) =>{

    const {
         landlord_review,
         environment_review, 
         quality_of_amenities, 
         image_or_video_link
        } = req.body

        // user id gotten from jwt token
        const user_id = req.user.user_id
        
        // update review
        await user.findByIdAndUpdate(user_id,  {
            $push: {
                previous_appartments: {
                    review: {
                        landlord: landlord_review,
                        environment: environment_review,
                        quality_of_amenities: quality_of_amenities,
                        image_or_video_link: image_or_video_link  
                    }
                }
            },
            review_time: Date.now()
        })
        return res.status(200).json({
            status: true,
            message:"Review submitted successfully"
        });
    }

// mark reviews
export const visitorRating = async (req, res) =>{
    // visitor ranking by helpful
    let { tenant_email, helpful } = req.body
    
    // user
    const Olduser = await user.findOne({email: tenant_email});
    
    if (!(tenant_email && helpful)){
        return res.status(400).send("All inputs are required");
    }
    
    if (Olduser == null){
        return res.status(400).send("Tenant does not exist");
    }
    
    if(helpful == "true"){
        await user.updateOne({email: tenant_email}, {
            $inc : {helpful: 1}
        })
    }

    if(helpful == "false"){
        await user.updateOne({email: tenant_email}, {
            $inc : {helpful: -1}
        })
    }

    return res.status(200).json({
        status: true,
        message:"Rating sent successfully"
    });
}

// view all reviews
export const viewAllReviews = async (req, res) =>{

    const reviewsArray = []

    const all_users = await user.find()

    if(all_users == null){
        return res.status(400).send("There is no review at the moment");
    }

    // selecting all needed details in individual users
    all_users.map((user) => {
        reviewsArray.push({
            name: user.firstname,
            email: user.email,
            previous_apartments: user.previous_appartments.map(single_apartment => {
                let neededDetails = {
                    landlord: single_apartment.review.landlord,
                    environment: single_apartment.review.environment,
                    quality_of_amenities: single_apartment.review.quality_of_amenities,
                    image_or_video_link: single_apartment.review.image_or_video_link,
                }
                return neededDetails
            })
        })
    })

    return res.status(200).json({
        status: true,
        message:"all reviews",
        all_reviews: reviewsArray
    });

}

// sort all reviews by helpful
export const sortAllReviewsByHelpful = async (req, res) =>{
    const reviewsArray = [];
    const sortedByUseful =  [];

    // all users
    const all_users = await user.find()

    if(all_users == null){
        return res.status(400).send("There is no review at the moment");
    }

    sortedByUseful.push(all_users.sort((a, b) =>{
        return b.helpful - a.helpful
    }))

    sortedByUseful[0].map((user) => {
        reviewsArray.push({
            name: user.firstname,
            email: user.email,
            previous_apartments: user.previous_appartments.map(single_apartment => {
                let neededDetails = {
                    landlord: single_apartment.review.landlord,
                    environment: single_apartment.review.environment,
                    quality_of_amenities: single_apartment.review.quality_of_amenities,
                    image_or_video_link: single_apartment.review.image_or_video_link,
                }
                return neededDetails
            })
        })
    })

    return res.status(200).json({
        status: true,
        message:"all reviews by helpful",
        all_reviews: reviewsArray
    });
}

// sort all reviews by most recent
export const sortAllReviewsByMostRecent = async (req, res) =>{
    const reviewsArray = [];
    const sortedByMostRecent =  [];

    // all users
    const all_users = await user.find()

    if(all_users == null){
        return res.status(400).send("There is no review at the moment");
    }

    sortedByMostRecent.push(all_users.sort((a, b) =>{
        return b.review_time - a.review_time 
    }))

    sortedByMostRecent[0].map((user) => {
        reviewsArray.push({
            name: user.firstname,
            email: user.email,
            previous_apartments: user.previous_appartments.map(single_apartment => {
                let neededDetails = {
                    landlord: single_apartment.review.landlord,
                    environment: single_apartment.review.environment,
                    quality_of_amenities: single_apartment.review.quality_of_amenities,
                    image_or_video_link: single_apartment.review.image_or_video_link,
                }
                return neededDetails
            })
        })
    })

    return res.status(200).json({
        status: true,
        message:"all reviews by most recent",
        all_reviews: reviewsArray
    });
}